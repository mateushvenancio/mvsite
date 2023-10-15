import Image from 'next/image';

export default async function Games() {
    const response = await fetch(
        'https://raw.githubusercontent.com/mateushvenancio/projetos-md/main/shelf.json'
    );
    const games: Game[] = (await response.json()).games;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {games.map((e, index) => (
                <GameTile key={index} game={e} />
            ))}
        </div>
    );
}

function GameTile({ game }: { game: Game }) {
    return (
        <div className="relative shadow-md hover:shadow-xl transition-all">
            <div>
                <Image
                    src={game.image}
                    alt={game.title}
                    width={100}
                    height={100}
                    className="w-full aspect-[3/4] object-cover"
                />
            </div>
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/50 top-0"></div>
            <div className="absolute bottom-0 text-white pl-2 pb-2 text-sm cursor-default">
                {game.title}
                <RatingStars rating={game.rate} />
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

// export function GameTile({ game }: { game: GameType }) {
//     return (
//         <Image
//             src={game.image}
//             alt={game.name}
//             width={100}
//             height={100}
//             className="w-full"
//         />
//     );
// }

// export function GameTile({ game }: { game: GameType }) {
//     return (
//         <div className="flex flex-row gap-4 items-start">
//             <Image
//                 src={game.img}
//                 width="100"
//                 height="100"
//                 alt={game.name}
//                 className="aspect-square border border-primary rounded shadow-md hover:shadow-lg transition-all"
//             />
//             <div>
//                 <p className="font-bold text-transparent text-lg bg-gradient-to-r from-pink-400 to-purple-600 w-fit bg-clip-text">
//                     {game.name}
//                 </p>
//                 <p className=" text-sm">{game.desc}</p>
//             </div>
//         </div>
//     );
// }
