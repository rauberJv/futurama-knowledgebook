'use client';

import { useEffect, useState } from 'react';
import { getEpisodeById } from '@/services/episodes';
import { EpisodeDTO } from '@/services/episodes/dto';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';

const EpisodePage = () => {
    const [episode, setEpisode] = useState<EpisodeDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                setLoading(true);
                const data = await getEpisodeById(params.id as string);
                setEpisode(data);
            } catch (err) {
                setError('Failed to load episode data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!episode) {
        return <div>Episode not found</div>;
    }

    const generateDescription = (episode: EpisodeDTO) => {
        return `${episode.name} - ${episode.airDate} - ${episode.season.id}`;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Futurama {episode.broadcastCode} - {episode.name}</h1>
            <div className="grid gap-4">
                <Card
                    title={episode.name}
                    description={generateDescription(episode)}
                />
            </div>
        </div>
    );
}

export default EpisodePage;

