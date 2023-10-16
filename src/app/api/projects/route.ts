import { NotionClient } from '../(config)/notion';
import { ApiError } from 'next/dist/server/api-utils';

const projectsId = process.env.NOTION_PROJECTS_ID;

export async function GET() {
    if (!projectsId) {
        throw new ApiError(500, 'Invalid Notion token.');
    }

    const query = await NotionClient.databases.query({
        database_id: projectsId,
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

    return Response.json({
        projects: formatProjects,
    });
}
