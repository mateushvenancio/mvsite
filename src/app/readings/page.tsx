import { NotionService, NotionProdParams } from '@/services/notion-service';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function Readings({ limit }: { limit?: number }) {
    const Notion = new NotionService(NotionProdParams);
    const result: Reading[] = await Notion.getReadings();
    let readings = result;

    if (limit && typeof limit === 'number') {
        readings = result.slice(0, limit);
    }

    return (
        <div>
            {readings.map((e, i) => (
                <div key={i}>
                    <ReadingTile reading={e} />
                </div>
            ))}
            <div className="mt-4">
                {limit && (
                    <Link href={'/readings'}>Ver todas as leituras →</Link>
                )}
            </div>
        </div>
    );
}

function ReadingTile({ reading }: { reading: Reading }) {
    const domainGroup = reading.link.match(/https?:\/\/(?:www\.)?([^\/]+)/);
    const domain =
        domainGroup && domainGroup.length >= 2 ? domainGroup[1] : 'Ler mais';
    return (
        <Link href={reading.link} target="_blank" className="hover:underline">
            <div className="ml-8 cursor-default group flex content-center flex flex-col">
                <p className="text-lg font-semibold text-gray-800 mb-1 cursor-pointer">
                    {'› ' + reading.title}
                </p>
                <p className="text-sm text-gray-800 mb-1 grow cursor-pointer">
                    {'🌐 ' + domain}
                </p>
            </div>
        </Link>
    );
}
