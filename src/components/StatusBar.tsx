'use client';

import { useEffect, useState } from 'react';

export default function StatusBar() {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const format = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Sao_Paulo',
        });
        const tick = () => setTime(format.format(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <footer className="statusbar">
            <div className="sb-group">
                <span className="sb-item sb-branch">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.12a2.25 2.25 0 1 0-1.5 0v5.26a2.25 2.25 0 1 0 1.5 0V9.5h4.25A2.75 2.75 0 0 0 12 6.75v-1.4a2.25 2.25 0 1 0-1.5 0v1.4c0 .69-.56 1.25-1.25 1.25H5V5.37ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm7-8.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                        />
                    </svg>
                    main
                </span>
                <span className="sb-item">
                    <i className="sb-dot" /> online
                </span>
                <span className="sb-item sb-hide-sm">0 erros · 0 avisos</span>
            </div>
            <div className="sb-group">
                <span className="sb-item sb-hide-sm">-18.97°, -49.46°</span>
                <span className="sb-item sb-hide-sm">UTF-8</span>
                <span className="sb-item">BRT {time ?? '--:--:--'}</span>
            </div>
        </footer>
    );
}
