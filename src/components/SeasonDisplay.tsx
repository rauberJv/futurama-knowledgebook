import { SeasonDTO } from "@/services/season/dto";
import Card from "./Card";
import { useSeason } from "@/contexts/SeasonContext";
import { useEffect } from "react";

const SeasonDisplay: React.FC = () => {
    const { isLoading, error, seasons, fetchSeasons } = useSeason();

    useEffect(() => {
        fetchSeasons(1, 50, false);
    }, [fetchSeasons]);

    if (isLoading) return (
        <div className="w-full text-center">
            <p className="text-2xl font-bold">Loading...</p>
        </div>
    );

    if (error) return (
        <div className="w-full text-center">
            <p className="text-2xl font-bold">Sorry, we couldn&apos;t find any seasons.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {seasons?.items.map((season: SeasonDTO) => (
                <Card key={season.id} title={`Season ${season.id}`} description={`${season.episodes.length} Episodes`} link={`/season/${season.id}`} />
            ))}
        </div>
    )
}

export default SeasonDisplay;
