'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getAllSeasons, getSeasonById } from '@/services/season';
import { SeasonDTO, SeasonsResponseDTO } from '@/services/season/dto';

interface SeasonContextData {
    seasons: SeasonsResponseDTO | null;
    currentSeason: SeasonDTO | null;
    isLoading: boolean;
    error: string | null;
    fetchSeasons: (page?: number, size?: number, force?: boolean) => Promise<void>;
    fetchSeasonById: (id: string) => Promise<void>;
    clearCurrentSeason: () => void;
}

const SeasonContext = createContext<SeasonContextData>({} as SeasonContextData);

export function SeasonProvider({ children }: { children: ReactNode }) {
    const [seasons, setSeasons] = useState<SeasonsResponseDTO | null>(null);
    const [currentSeason, setCurrentSeason] = useState<SeasonDTO | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSeasons = useCallback(async (page: number = 1, size: number = 50, force: boolean = false) => {
        if (seasons && !force) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const data = await getAllSeasons(page, size);
            setSeasons(data);
        } catch (err) {
            setError('Failed to fetch seasons');
            console.error('Error fetching seasons:', err);
        } finally {
            setIsLoading(false);
        }
    }, [seasons]);

    const fetchSeasonById = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getSeasonById(id);
            setCurrentSeason(data);
        } catch (err) {
            setError('Failed to fetch season');
            console.error('Error fetching season:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearCurrentSeason = useCallback(() => {
        setCurrentSeason(null);
    }, []);

    return (
        <SeasonContext.Provider
            value={{
                seasons,
                currentSeason,
                isLoading,
                error,
                fetchSeasons,
                fetchSeasonById,
                clearCurrentSeason,
            }}
        >
            {children}
        </SeasonContext.Provider>
    );
}

export function useSeason() {
    const context = useContext(SeasonContext);
    if (!context) {
        throw new Error('useSeason must be used within a SeasonProvider');
    }
    return context;
}
