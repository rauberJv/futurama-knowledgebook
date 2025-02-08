import { SeasonEpisodeDTO    } from "@/services/season/dto";
import Card from "./Card";

interface EpisodeDisplayProps {
    episodeList: SeasonEpisodeDTO[];
}

const EpisodeDisplay: React.FC<EpisodeDisplayProps> = ({ episodeList }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {episodeList.map(episode => (
                <Card key={episode.id} title={`Episode ${episode.number} `} link={`/episode/${episode.id}`} />
            ))}
        </div>
    )
}

export default EpisodeDisplay;