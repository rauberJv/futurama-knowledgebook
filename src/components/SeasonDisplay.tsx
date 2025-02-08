import { SeasonDTO } from "@/services/season/dto";
import Card from "./Card";

interface SeasonDisplayProps {
    seasonList: SeasonDTO[];
}

const SeasonDisplay: React.FC<SeasonDisplayProps> = ({ seasonList }: SeasonDisplayProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {seasonList.map(season => (
                <Card key={season.id} title={`Season ${season.id}`} link={`/season/${season.id}`} />
            ))}
        </div>
    )
}

export default SeasonDisplay;
