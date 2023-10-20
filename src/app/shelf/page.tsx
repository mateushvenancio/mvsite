import Image from 'next/image';
import { NotionTag, SubTitle } from '@/components';
import { NotionProdParams, NotionService } from '@/services/notion-service';

export default async function Shelf() {
    const Notion = new NotionService(NotionProdParams);
    const items = await Notion.getShelf();

    return (
        <>
            <SubTitle title="Shelf" />
            <p>
                Welcome to my shelf. You can see the books I read, TV shows I
                watched and the games I played. I&apos;m excited to share it
                here.
            </p>
            <div className="flex flex-col gap-2 mt-4">
                {items.map(function (e, i) {
                    return <ShelfTile key={i} item={e} />;
                })}
            </div>
        </>
    );
}

function ShelfTile({ item }: { item: ShelfItem }) {
    return (
        <div className="flex gap-2 items-start">
            <Image
                src={item.image ? item.image : '/spotify_icon.png'}
                alt={item.title}
                height={75}
                width={75}
                className="aspect-[3/4] object-cover rounded"
            />
            <div className="flex flex-col">
                <div className="text-lg font-semibold">
                    <span>{item.emoji ?? ''}</span>
                    <span>{item.title}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <NotionTag tag={item.tag} />
                    <RatingStars rating={item.rate} />
                </div>
                <div className="text-sm">{item.desc}</div>
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

const games: ShelfItem[] = [
    // {
    //     title: 'The Legend of Zelda: Breath of the Wild',
    //     rate: 5,
    //     image: 'https://i.imgur.com/Yb2Jotl.png',
    //     desc: 'The best game of all times!',
    // },
    // {
    //     title: 'Red Dead Redemption 2',
    //     rate: 5,
    //     image: 'https://i.imgur.com/cEMjkRq.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto minus sit numquam sint deleniti iste temporibus neque soluta fugiat et sunt, hic nam recusandae inventore quam, officiis asperiores aspernatur. Veritatis aspernatur perferendis cupiditate sed, nesciunt ex blanditiis tempora eius corrupti impedit id animi quo deleniti perspiciatis, quia architecto magnam atque.',
    // },
    // {
    //     title: 'Stardew Valley',
    //     rate: 5,
    //     image: 'https://i.imgur.com/14bKGgL.png',
    //     desc: '',
    // },
    // {
    //     title: 'Hogwarts Legacy',
    //     rate: 4,
    //     image: 'https://i.imgur.com/iOschn2.jpg',
    //     desc: '',
    // },
    // {
    //     title: 'Sea of Stars',
    //     rate: 4,
    //     image: 'https://i.imgur.com/X0Svm9O.jpg',
    //     desc: '',
    // },
    // {
    //     title: 'Pokémon Scarlet',
    //     rate: 4,
    //     image: 'https://i.imgur.com/FCezjN4.jpg',
    //     desc: '',
    // },
    // {
    //     title: 'The Elder Scrolls V: Skyrim',
    //     rate: 5,
    //     image: 'https://i.imgur.com/Sr4rCyg.jpg',
    //     desc: '',
    // },
];
