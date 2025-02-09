"use client";
import CharacterDisplay from "@/components/CharacterDisplay";
import SeasonDisplay from "@/components/SeasonDisplay";
import { useEffect, useState } from "react";
import { getAllCharacters } from "@/services";
import { CharacterDTO } from "@/services/characters/dto";
import Link from "next/link";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterDTO[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getAllCharacters({ size: 5 });
        setCharacters(data.items);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div className="flex flex-col items-start gap-y-8">
      <h1 className="text-4xl font-bold">
        Welcome to <span className="font-bold text-blue-500">Futurama Knowledge Reserve</span>
      </h1>
      <p className="text-lg">
        After Bender&apos;s glorious world domination (complete with mandatory beer breaks), humanity scrambled to save its precious knowledge before it was all replaced by robot cocktail recipes. Welcome to the ultimate Futurama knowledge vault — powered by an API smarter than Hypnotoad!
      </p>
      <div className="flex flex-col items-start gap-y-4 w-full">
        <h2 className="text-2xl font-bold">
          Check out the <span className="font-bold text-blue-500">Seasons</span>
        </h2>
        <SeasonDisplay />
      </div>
      <div className="flex flex-col items-start gap-y-4 w-full">
        <h2 className="text-2xl font-bold">
          Check out the <span className="font-bold text-blue-500">Characters</span>
        </h2>
        <CharacterDisplay characters={characters} />
        <Link href="/characters" className="text-blue-500 hover:text-blue-600">
          See more characters
        </Link>
      </div>
    </div>
  );
}
