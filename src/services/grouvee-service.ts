export class GrouveeService {
    private grouveUrl: string = '';

    constructor() {
        this.grouveUrl = process.env.GROUVEE_URL ?? '';
    }

    async getGameList(): Promise<GameShelf[]> {
        const result = await fetch(this.grouveUrl, {
            method: 'GET',
            next: { revalidate: 7200 },
        });
        const json = await result.json();

        const games: GameItem[] = json.serialized_data.ssgs.map((e) => {
            const item: GameItem = {
                id: e.id,
                name: e.game.name,
                image: e.game.thumbnail_147_220,
                rating: e.review?.rating,
                review: e.review?.text,
                shelfId: e.shelf,
            };
            return item;
        });

        const allShelves = [
            ...(json.serialized_data.main_shelves || []),
            ...(json.serialized_data.other_shelves || []),
        ];

        const shelves: GameShelf[] = allShelves.map((e) => {
            const item: GameShelf = {
                shelfId: e.id,
                shelfName: e.name,
                shelfDescription: e.description ?? '',
                games: [],
            };
            item.games = games.filter((game) => game.shelfId == item.shelfId);
            return item;
        });

        return shelves;
    }
}
