'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getAllEpisodes, getEpisodeById } from '@/services/episodes';
import { EpisodeDTO, EpisodesResponseDTO } from '@/services/episodes/dto';

interface EpisodeContextData {
    episodes: EpisodesResponseDTO | null;
    currentEpisode: EpisodeDTO | null;
    filteredEpisodes: EpisodeDTO[];
    isLoading: boolean;
    error: string | null;
    fetchEpisodes: (page?: number, size?: number) => Promise<void>;
    fetchEpisodeById: (id: string) => Promise<void>;
    filterEpisodesBySeasonId: (seasonId: number) => void;
    clearCurrentEpisode: () => void;
    clearFilter: () => void;
}

const EpisodeContext = createContext<EpisodeContextData>({} as EpisodeContextData);

export function EpisodeProvider({ children }: { children: ReactNode }) {
    const [episodes, setEpisodes] = useState<EpisodesResponseDTO | null>(null);
    const [currentEpisode, setCurrentEpisode] = useState<EpisodeDTO | null>(null);
    const [filteredEpisodes, setFilteredEpisodes] = useState<EpisodeDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEpisodes = useCallback(async (page: number = 1, size: number = 50) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getAllEpisodes(page, size);
            setEpisodes(data);
            setFilteredEpisodes(data.items);
        } catch (err) {
            setError('Failed to fetch episodes');
            console.error('Error fetching episodes:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchEpisodeById = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getEpisodeById(id);
            setCurrentEpisode(data);
        } catch (err) {
            setError('Failed to fetch episode');
            console.error('Error fetching episode:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const filterEpisodesBySeasonId = useCallback((seasonId: number) => {
        if (!episodes) return;
        
        const filtered = episodes.items.filter(episode => episode.season.id === seasonId);
        setFilteredEpisodes(filtered);
    }, [episodes]);

    const clearFilter = useCallback(() => {
        if (episodes) {
            setFilteredEpisodes(episodes.items);
        }
    }, [episodes]);

    const clearCurrentEpisode = useCallback(() => {
        setCurrentEpisode(null);
    }, []);

    return (
        <EpisodeContext.Provider
            value={{
                episodes,
                currentEpisode,
                filteredEpisodes,
                isLoading,
                error,
                fetchEpisodes,
                fetchEpisodeById,
                filterEpisodesBySeasonId,
                clearCurrentEpisode,
                clearFilter,
            }}
        >
            {children}
        </EpisodeContext.Provider>
    );
}

export function useEpisode() {
    const context = useContext(EpisodeContext);
    if (!context) {
        throw new Error('useEpisode must be used within an EpisodeProvider');
    }
    return context;
}
