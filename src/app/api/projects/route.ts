import { NotionClient } from '../(config)/notion';
import { ApiError } from 'next/dist/server/api-utils';

const projectsId = process.env.NOTION_PROJECTS_ID;

export async function GET() {
    if (!projectsId) {
        throw new ApiError(500, 'Invalid Notion token.');
    }

    const query = await NotionClient.databases.query({
        database_id: projectsId,
    });
    const table = await NotionClient.databases.retrieve({
        database_id: projectsId,
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

    const allTags = (table.properties.Tags as any).multi_select.options;

    return Response.json({
        tags: allTags,
        projects: formatProjects,
    });
}
