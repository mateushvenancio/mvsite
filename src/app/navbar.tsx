'use client';

import { useState } from 'react';

export default function NavBar() {
    const [aberto, setAberto] = useState(false);
    return (
        <div
            className={`h-[${
                aberto ? '100px' : '200px'
            }] bg-red-400 transition-all`}
            onClick={() => {
                setAberto(!aberto);
            }}
        >
            Nav Bar
        </div>
    );
}
