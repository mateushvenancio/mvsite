import { ApiError } from 'next/dist/server/api-utils';
import { NotionClient } from '../(config)/notion';

const blogId = process.env.NOTION_BLOG_ID;

export default async function GET() {
    if (!blogId) {
        throw new ApiError(500, 'Invalid Notion token.');
    }

    const response = await NotionClient.databases.retrieve({
        database_id: blogId,
    });

    return Response.json({
        response,
    });
}
