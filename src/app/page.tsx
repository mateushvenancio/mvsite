import Blog from './blog/page';
import About from './about/page';
import Music from './music/page';

export default function Home() {
    return (
        <>
            <About />
            <TitleWithDivisor title="Posts do blog" />
            <Blog />
            <TitleWithDivisor title="Músicas que eu tenho ouvido" />
            <Music />
        </>
    );
}

function TitleWithDivisor({ title }: { title: string }) {
    return <div className="section-title mb-4 mt-12">{title}</div>;
}
