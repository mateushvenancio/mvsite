import { getMusic } from '@/lib/spotify';
import Links from '@/components/Links';
import Music from '@/components/Music';
import StatusBar from '@/components/StatusBar';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const music = await getMusic();

    return (
        <main className="shell">
            <div className="frame">
                <section className="identity">
                    <p className="prompt reveal" style={{ ['--d' as string]: '0ms' }}>
                        <span className="prompt-path">~/sol-iii/terra</span>
                        <span className="prompt-sign">$</span> whoami
                        <span className="cursor" aria-hidden="true" />
                    </p>

                    <h1 className="name reveal" style={{ ['--d' as string]: '120ms' }}>
                        <span className="name-first">Mateus</span>
                        <span className="name-last">Venâncio</span>
                    </h1>

                    <p className="role reveal" style={{ ['--d' as string]: '240ms' }}>
                        Software Engineer
                        <span className="role-sub">
                            {' '}
                            · escrevo código, olho pro céu e coleciono trilhas sonoras
                        </span>
                    </p>

                    <CodeCard />

                    <Links />
                </section>

                <Music initial={music} />
            </div>

            <StatusBar />
        </main>
    );
}

function CodeCard() {
    return (
        <div className="editor reveal" style={{ ['--d' as string]: '360ms' }}>
            <div className="editor-bar">
                <span className="editor-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                </span>
                <span className="editor-tab">mateus.ts</span>
            </div>
            <pre className="editor-code">
                <code>
                    <span className="t-com">
                        {'// "Somos feitos de poeira de estrelas." — Carl Sagan'}
                    </span>
                    {'\n'}
                    <span className="t-key">const</span> <span className="t-var">mateus</span>{' '}
                    <span className="t-pun">=</span> <span className="t-pun">{'{'}</span>
                    {'\n  '}
                    <span className="t-prop">role</span>
                    <span className="t-pun">:</span>{' '}
                    <span className="t-str">&apos;Software Engineer&apos;</span>
                    <span className="t-pun">,</span>
                    {'\n  '}
                    <span className="t-prop">home</span>
                    <span className="t-pun">:</span>{' '}
                    <span className="t-str">&apos;Terra, Brasil&apos;</span>
                    <span className="t-pun">,</span>
                    {'\n  '}
                    <span className="t-prop">hobbies</span>
                    <span className="t-pun">: [</span>
                    <span className="t-str">&apos;cosmos&apos;</span>
                    <span className="t-pun">, </span>
                    <span className="t-str">&apos;música&apos;</span>
                    <span className="t-pun">, </span>
                    <span className="t-str">&apos;games&apos;</span>
                    <span className="t-pun">, </span>
                    <span className="t-str">&apos;livros&apos;</span>
                    <span className="t-pun">],</span>
                    {'\n  '}
                    <span className="t-prop">curiosity</span>
                    <span className="t-pun">:</span> <span className="t-num">Infinity</span>
                    <span className="t-pun">,</span>
                    {'\n'}
                    <span className="t-pun">{'};'}</span>
                </code>
            </pre>
        </div>
    );
}
