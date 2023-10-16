export default function BlogTag({ tag }: { tag: Tag }) {
    return (
        <div className="text-xs bg-gray-200 text-gray-600 rounded px-2 cursor-default">
            {tag.name}
        </div>
    );
}
