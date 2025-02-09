'use client';
import { CharacterDTO } from "@/services/characters/dto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCharacterById } from "@/services/characters/index";
import Image from "next/image";
import CustomMessage from "@/components/CustomMessage";
import Spinner from "@/components/Spinner";
import Link from "next/link";

const CharacterPage = () => {
  const [character, setCharacter] = useState<CharacterDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      const data = await getCharacterById(params.id as string);
      setCharacter(data);
      setLoading(false);
    };

    fetchCharacter();
  }, [params.id]);

  if (loading) {
    return (
      <CustomMessage>
        <Spinner />
      </CustomMessage>
    );
  }

  return (
    <div className="flex flex-col items-start gap-y-4 w-full p-4">
      <h1 className="text-2xl font-bold">{character?.name}</h1>
      <div className="grid grid-cols-12 gap-4">
        <Image
          src={character?.image || ''}
          alt={character?.name || ''}
          className="col-span-12 md:col-span-4 rounded-lg"
          width={400}
          height={400}
        />
        <div className="col-span-12 flex flex-col gap-y-2">
          <p>
            Status <span className="font-bold text-blue-500">{character?.status}</span>
          </p>
          <p>
            Species <span className="font-bold text-blue-500">{character?.species}</span>
          </p>
          <p>
            Gender <span className="font-bold text-blue-500">{character?.gender}</span>
          </p>
        </div>
      </div>
      <Link href="/characters" className="text-blue-500 hover:text-blue-600">
        Back to characters
      </Link>
    </div>
  );
};

export default CharacterPage;
