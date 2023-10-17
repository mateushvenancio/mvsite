import { BlockRenderer } from '@/components/notion-render';
import MongoService from '@/services/mongo-service';

export default async function About() {
    const about = await MongoService.getAboutPage();

    return (
        <>
            <p className="text-xl font-bold">About</p>

            {(about as any[]).map((e, i) => {
                return <BlockRenderer key={i} block={e} />;
            })}
        </>
    );
}
