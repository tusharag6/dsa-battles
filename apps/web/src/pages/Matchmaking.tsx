import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui";
import { Label } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Slider } from "@repo/ui";
import { Button } from "@repo/ui";
import React from "react";

export default function Component() {
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
            <Button className="w-full">Find Match</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
