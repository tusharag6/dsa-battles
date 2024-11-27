import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GameModeDetails from "@/components/game-mode-details";
import { gameMode } from "@/lib/gameMode";

export default function GameModes() {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleCardClick = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-200 mb-8">
          Pick a Game Mode
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameMode.map((mode) => (
            <Sheet key={mode.title}>
              <SheetTrigger asChild>
                <Card
                  className="relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleCardClick(mode)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${mode.src})`,
                    }}
                  />
                  <div className="relative p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{mode.title}</h3>
                    <p className="text-sm">{mode.description}</p>
                  </div>
                </Card>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <GameModeDetails mode={mode} />
              </SheetContent>
            </Sheet>
          ))}
          <Card className="relative overflow-hidden rounded-lg aspect-[3/4] cursor-not-allowed opacity-70">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(/src/assets/comingsoon.jpeg)`,
              }}
            />
            <div className="relative p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-sm">
                A thrilling new mode is on its way. Stay tuned!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
