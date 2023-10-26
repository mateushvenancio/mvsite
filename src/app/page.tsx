import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCodeBranch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { NotionTag, Title } from '@/components';
import { NotionProdParams, NotionService } from '@/services/notion-service';

export default function Home() {
    return (
        <>
            <Header />
            <hr className="mt-4 text-primary" />
            <Projects />
        </>
    );
}

function Header() {
    return (
        <div className="cursor-default">
            <Toast />
            <h1 className="text-4xl font-bold">Mateus Venâncio</h1>
            <h2 className="text-2xl">Developer</h2>
            <br />
            <div className="grid gap-y-1">
                <HomeIcon
                    icon={faEnvelope}
                    text="contato@mateusvenancio.com.br"
                    link="mailto:contato@mateusvenancio.com.br"
                />
                <HomeIcon
                    icon={faLinkedin}
                    text="mateushvenancio"
                    link="https://www.linkedin.com/in/mateushvenancio/"
                />
                <HomeIcon
                    icon={faGithub}
                    text="mateushvenancio"
                    link="https://github.com/mateushvenancio"
                />
            </div>
            <div className="py-2">
                <p>I make software. That&apos;s what I love to do.</p>
            </div>
        </div>
    );
}

function Toast() {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary w-fit text-white px-4 py-2 rounded-tr-lg rounded-tl-lg rounded-br-lg mb-2 hover:ml-2 transition-all">
            Hello, I am
        </div>
    );
}

function HomeIcon({
    icon,
    text,
    link,
}: {
    icon: any;
    text: string;
    link: string;
}) {
    return (
        <a
            href={link}
            className="hover:text-secondary hover:pl-2 transition-all"
        >
            <FontAwesomeIcon icon={icon} className="pr-2" />
            {text}
        </a>
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
