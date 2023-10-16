type BlogPost = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    author: BlogAuthor;
    title: string;
    tags: Tag[];
    content: BlogContent[];
};

type BlogAuthor = {
    id: string;
    name: string;
    avatar_url: string;
};

type BlogContent = {
    id: string;
    parentId: string;
    type: string;
    content: any;
};
