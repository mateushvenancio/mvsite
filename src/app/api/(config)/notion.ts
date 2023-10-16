import { Client } from '@notionhq/client';
import { ApiError } from 'next/dist/server/api-utils';

export const NotionClient = new Client({
    auth: process.env.NOTION_TOKEN,
});

// export default function getNotion() {
//     const token = process.env.NOTION_TOKEN;

//     if (!token) {
//         throw new ApiError(500, 'Invalid Notion token.');
//     }

//     return new Client({ auth: token });
// }
