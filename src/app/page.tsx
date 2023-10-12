import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faCodeBranch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeSpotify from './spotify';
import Link from 'next/link';
import Image from 'next/image';

type TypeIcon = { icon: any; text: string; link: string };

export default function Home() {
    return (
        <>
            <Header />
            <HomeSpotify />
            <Projects />
        </>
    );
}

function Header() {
    return (
        <div>
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
        <div className="bg-primary w-fit text-white px-4 py-2 rounded-tr-lg rounded-tl-lg rounded-br-lg mb-2 hover:ml-2 transition-all">
            Hello, I am
        </div>
    );
}

function HomeIcon({ icon, text, link }: TypeIcon) {
    return (
        <a href={link} className="hover:text-primary hover:pl-2 transition-all">
            <FontAwesomeIcon icon={icon} className="pr-2" />
            {text}
        </a>
    );
}

function Title({ title }: { title: string }) {
    return (
        <div className="text-lg font-bold border-dashed border-t-2 border-primary pt-4 mt-4">
            {title}
        </div>
    );
}

function Projects() {
    return (
        <>
            <Title title="Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProjectTile />
                <ProjectTile />
                <ProjectTile />
                <ProjectTile />
                <ProjectTile />
                <ProjectTile />
            </div>
        </>
    );
}

function ProjectTile() {
    return (
        <div className="shadow-md hover:shadow-lg rounded-lg p-4 transition-all cursor-default">
            <div className="flex gap-2 items-center">
                <Image
                    src="https://user-images.githubusercontent.com/25181517/186150365-da1eccce-6201-487c-8649-45e9e99435fd.png"
                    width={20}
                    height={20}
                    alt="Mateus Venâncio"
                    className="aspect-square"
                />
                <p className="text-lg">Título do projeto</p>
                <div className="grow"></div>
                <Link href="#">
                    <FontAwesomeIcon
                        icon={faCodeBranch}
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <p className="text-sm line-clamp-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Placeat aspernatur voluptatum nihil, quos in ipsa doloremque
                nulla rem ut alias corrupti repellat totam eos beatae. Illo
                soluta ipsa unde eaque.
            </p>
        </div>
    );
}
