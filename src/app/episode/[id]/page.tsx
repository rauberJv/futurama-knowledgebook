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
        if (currentEpisode?.id === Number(params.id)) return;
        fetchEpisodeById(params.id as string);
    }, [fetchEpisodeById, params.id, currentEpisode]);

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
        <div className="flex flex-col items-start gap-y-8 w-full">
            <h1 className="text-3xl font-bold">Futurama {currentEpisode?.broadcastCode} - {currentEpisode?.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                <Card
                    title={currentEpisode?.name ?? ''}
                    description={`Episode Name`}
                />
                <Card
                    title={`${currentEpisode?.season.id}`}
                    description={`Episode Season`}
                />
                <Card
                    title={`${currentEpisode?.number}`}
                    description={`Episode Number`}
                />
                <Card
                    title={`${currentEpisode?.airDate}`}
                    description={`Episode Air Date`}
                />
                <Card
                    title={`${currentEpisode?.broadcastCode}`}
                    description={`Episode Broadcast Code`}
                />
                <Card
                    title={`${currentEpisode?.duration}`}
                    description={`Episode Duration`}
                />
                <Card
                    title={`${currentEpisode?.productionCode}`}
                    description={`Episode Production Code`}
                />
            </div>
            {currentSeason && (
                <div className='flex flex-col items-start gap-y-4 w-full'>
                    <h2 className='text-2xl font-semibold'>Check also this other episodes from <span className='font-bold text-blue-500'>Season {currentSeason?.id}</span></h2>
                    <EpisodeDisplay episodeList={currentSeason?.episodes ?? []} />
                </div>
            )}
            <Link href={`/season/${currentEpisode?.season.id}`} className="text-blue-500 hover:text-blue-700">Return to Season {currentEpisode?.season.id}</Link>
        </div>
    );
}

export default EpisodePage;

