const colors: any = {
    yellow: {
        text: 'text-[#402c1b]',
        background: 'bg-[#fdecc8]',
    },
    gray: {
        text: 'text-[#32302c]',
        background: 'bg-[#e3e2e0]',
    },
    green: {
        text: 'text-[#1c3829]',
        background: 'bg-[#dbeddb]',
    },
    blue: {
        text: 'text-[#183347]',
        background: 'bg-[#d3e5ef]',
    },
    red: {
        text: 'text-[#5d1715]',
        background: 'bg-[#ffe2dd]',
    },
    brown: {
        text: 'text-[#442a1e]',
        background: 'bg-[#eee0da]',
    },
    orange: {
        text: 'text-[#49290e]',
        background: 'bg-[#fadec9]',
    },
    purple: {
        text: 'text-[#412454]',
        background: 'bg-[#e8deee]',
    },
    pink: {
        text: 'text-[#4c2337]',
        background: 'bg-[#f5e0e9]',
    },
    default: {
        text: 'text-[#32302c]',
        background: 'bg-[#e3e2e0]',
    },
};

export function NotionTag({ tag }: { tag: Tag }) {
    const text = colors[tag.color].text;
    const bg = colors[tag.color].background;

    return (
        <div
            className={`text-sm w-fit px-1.5 rounded cursor-default ${text} ${bg}`}
        >
            {tag.name}
        </div>
    );
}
