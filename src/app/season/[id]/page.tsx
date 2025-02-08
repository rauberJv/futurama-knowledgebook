'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import EpisodeDisplay from '@/components/EpisodeDisplay';
import { useSeason } from '@/contexts/SeasonContext';

export default function SeasonPage() {
    const params = useParams();
    const { isLoading, error, currentSeason, fetchSeasonById } = useSeason();

    useEffect(() => {
        fetchSeasonById(params.id as string);
    }, [fetchSeasonById, params.id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!currentSeason) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Season not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Season {currentSeason.id}</h1>
            <div className="grid gap-4">
                <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
                <EpisodeDisplay episodeList={currentSeason.episodes} />
            </div>
        </div>
    );
} 