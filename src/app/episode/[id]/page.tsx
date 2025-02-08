'use client';

import { useEffect } from 'react';
import { EpisodeDTO } from '@/services/episodes/dto';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';
import { useEpisode } from '@/contexts/EpisodeContext';
import CustomMessage from '@/components/CustomMessage';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import EpisodeDisplay from '@/components/EpisodeDisplay';
import { useSeason } from '@/contexts/SeasonContext';

const EpisodePage = () => {

    const params = useParams();
    const { isLoading, error, currentEpisode, fetchEpisodeById } = useEpisode();
    const { currentSeason } = useSeason();

    useEffect(() => {
        fetchEpisodeById(params.id as string);
    }, [fetchEpisodeById, params.id]);

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

    if (!currentEpisode) {
        return (
            <CustomMessage>
                <div>Episode not found</div>
            </CustomMessage>
        );
    }

    const generateDescription = (episode: EpisodeDTO) => {
        return `${episode.name} - ${episode.airDate} - ${episode.season.id}`;
    }

    return (
        <div className="flex flex-col items-start gap-y-4 w-full">
            <h1 className="text-3xl font-bold mb-6">Futurama {currentEpisode?.broadcastCode} - {currentEpisode?.name}</h1>
            <div className="grid gap-4">
                <Card
                    title={currentEpisode?.name ?? ''}
                    description={generateDescription(currentEpisode)}
                />
            </div>
            {currentSeason && (
                <div className='flex flex-col items-start gap-y-4 w-full'>
                    <h2 className='text-2xl font-semibold mb-4'>Check also this other episodes from <span className='font-bold text-blue-500'>Season {currentSeason?.id}</span></h2>
                    <EpisodeDisplay episodeList={currentSeason?.episodes ?? []} />
                </div>
            )}
            <Link href={`/season/${currentEpisode?.season.id}`} className="text-blue-500 hover:text-blue-700">Return to Season {currentEpisode?.season.id}</Link>
        </div>
    );
}

export default EpisodePage;

