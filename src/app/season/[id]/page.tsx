'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import EpisodeDisplay from '@/components/EpisodeDisplay';
import { useSeason } from '@/contexts/SeasonContext';
import CustomMessage from '@/components/CustomMessage';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

export default function SeasonPage() {
    const params = useParams();
    const { isLoading, error, currentSeason, fetchSeasonById } = useSeason();

    useEffect(() => {
        if (currentSeason?.id === Number(params.id)) return;
        fetchSeasonById(Number(params.id));
    }, [fetchSeasonById, params.id, currentSeason]);

    if (isLoading) {
        return (
            <CustomMessage>
                <Spinner />
            </CustomMessage>
        );
    }

    if (error) {
        return (
            <CustomMessage>
                <div className="text-red-500">{error}</div>
            </CustomMessage>
        );
    }

    if (!currentSeason) {
        return (
            <CustomMessage>
                <div>Season not found</div>
            </CustomMessage>
        );
    }

    return (
        <div className="container w-full">
            <h1 className="text-3xl font-bold mb-6">Season <span className="font-bold text-blue-500">{currentSeason.id}</span></h1>
            <div className="grid gap-4">
                <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
                <EpisodeDisplay episodeList={currentSeason.episodes} />
                <Link href={`/`} className="text-blue-500 hover:text-blue-700">Return to Home</Link>
            </div>
        </div>
    );
} 