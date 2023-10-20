import { BlockRenderer } from '@/components/notion-render';
import { NotionService, NotionProdParams } from '@/services/notion-service';

export default async function About() {
    const Notion = new NotionService(NotionProdParams);
    const about = await Notion.getAboutPage();

    return (
        <>
            <p className="text-xl font-bold">About</p>

            {(about as any[]).map((e, i) => {
                return <BlockRenderer key={i} block={e} />;
            })}
        </>
    );
}
