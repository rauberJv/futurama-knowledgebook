'use client';

import { useEffect } from 'react';
import { EpisodeDTO } from '@/services/episodes/dto';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';
import { useEpisode } from '@/contexts/EpisodeContext';

const EpisodePage = () => {

    const params = useParams();
    const { isLoading, error, currentEpisode, fetchEpisodeById } = useEpisode();

    useEffect(() => {
        fetchEpisodeById(params.id as string);
    }, [fetchEpisodeById, params.id]);

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

    if (!currentEpisode) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Episode not found</div>
            </div>
        );
    }

    const generateDescription = (episode: EpisodeDTO) => {
        return `${episode.name} - ${episode.airDate} - ${episode.season.id}`;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Futurama {currentEpisode?.broadcastCode} - {currentEpisode?.name}</h1>
            <div className="grid gap-4">
                <Card
                    title={currentEpisode?.name ?? ''}
                    description={generateDescription(currentEpisode)}
                />
            </div>
        </div>
    );
}

export default EpisodePage;

