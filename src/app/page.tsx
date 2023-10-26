import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Projects from '@/components/projects';

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
