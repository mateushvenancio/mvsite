type Project = {
    id: string;
    title: string;
    description: string;
    link: string;
    tags: ProjectTag[];
};

type ProjectTag = {
    id: string;
    name: string;
    color: string;
};
