import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { io } from "socket.io-client";
import { generateRandomUsername } from "../lib/generateRandomUsername";

const socket = io("http://localhost:5001");
export default function Component() {
  const [_isMatched, setIsMatched] = useState(false);
  const [_opponent, setOpponent] = useState(null);
  const [_matchTimeout, setMatchTimeout] = useState(false);
  const [isFindingMatch, setIsFindingMatch] = useState(false);

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
      redirect("/match/");
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
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">1v1 Matchmaking</h1>
          <p className="text-muted-foreground">
            Find a challenging opponent and test your skills.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Matchmaking Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="skill-level">Problem Level</Label>
              <Select defaultValue="intermediate">
                <SelectTrigger>
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time-limit">Time Limit</Label>
              <Select defaultValue="15">
                <SelectTrigger>
                  <SelectValue placeholder="Select time limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            {isFindingMatch ? (
              <Button className="w-full" disabled>
                Finding Match...
              </Button>
            ) : (
              <Button className="w-full" onClick={handleJoinQueue}>
                Find Match
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
