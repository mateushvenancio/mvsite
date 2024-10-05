import Image from 'next/image';
import { SubTitle } from '@/components';
import { GrouveeService } from '@/services/grouvee-service';

export default async function Games() {
    const Grouvee = new GrouveeService();
    const result = await Grouvee.getGameList();

    const order = ['Playing', 'Played', 'Dropped', 'Backlog'];
    const games = result
        .filter((e) => order.includes(e.shelfName))
        .sort((a, b) => {
            return order.indexOf(a.shelfName) - order.indexOf(b.shelfName);
        });

    return (
        <div>
            {games.map((e, index) => {
                return <GameShelf key={index} item={e} />;
            })}
        </div>
    );
}

function GameShelf({ item }: { item: GameShelf }) {
    const gridClasses = 'grid grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-2';
    return (
        <div className="">
            <SubTitle title={item.shelfName} />
            <p>{item.shelfDescription || ''}</p>
            <div className={gridClasses}>
                {item.games.map((game, index) => {
                    return <GameTile key={'game-' + index} item={game} />;
                })}
            </div>
            {item.games.length == 0 ? 'Nothing here... yet!' : null}
        </div>
    );
}

function GameTile({ item }: { item: GameItem }) {
    return (
        <div className="relative">
            <Image
                src={item.image ? item.image : '/spotify_icon.png'}
                alt={item.name}
                height={500}
                width={500}
                className="aspect-[3/4] object-cover rounded"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-[75%]"></div>
            <div className="absolute bottom-1 left-1">
                <span className="text-sm font-semibold text-white">
                    {item.name}
                    {item.rating && <RatingStars rating={item.rating} />}
                </span>
            </div>
        </div>
    );
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex">
            <Star filled={rating >= 1} />
            <Star filled={rating >= 2} />
            <Star filled={rating >= 3} />
            <Star filled={rating >= 4} />
            <Star filled={rating >= 5} />
        </div>
    );
}

function Star({ filled }: { filled: boolean }) {
    return (
        <svg
            className={`w-5 h-5 ${
                filled ? 'text-yellow-400' : 'text-gray-400'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
    );
}
