'use client';

import { ReactNode } from 'react';
import { SeasonProvider } from './SeasonContext';
import { EpisodeProvider } from './EpisodeContext';

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <SeasonProvider>
            <EpisodeProvider>
                {children}
            </EpisodeProvider>
        </SeasonProvider>
    );
}
