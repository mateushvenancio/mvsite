import { BlockRenderer } from '@/components/notion-render';
import { NotionService, NotionProdParams } from '@/services/notion-service';
import { NotionTag, Title } from '@/components';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function About() {
    const Notion = new NotionService(NotionProdParams);
    const about = await Notion.getAboutPage();

    return (
        <>
            <p className="text-xl font-bold">About</p>

            {(about as any[]).map((e, i) => {
                return <BlockRenderer key={i} block={e} />;
            })}

            <Projects />
        </>
    );
}

async function Projects() {
    const Notion = new NotionService(NotionProdParams);
    const projects: Project[] = await Notion.getAllProjects();

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
                    return <NotionTag key={i} tag={e} />;
                })}
            </div>
        </div>
    );
}
