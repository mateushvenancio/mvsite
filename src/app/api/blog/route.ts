import { ApiError } from 'next/dist/server/api-utils';
import { NotionClient } from '../(config)/notion';

const blogId = process.env.NOTION_BLOG_ID;

export async function GET() {
    if (!blogId) {
        throw new ApiError(500, 'Invalid Notion token.');
    }

    const results = await NotionClient.databases.query({
        database_id: blogId,
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'ascending',
            },
        ],
    });

    const formatted = results.results.map((e) => {
        const body = e as Root;
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

    return Response.json({
        results: formatted,
    });
}

type Root = {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
        object: string;
        id: string;
    };
    last_edited_by: {
        object: string;
        id: string;
    };
    cover: any;
    icon: any;
    parent: {
        type: string;
        database_id: string;
    };
    archived: boolean;
    properties: {
        Author: {
            id: string;
            type: string;
            people: Array<{
                object: string;
                id: string;
                name: string;
                avatar_url: string;
                type: string;
                person: {};
            }>;
        };
        Tags: {
            id: string;
            type: string;
            multi_select: Array<{
                id: string;
                name: string;
                color: string;
            }>;
        };
        Published: {
            id: string;
            type: string;
            checkbox: boolean;
        };
        Content: {
            id: string;
            type: string;
            rich_text: Array<any>;
        };
        Name: {
            id: string;
            type: string;
            title: Array<{
                type: string;
                text: {
                    content: string;
                    link: any;
                };
                annotations: {
                    bold: boolean;
                    italic: boolean;
                    strikethrough: boolean;
                    underline: boolean;
                    code: boolean;
                    color: string;
                };
                plain_text: string;
                href: any;
            }>;
        };
    };
    url: string;
    public_url: any;
};
