import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import HomeSpotify from './spotify';

type TypeIcon = { icon: any; text: string; link: string };

export default function Home() {
    return (
        <>
            <div className="max-w-[700px] m-auto pt-24 px-4 text-black-400">
                <Header />
                <HomeSpotify />
                <Projects />
                <HomeFooter />
            </div>
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
                <p>
                    I make software. That&apos;s what I love to do. You can read
                    more about me{' '}
                    <span className="text-primary underline">here</span>.
                </p>
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
            <p className="text-lg">Título do projeto</p>
            <p className="text-sm line-clamp-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
                distinctio quos, iure excepturi iusto inventore ea blanditiis
                veniam laudantium ipsa quas maiores quia a error et, voluptates
                odio incidunt? Maiores!
            </p>
            <div className="flex flex-wrap gap-1 pt-2">
                <TechChip name="Flutter" />
                <TechChip name="Node" />
                <TechChip name="Angular" />
                <TechChip name="Firebase" />
                <TechChip name="Git" />
                <TechChip name="Html" />
                <TechChip name="Css" />
                <TechChip name="Javascript" />
                <TechChip name="Typescript" />
            </div>
        </div>
    );
}

function TechChip({ name }: { name: String }) {
    return (
        <div className="py-2 w-fit text-primary px-1 py-0 border rounded border-primary text-sm hover:text-white hover:bg-primary transition-all">
            {name}
        </div>
    );
}

function HomeFooter() {
    return (
        <div className="py-8 text-center border-dashed border-t-2 py-4 my-8 border-primary">
            Made with ❤️ by Mateus Venâncio using Tailwind & NextJs.
        </div>
    );
}
