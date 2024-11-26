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

export const gameModes = [
  {
    title: "One-on-One",
    description: "Direct, head-to-head competition between two players.",
    icon: Users,
    modes: ["Classic", "Blitz"],
  },
  {
    title: "Free-for-All",
    description: "Multiple players compete in a shared session.",
    icon: Zap,
    modes: ["Casual", "Themed"],
  },
  {
    title: "Tournament",
    description: "Advance through brackets to become the champion.",
    icon: Trophy,
    modes: ["Single Elimination", "Double Elimination", "Round Robin"],
  },
  {
    title: "Timed Marathon",
    description: "Solve as many problems as possible within a time limit.",
    icon: Clock,
    modes: ["Solo", "Multiplayer"],
    durations: ["30 minutes", "1 hour"],
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
    modes: ["Single Problem", "Best of 3"],
  },
  {
    title: "Mystery Mode",
    description: "Surprise rules and challenges revealed during the match.",
    icon: HelpCircle,
  },
];
