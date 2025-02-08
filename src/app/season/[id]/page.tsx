'use client';

import { useEffect, useState } from 'react';
import { getSeasonById } from '@/services/season';
import { SeasonDTO } from '@/services/season/dto';
import { useParams } from 'next/navigation';
import EpisodeDisplay from '@/components/EpisodeDisplay';

export default function SeasonPage() {
    const [season, setSeason] = useState<SeasonDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        const fetchSeason = async () => {
            try {
                setLoading(true);
                const data = await getSeasonById(params.id as string);
                setSeason(data);
            } catch (err) {
                setError('Failed to load season data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSeason();
    }, [params.id]);

    if (loading) {
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

    if (!season) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Season not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Season {season.id}</h1>
            <div className="grid gap-4">
                <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
                <EpisodeDisplay episodeList={season.episodes} />
            </div>
        </div>
    );
} 