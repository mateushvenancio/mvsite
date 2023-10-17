import { DateConvert } from '@/app/global/date-convert';
import BlogTag from '../tag';
import MongoService from '@/services/mongo-service';
import { BlockRenderer } from '@/components/notion-render';

export default async function BlogPage({ params: { pid } }: any) {
    const post: BlogPost = await MongoService.getBlogPostById(pid);

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
                return <BlockRenderer key={i} block={e} />;
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
