"use client"
import SeasonDisplay from "@/components/SeasonDisplay";
import { getAllSeasons } from "@/services";
import { SeasonDTO } from "@/services/season/dto";
import { useEffect, useState } from "react";

export default function Home() {
  const [seasons, setSeasons] = useState<SeasonDTO[]>([]);

  const fetchSeasons = async () => {
    const { items } = await getAllSeasons(1, 50);
    setSeasons(items);
  }

  useEffect(() => {
    fetchSeasons();
  }, []);

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-4xl font-bold">Welcome to Futurama Knowledge Book</h1>
      <p className="text-lg">
        This is a simple Next.js application to consume the Futurama API.
      </p>
      <SeasonDisplay seasonList={seasons} />
    </div>
  );
}
