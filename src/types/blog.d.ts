type BlogPost = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    author: BlogAuthor;
    title: string;
    tags: Tag[];
    content: any[];
};

type BlogAuthor = {
    id: string;
    name: string;
    avatar_url: string;
};
