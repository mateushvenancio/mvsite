export function Title({ title }: { title: string }) {
    return <div className="text-lg font-bold pt-2 mt-2">{title}</div>;
}

export function SubTitle({ title }: { title: string }) {
    return <div className="text-md font-bold pt-4 mt-4">{title}</div>;
}
