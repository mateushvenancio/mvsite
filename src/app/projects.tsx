import Link from 'next/link';
import Image from 'next/image';
import Title from './global/title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

type ProjectType = {
    title: string;
    description: string;
    icon: string;
    link: string;
};

export default async function Projects() {
    const response = await fetch(
        'https://raw.githubusercontent.com/mateushvenancio/projetos-md/main/projects.json'
    );
    const projects: ProjectType[] = (await response.json()).projects;

    return (
        <>
            <Title title="Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((e, i) => {
                    return <ProjectTile key={i} project={e} />;
                })}
            </div>
        </>
    );
}

function ProjectTile({ project }: { project: ProjectType }) {
    return (
        <div className="shadow-md hover:shadow-lg rounded-lg p-4 transition-all cursor-default">
            <div className="flex gap-2 items-center">
                <Image
                    src={project.icon}
                    width={20}
                    height={20}
                    alt={project.title}
                    className="aspect-square"
                />
                <p className="text-lg">{project.title}</p>
                <div className="grow"></div>
                <Link href={project.link}>
                    <FontAwesomeIcon
                        icon={faCodeBranch}
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <p className="text-sm line-clamp-2">{project.description}</p>
        </div>
    );
}
