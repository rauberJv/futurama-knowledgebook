"use client"
import SeasonDisplay from "@/components/SeasonDisplay";

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-y-4">
      <h1 className="text-4xl font-bold">Welcome to Futurama Knowledge Book</h1>
      <p className="text-lg">
        This is a simple Next.js application to consume the Futurama API.
      </p>
      <SeasonDisplay />
    </div>
  );
}
