import moment from 'moment';
import Link from 'next/link';
import { NotionService, NotionProdParams } from '@/services/notion-service';
import { NotionTag } from '@/components';

export default async function Blog() {
    const Notion = new NotionService(NotionProdParams);
    const posts: BlogPost[] = await Notion.getAllBlogPosts();

    if (!posts) {
        return <div className="text-center">No posts yet! :)</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            {posts.map((e, i) => (
                <BlogPost key={i} post={e} />
            ))}
        </div>
    );
}

function BlogPost({ post }: { post: BlogPost }) {
    const createdAt = moment(post.createdAt).format('D MMM YY, HH:mm');
    return (
        <div className="cursor-default group">
            <Link
                href={`/blog/${post.id}`}
                className="text-xl group-hover:underline"
            >
                {post.title}
            </Link>
            <div className="flex items-center gap-1">
                <p className="text-sm">{post.author?.name ?? 'Sem autor'} @ </p>
                <p className="text-sm">{createdAt}</p>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
                {post.tags.map((e, i) => {
                    return <NotionTag key={i} tag={e} />;
                })}
            </div>
        </div>
    );
}
