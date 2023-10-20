import { Client, LogLevel } from '@notionhq/client';

// const projectsId = process.env.NOTION_PROJECTS_ID!;

interface NotionServiceParams {
    notionToken: string;
    projectsToken: string;
    blogToken: string;
    aboutToken: string;
}

export const NotionProdParams: NotionServiceParams = {
    notionToken: process.env.NOTION_TOKEN!,
    projectsToken: process.env.NOTION_PROJECTS_ID!,
    blogToken: process.env.NOTION_BLOG_ID!,
    aboutToken: process.env.NOTION_ABOUT_ID!,
};

export class NotionService {
    constructor(private params: NotionServiceParams) {}

    private notionClient = new Client({
        auth: this.params.notionToken,
        logLevel: LogLevel.ERROR,
    });

    async getAllBlogPosts() {
        const results = await this.notionClient.databases.query({
            database_id: this.params.blogToken,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'ascending',
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

        console.log(
            '[LOG][getAllBlogPosts] Está buscando certo? ' +
                JSON.stringify(formatted)
        );

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
        console.log('pageObject', pageObject);

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

    async getAllProjects() {
        const query = await this.notionClient.databases.query({
            database_id: this.params.projectsToken,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'ascending',
                },
            ],
            filter: {
                property: 'Active',
                checkbox: {
                    equals: true,
                },
            },
        });

        const formatProjects = query.results.map((e: any) => {
            return {
                id: e.id,
                title: e.properties.Title.title[0].plain_text,
                description: e.properties.Description.rich_text[0].plain_text,
                link: e.properties.Link.url,
                tags: e.properties.Tags.multi_select,
            };
        });

        console.log(
            '[LOG][getAllProjects] Está buscando certo? ' +
                JSON.stringify(formatProjects)
        );

        return formatProjects;
    }

    async getAboutPage() {
        const children = await this.notionClient.blocks.children.list({
            block_id: this.params.aboutToken,
        });

        return children.results;
    }
}

// const Notion = new NotionService(
//     process.env.NOTION_TOKEN!,
//     process.env.NOTION_PROJECTS_ID!,
//     process.env.NOTION_BLOG_ID!,
//     process.env.NOTION_ABOUT_ID!
// );

// export default Notion;
