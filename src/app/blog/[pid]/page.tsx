import { DateConvert } from '@/app/global/date-convert';
import Link from 'next/link';
import BlogTag from '../tag';
import MongoService from '@/services/mongo-service';

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

function BlockRenderer({ block }: any) {
    switch (block.type) {
        case 'heading_1':
            return (
                <h1>
                    {(block.heading_1.rich_text as any[]).map((e, i) => {
                        return (
                            <RenderRichText
                                key={i}
                                text={e}
                                className="text-xl font-semibold"
                            />
                        );
                    })}
                </h1>
            );
        case 'heading_2':
            return (
                <h1>
                    {(block.heading_2.rich_text as any[]).map((e, i) => {
                        return (
                            <RenderRichText
                                key={i}
                                text={e}
                                className="text-lg font-semibold"
                            />
                        );
                    })}
                </h1>
            );
        case 'heading_3':
            return (
                <h1>
                    {(block.heading_3.rich_text as any[]).map((e, i) => {
                        return (
                            <RenderRichText
                                key={i}
                                text={e}
                                className="text-base font-semibold"
                            />
                        );
                    })}
                </h1>
            );
        case 'paragraph':
            return (
                <p>
                    {(block.paragraph.rich_text as any[]).map((e, i) => {
                        return <RenderRichText key={i} text={e} className="" />;
                    })}
                </p>
            );
        default:
            return <div>Mateus</div>;
    }
}

function RenderRichText({
    text,
    className,
}: {
    text: any;
    className?: string;
}) {
    const formatClasses: string[] = [];

    if (text.annotations) {
        if (text.annotations.bold) {
            formatClasses.push('font-bold');
        }
        if (text.annotations.italic) {
            formatClasses.push('italic');
        }
        if (text.annotations.strikethrough) {
            formatClasses.push('line-through');
        }
        if (text.annotations.underline) {
            formatClasses.push('underline');
        }
    }

    if (text.text.link) {
        return (
            <Link
                className={
                    className +
                    formatClasses.join(' ') +
                    ' text-primary underline'
                }
                href={text.text.link.url}
                target="_blank"
            >
                {text.text.content}
            </Link>
        );
    }
    return (
        <span className={className + formatClasses.join(' ')}>
            {text.text.content}
        </span>
    );
}
