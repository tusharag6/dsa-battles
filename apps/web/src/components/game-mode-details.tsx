import React from "react";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function GameModeDetails({ mode }) {
  if (!mode) return null;

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="text-left">
        <SheetTitle className="text-2xl font-bold">{mode.title}</SheetTitle>
        <SheetDescription className="text-sm text-muted-foreground">
          {mode.description}
        </SheetDescription>
      </SheetHeader>
      <Separator className="my-4" />
      <div className="flex-grow overflow-y-auto px-1">
        <h3 className="text-lg font-semibold mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground mb-6">{mode.features}</p>
        <div className="space-y-4">
          {mode.modes && (
            <div>
              <label
                htmlFor="mode-select"
                className="block text-sm font-medium mb-2"
              >
                Select Mode
              </label>
              <Select>
                <SelectTrigger id="mode-select">
                  <SelectValue placeholder="Choose a mode" />
                </SelectTrigger>
                <SelectContent>
                  {mode.modes.map((modeOption) => (
                    <SelectItem key={modeOption} value={modeOption}>
                      {modeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {mode.durations && (
            <div>
              <label
                htmlFor="duration-select"
                className="block text-sm font-medium mb-2"
              >
                Select Duration
              </label>
              <Select>
                <SelectTrigger id="duration-select">
                  <SelectValue placeholder="Choose a duration" />
                </SelectTrigger>
                <SelectContent>
                  {mode.durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
      <Separator className="my-4" />
      <SheetFooter>
        <Button className="w-full">Start Game</Button>
      </SheetFooter>
    </div>
  );
}
