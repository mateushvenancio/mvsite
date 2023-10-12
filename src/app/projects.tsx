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

const icons = {
    flutter:
        'https://user-images.githubusercontent.com/25181517/186150365-da1eccce-6201-487c-8649-45e9e99435fd.png',
    dart: 'https://user-images.githubusercontent.com/25181517/186150304-1568ffdf-4c62-4bdc-9cf1-8d8efcea7c5b.png',
    react: 'https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png',
    next: 'https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704',
};

const projects: ProjectType[] = [
    {
        title: 'Site',
        description: 'This website :D',
        icon: icons.next,
        link: 'https://github.com/mateushvenancio/mvsite',
    },
    {
        title: 'Organizzer',
        description:
            'Application I made mainly for shopping list. It includes some utils, like a WhatsApp number launcher, QR Code reader, and some calculator presets.',
        icon: icons.flutter,
        link: 'https://github.com/mateushvenancio/organizzer',
    },
    {
        title: 'Fext',
        description:
            'CLI I made with Dart to automate some tasks while I work with Flutter. The name stands for Flutter + Extended.',
        icon: icons.dart,
        link: 'https://github.com/mateushvenancio/fext',
    },
    {
        title: 'Weaver Clone',
        description: 'Weaver clone I made in order to study a bit of ReactJs.',
        icon: icons.react,
        link: 'https://github.com/mateushvenancio/weaver-clone',
    },
    {
        title: 'Wordle Clone',
        description: 'Wordle clone I made in order to study a bit of ReactJs.',
        icon: icons.react,
        link: 'https://github.com/mateushvenancio/wordle-clone',
    },
];

export default function Projects() {
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
