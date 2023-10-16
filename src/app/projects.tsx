import Link from 'next/link';
import Title from './global/title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const colors: any = {
    yellow: {
        text: 'text-[#402c1b]',
        background: 'bg-[#fdecc8]',
    },
    gray: {
        text: 'text-[#32302c]',
        background: 'bg-[#e3e2e0]',
    },
    green: {
        text: 'text-[#1c3829]',
        background: 'bg-[#dbeddb]',
    },
    blue: {
        text: 'text-[#183347]',
        background: 'bg-[#d3e5ef]',
    },
    default: {
        text: 'text-[#32302c]',
        background: 'bg-[#e3e2e0]',
    },
};

export default async function Projects() {
    const response = await fetch('http://localhost:3000/api/projects');
    const projects: Project[] = (await response.json()).projects;

    return (
        <>
            <Title title="Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((e) => {
                    return <ProjectTile key={e.id} project={e} />;
                })}
            </div>
        </>
    );
}

function ProjectTile({ project }: { project: Project }) {
    return (
        <div className="shadow-md hover:shadow-lg rounded-lg p-4 transition-all cursor-default">
            <div className="flex gap-2 items-center">
                <p className="text-lg grow">{project.title}</p>
                <Link href={project.link}>
                    <FontAwesomeIcon
                        icon={faCodeBranch}
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <p className="text-sm line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((e, i) => {
                    return <Tag key={i} tag={e} />;
                })}
            </div>
        </div>
    );
}

function Tag({ tag }: { tag: ProjectTag }) {
    const text = colors[tag.color].text ?? colors.default.text;
    const bg = colors[tag.color].background ?? colors.default.background;

    return (
        <div className={`text-sm w-fit px-1.5 rounded ${text} ${bg}`}>
            {tag.name}
        </div>
    );
}
