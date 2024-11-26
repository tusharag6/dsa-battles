import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { generateRandomUsername } from "@/lib/generateRandomUsername";
import {
  Users,
  Zap,
  Trophy,
  Clock,
  Star,
  EyeOff,
  Timer,
  HelpCircle,
} from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const gameModes = [
  {
    title: "One-on-One",
    description: "Direct, head-to-head competition between two players.",
    icon: Users,
    // add two modes classic, blitz
  },
  {
    title: "Free-for-All",
    description: "Multiple players compete in a shared session.",
    icon: Zap,
    // add two modes casual, themed
  },
  {
    title: "Tournament",
    description: "Advance through brackets to become the champion.",
    icon: Trophy,
    // add modes: single elimination, double elimination, round robin
  },
  {
    title: "Timed Marathon",
    description: "Solve as many problems as possible within a time limit.",
    icon: Clock,
    // add duration options
    // add modes: multiplayer, solo mode
  },
  {
    title: "Ranked Mode",
    description: "Competitive matches with a persistent ranking system.",
    icon: Star,
  },
  {
    title: "Blind Mode",
    description: "Submit code without testing during the match.",
    icon: EyeOff,
  },
  {
    title: "Speedrun Mode",
    description: "Fast-paced mode where speed is key.",
    icon: Timer,
    // modes/format: single problem, bes
  },
  {
    title: "Mystery Mode",
    description: "Surprise rules and challenges revealed during the match.",
    icon: HelpCircle,
  },
];

const socket = io("http://localhost:5001");

export default function Component() {
  const [_isMatched, setIsMatched] = useState(false);
  const [_opponent, setOpponent] = useState(null);
  const [_matchTimeout, setMatchTimeout] = useState(false);
  const [isFindingMatch, setIsFindingMatch] = useState(false);

  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleModeSelect = (title: string) => {
    setSelectedMode(title);
  };

  const handlePlay = () => {
    if (selectedMode) {
      console.log(`Starting game mode: ${selectedMode}`);
      handleJoinQueue();
    }
  };

  const handleJoinQueue = () => {
    setIsFindingMatch(true);
    socket.emit("joinQueue", {
      username: generateRandomUsername(),
    });
  };

  useEffect(() => {
    // Listen for match result
    socket.on("matched", (data) => {
      setIsMatched(true);
      setOpponent(data.opponent);
      setIsFindingMatch(false);
    });

    // Listen for match timeout
    socket.on("matchTimeout", (data) => {
      setMatchTimeout(true);
      console.log(data);
      setIsFindingMatch(false);
    });

    return () => {
      socket.off("matched");
      socket.off("matchTimeout");
    };
  }, []);

  return (
    <BackgroundGradientAnimation>
      <div className="container mx-auto px-4 py-8 absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold pointer-events-none text-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Choose Your Game Mode
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {gameModes.map((mode, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                selectedMode === mode.title ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleModeSelect(mode.title)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {<mode.icon className="h-6 w-6" />}
                  {mode.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {mode.description}
                  {/* add a tool tip to add more details about the mode */}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add more details or features here if needed */}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handlePlay}
            disabled={!selectedMode || isFindingMatch}
            className="px-28 py-6 text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFindingMatch ? "Finding Match..." : `Play ${selectedMode || ""}`}
          </Button>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
