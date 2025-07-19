import moment from 'moment';
import Link from 'next/link';
import { NotionService, NotionProdParams } from '@/services/notion-service';

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
        <div className="ml-8 cursor-default group">
            <p className="text-sm text-gray-500 mb-1">{createdAt}</p>
            <p className="text-xl font-semibold text-gray-800 mb-1">
                {post.title}
            </p>
            <Link
                href={`/blog/${post.id}`}
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
                Ler mais &rarr;
            </Link>
        </div>
    );
}
