import Games from './games';
import Title from './title';

export default function Shelf() {
    return (
        <>
            <div className="text-lg font-bold pt-4 mt-4">Shelf</div>
            <p>
                Welcome to my shelf. You can see the books I read, TV shows I
                watched and the games I played. I&apos;m excited to share it
                here.
            </p>
            <Games />
        </>
    );
}
