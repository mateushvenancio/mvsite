export default function Title({ title }: { title: string }) {
    return (
        <div className="text-lg font-bold border-dashed border-t-2 border-primary pt-4 mt-4">
            {title}
        </div>
    );
}
