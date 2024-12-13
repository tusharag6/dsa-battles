import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";

export default function MatchmakingPage() {
  const navigate = useNavigate();
  const [playersFound, setPlayersFound] = useState(0);
  const [searching, setSearching] = useState(true);
  const totalPlayers = 6;
  const tips = [
    "Review your code carefully before submitting to avoid syntax errors!",
    "Time management is key - read the problem statement thoroughly first.",
    "Test your solution thoroughly with edge cases before submitting.",
    "Keep your code clean and well-commented for better readability.",
    "Use meaningful variable names to improve code comprehension.",
    "Break down complex problems into smaller, manageable functions.",
    "Consider time and space complexity when designing your solution.",
    "Practice regularly to improve your problem-solving skills.",
    "Learn to use debugging tools effectively to find and fix issues quickly.",
    "Don't hesitate to ask for help or clarification if you're stuck.",
  ];
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (searching && playersFound < totalPlayers) {
      const timer = setTimeout(() => {
        setPlayersFound((prev) => prev + 1);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [playersFound, searching]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 15000);
    return () => clearInterval(tipInterval);
  }, []);

  const handleExitGame = () => {
    setSearching(false);
    navigate("/game/modes");
  };

  return (
    <BackgroundGradientAnimation>
      <div className="min-h-screen flex items-center justify-center p-4 relative z-20">
        <div className="max-w-xl w-full rounded-lg shadow-lg">
          <div className="rounded-lg p-8">
            <div className="flex flex-col items-center space-y-8">
              <div className="w-full text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Searching for opponents
                </h1>
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <Users className="w-5 h-5" />
                  <span className="text-xl">
                    Players found: {playersFound}/{totalPlayers}
                  </span>
                </div>
              </div>

              <div className="w-full space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTip}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-muted p-4 rounded-lg border"
                  >
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">TIP: </span>
                      {tips[currentTip]}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleExitGame}
                >
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
