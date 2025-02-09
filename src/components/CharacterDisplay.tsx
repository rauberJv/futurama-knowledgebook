import { CharacterDTO } from "@/services/characters/dto";
import Card from "./Card";

interface CharacterDisplayProps {
  characters: CharacterDTO[];
}

const CharacterDisplay = ({ characters = [] }: CharacterDisplayProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full auto-rows-auto">
      {characters.map((character) => (
        <Card
          key={character.id}
          title={character.name}
          description={character.gender}
          link={`/characters/${character.id}`}
          htmlTitle={`${character.name} - ${character.gender}`}
          image={character.image}
        />
      ))}
    </div>
  );
};

export default CharacterDisplay;
