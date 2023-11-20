import { DateConvert } from '@/util/date-convert';
import BlogTag from '@/app/blog/tag';
import { NotionService, NotionProdParams } from '@/services/notion-service';
import { BlockRenderer } from '@/components/notion-render';

export default async function BlogPage({ params: { pid } }: any) {
    const Notion = new NotionService(NotionProdParams);
    const post: BlogPost = await Notion.getBlogPostById(pid);

    return (
        <div className="">
            <div className="text-2xl font-semibold">{post.title}</div>
            <div className="flex gap-2 text-sm">
                {post.author.name} @ {DateConvert(post.createdAt)}
            </div>
            <div className="my-4">
                <hr />
            </div>
            {(post.content as any[]).map((e, i) => {
                return <BlockRenderer key={i} block={e} index={i} />;
            })}
            <div className="mt-4 mb-1">Tags:</div>
            <div className="flex flex-wrap gap-2">
                {post.tags.map((e, i) => {
                    return <BlogTag key={i} tag={e} />;
                })}
            </div>
        </div>
    );
}
