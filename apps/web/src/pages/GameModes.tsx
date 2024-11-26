import { Card } from "@/components/ui/card"; 
import React from "react";

export default function GameModes() {
  return (
    <div className="w-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-bold text-neutral-200 font-sans">
        Pick a Game Mode
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {GameMode.map((mode) => (
          <Card
            key={mode.title}
            className="relative w-full h-[500px] overflow-hidden rounded-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${mode.src})`,
              }}
            />
            <div className="relative z-10 p-6 text-white">
              <h2 className="text-2xl font-bold mb-3">{mode.title}</h2>
              <p className="text-lg">{mode.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const GameMode = [
  {
    title: "Head-to-Head Battle",
    description: "Direct competition, one-on-one.",
    src: "/src/assets/singles.jpeg",
  },
  {
    title: "Free-for-All Showdown",
    description: "Multiple players, no-holds-barred.",
    src: "/src/assets/multiplayer.jpeg",
  },
  {
    title: "Timed Challenge",
    description: "Race against time, solve fast.",
    src: "/src/assets/timed.jpeg",
  },
  {
    title: "Speedrun Showdown",
    description: "Adrenaline rush, fast-paced mode.",
    src: "/src/assets/speedrun.jpeg",
  },
];
