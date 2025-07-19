import { faLinkedin, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default async function About() {
    return (
        <header className="text-center">
            <Image
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg border-4 border-white"
                src="https://avatars.githubusercontent.com/u/38964103"
                alt="Profile Picture"
                width={128}
                height={128}
            />
            <h1 className="text-4xl font-bold text-gray-900">
                Mateus Venâncio
            </h1>
            <p className="text-lg mt-2 text-gray-600">
                Web Developer, Music Enthusiast & Blogger
            </p>
            <SocialLinks />
        </header>
    );
}

function SocialLinks() {
    return (
        <div className="flex justify-center space-x-6 mt-4">
            <HomeIcon
                icon={faEnvelope}
                link="mailto:contato@mateusvenancio.com.br"
                color="hover:text-blue-400"
            />
            <HomeIcon
                icon={faLinkedin}
                link="https://www.linkedin.com/in/mateushvenancio/"
                color="hover:text-blue-700"
            />
            <HomeIcon
                icon={faGithub}
                link="https://github.com/mateushvenancio"
                color="hover:text-gray-900"
            />
        </div>
    );
}

function HomeIcon({
    icon,
    link,
    color,
}: {
    icon: IconDefinition;
    link: string;
    color: string;
}) {
    const fullClass = 'text-gray-500 transition-colors duration-300 ' + color;

    return (
        <a href={link} className={fullClass} target="_blank">
            <FontAwesomeIcon
                fill="currentColor"
                icon={icon}
                className="w-8 h-8"
                size="2xl"
                aria-hidden="true"
            />
        </a>
    );
}
