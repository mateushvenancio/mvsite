import { Client } from '@notionhq/client';

// const projectsId = process.env.NOTION_PROJECTS_ID!;

class MongoService {
    constructor(
        private notionToken: string,
        private projectsToken: string,
        private blogToken: string,
        private aboutToken: string
    ) {}

    notionClient = new Client({
        auth: this.notionToken,
    });

    async getAllBlogPosts() {
        const results = await this.notionClient.databases.query({
            database_id: this.blogToken,
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
            database_id: this.projectsToken,
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

        return formatProjects;
    }

    async getAboutPage() {
        const children = await this.notionClient.blocks.children.list({
            block_id: this.aboutToken,
        });

        return children.results;
    }
}

const Mongo = new MongoService(
    process.env.NOTION_TOKEN!,
    process.env.NOTION_PROJECTS_ID!,
    process.env.NOTION_BLOG_ID!,
    process.env.NOTION_ABOUT_ID!
);

export default Mongo;
