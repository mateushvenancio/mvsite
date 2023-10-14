import Games from './games';

export default function Shelf() {
    return (
        <>
            <div className="text-lg font-bold pt-4 mt-4">Shelf</div>
            <p>
                Welcome to my shelf. You can see the books I read, TV shows I
                watched and the games I played. I&apos;m excited to share it
                here.{' '}
                <span className="text-primary font-semibold">
                    (Under construction)
                </span>
            </p>
            <Games />
        </>
    );
}
