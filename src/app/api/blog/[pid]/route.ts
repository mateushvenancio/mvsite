import { NotionClient } from '../../(config)/notion';

export async function GET(req: Request, { params: { pid } }: any) {
    const page = await NotionClient.pages.retrieve({
        page_id: pid,
    });
    const children = await NotionClient.blocks.children.list({
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

    return Response.json({ post });
}
