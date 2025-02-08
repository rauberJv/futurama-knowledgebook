"use client"
import SeasonDisplay from "@/components/SeasonDisplay";

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-y-8">
      <h1 className="text-4xl font-bold">Welcome to <span className="font-bold text-blue-500">Futurama Knowledge Reserve</span></h1>
      <p className="text-lg">
      After Bender's glorious world domination (complete with mandatory beer breaks), humanity scrambled to save its precious knowledge before it was all replaced by robot cocktail recipes. Welcome to the ultimate Futurama knowledge vault — powered by an API smarter than Hypnotoad!
      </p>
      <div className="flex flex-col items-start gap-y-4 w-full">
        <h2 className="text-2xl font-bold">Check out the <span className="font-bold text-blue-500">Seasons</span></h2>
        <SeasonDisplay />
      </div>
    </div>
  );
}
