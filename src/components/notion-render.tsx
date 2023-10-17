import Link from 'next/link';

export function BlockRenderer({ block }: any) {
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

export function RenderRichText({
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
