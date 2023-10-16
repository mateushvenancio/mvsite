import { NotionClient } from '../../(config)/notion';

export async function GET(req: Request, { params: { pid } }: any) {
    const post = await NotionClient.blocks.children.list({
        block_id: pid,
    });

    return Response.json({
        post,
    });
}
