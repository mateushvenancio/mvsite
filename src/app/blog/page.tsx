import moment from 'moment';
import Link from 'next/link';

export default async function Blog() {
    const response = await fetch('http://localhost:3000/api/blog');
    const json = await response.json();
    const posts: BlogPost[] = json.results;

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
                    return <BlogTag key={i} tag={e} />;
                })}
            </div>
        </div>
    );
}

function BlogTag({ tag }: { tag: Tag }) {
    return (
        <div className="text-xs bg-gray-200 text-gray-600 rounded px-2">
            {tag.name}
        </div>
    );
}
