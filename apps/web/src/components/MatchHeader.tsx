import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { Progress } from "@repo/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import { Badge } from "@repo/ui";
import { Activity, Clock, Play, Send, ShieldOff, Trophy } from "lucide-react";
import React, { useState } from "react";

type MatchHeaderProps = {
  onRun: () => void;
  onSubmit: () => void;
};

export default function MatchHeader({ onRun, onSubmit }: MatchHeaderProps) {
  const [opponentStatusOpen, setOpponentStatusOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-primary text-primary-foreground p-4">
      <div className="flex items-center gap-4">
        <Clock className="w-5 h-5" />
        <div className="font-bold text-lg">12:34</div>
      </div>

      <div>
        <Button variant="outline" size="sm" className="ml-4" onClick={onRun}>
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>

        <Button variant="outline" size="sm" onClick={onSubmit}>
          <Send className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary/20"
          onClick={() => setOpponentStatusOpen(true)}
        >
          <ShieldOff className="w-5 h-5" />
          <span className="sr-only">Opponent Status</span>
        </Button>

        <Dialog open={opponentStatusOpen} onOpenChange={setOpponentStatusOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Opponent Status</DialogTitle>
              <DialogDescription>
                Check the current status of your opponent.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">CodeNinja42</h3>
                  <p className="text-sm text-muted-foreground">Level 15</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-semibold">3 / 4</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Elapsed</p>
                  <p className="font-semibold">18:45</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary/20"
          onClick={() => setLeaderboardOpen(true)}
        >
          <Trophy className="w-5 h-5" />
          <span className="sr-only">Leaderboard</span>
        </Button>

        <Dialog open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Leaderboard</DialogTitle>
              <DialogDescription>
                Current top performers in this competition.
              </DialogDescription>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    rank: 1,
                    name: "Alice",
                    score: 180,
                    time: "22:15",
                    status: "Completed",
                  },
                  {
                    rank: 2,
                    name: "Bob",
                    score: 165,
                    time: "23:30",
                    status: "Completed",
                  },
                  {
                    rank: 3,
                    name: "You",
                    score: 120,
                    time: "19:45",
                    status: "In Progress",
                  },
                  {
                    rank: 4,
                    name: "David",
                    score: 110,
                    time: "20:00",
                    status: "In Progress",
                  },
                  {
                    rank: 5,
                    name: "Eva",
                    score: 90,
                    time: "18:30",
                    status: "In Progress",
                  },
                ].map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.score}</TableCell>
                    <TableCell>{player.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          player.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {player.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          <div className="font-bold text-lg">120 / 200</div>
        </div>
      </div>
    </div>
  );
}
