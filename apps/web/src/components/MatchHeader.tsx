import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, Play, Send, Trophy } from "lucide-react";
import React, { useState } from "react";

type MatchHeaderProps = {
  onRun: () => void;
  onSubmit: () => void;
};

export default function MatchHeader({ onRun, onSubmit }: MatchHeaderProps) {
  const [opponentStatusOpen, setOpponentStatusOpen] = useState(false);
  // const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-background text-card-foreground px-4 pt-2">
      <div className="flex items-center gap-2 border p-1 px-4 rounded-sm bg-secondary">
        <Clock className="w-5 h-5" />
        <div className="font-bold text-lg">12:34</div>
      </div>

      <div className="flex gap-px">
        <Button
          variant={"secondary"}
          className="rounded-l-sm rounded-r-none"
          onClick={onRun}
        >
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>

        <Button
          onClick={onSubmit}
          variant={"secondary"}
          className="rounded-r-sm rounded-l-none"
        >
          <Send className="w-4 h-4 mr-2 text-primary" />
          <span className="text-primary">Submit</span>
        </Button>

        <Button
          variant={"secondary"}
          size="icon"
          className="text-card-foreground rounded-sm ml-1"
          onClick={() => setOpponentStatusOpen(true)}
        >
          <Trophy className="w-5 h-5" />
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

        {/* <Button
          variant={"secondary"}
          size="icon"
          className="text-card-foreground"
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
        </Dialog> */}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4 border p-1 px-4 rounded-sm bg-secondary">
          <Activity className="w-5 h-5" />
          <div className="font-bold text-lg">120 / 200</div>
        </div>
      </div>
    </div>
  );
}
