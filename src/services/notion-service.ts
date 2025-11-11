import { Client, LogLevel } from '@notionhq/client';

// const projectsId = process.env.NOTION_PROJECTS_ID!;

interface NotionServiceParams {
    notionToken: string;
    projectsToken: string;
    blogToken: string;
    readingsToken: string;
}

export const NotionProdParams: NotionServiceParams = {
    notionToken: process.env.NOTION_TOKEN!,
    projectsToken: process.env.NOTION_PROJECTS_ID!,
    blogToken: process.env.NOTION_BLOG_ID!,
    readingsToken: process.env.NOTION_READINGS!,
};

export class NotionService {
    constructor(private params: NotionServiceParams) {}

    private notionClient = new Client({
        auth: this.params.notionToken,
        fetch: async function (url, options) {
            return fetch(url, {
                ...options,
                next: {
                    revalidate: 3600,
                },
            });
        },
    });

    async getAllBlogPosts() {
        const results = await this.notionClient.databases.query({
            database_id: this.params.blogToken,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ],
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
        });

        const formatted = results.results.map((e) => {
            const body = e as any;
            const post: BlogPost = {
                id: e.id,
                title: body.properties.Name.title[0].plain_text,
                createdAt: new Date(body.created_time),
                updatedAt: new Date(body.last_edited_time),
                author: body.properties.Author.people[0],
                tags: body.properties.Tags.multi_select,
                content: [],
            };
            return post;
        });

        return formatted;
    }

    async getBlogPostById(pid: string) {
        const page = await this.notionClient.pages.retrieve({
            page_id: pid,
        });
        const children = await this.notionClient.blocks.children.list({
            block_id: pid,
        });

        const pageObject = page as any;

        const post: BlogPost = {
            id: pid,
            title: pageObject.properties.Name.title[0].plain_text,
            createdAt: new Date(pageObject.created_time),
            updatedAt: new Date(pageObject.last_edited_time),
            author: pageObject.properties.Author.people[0],
            tags: pageObject.properties.Tags.multi_select,
            content: children.results,
        };

        return post;
    }

    async getReadings(): Promise<Reading[]> {
        const result = await this.notionClient.databases.query({
            database_id: this.params.readingsToken,
            sorts: [
                {
                    direction: 'descending',
                    timestamp: 'created_time',
                },
            ],
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
        });

        const formatted: Reading[] = result.results.map((e) => {
            const body = (e as any).properties as any;
            const createdAt = (e as any).created_time;
            return {
                link: body.Link.rich_text[0].plain_text,
                title: body.Title.title[0].plain_text,
                createdAt,
            };
        });

        return formatted;
    }
}
