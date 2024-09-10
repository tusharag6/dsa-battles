import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Card } from "@repo/ui";
import { useEffect, useState } from "react";
import React from "react";
import MonacoEditor from "../components/MonacoEditor";

export default function Match() {
  const [opponentStatusOpen, setOpponentStatusOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg">Time Remaining:</div>
          <div className="text-lg font-bold">12:34</div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary/20"
            onClick={() => setOpponentStatusOpen(true)}
          >
            <ShieldOffIcon className="w-5 h-5" />
            <span className="sr-only">Opponent Status</span>
          </Button>
          <Dialog
            open={opponentStatusOpen}
            onOpenChange={setOpponentStatusOpen}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Opponent Status</DialogTitle>
                <DialogDescription>
                  Check the status of your opponent.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4" />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary/20"
            onClick={() => setLeaderboardOpen(true)}
          >
            <BadgeIcon className="w-5 h-5" />
            <span className="sr-only">Leaderboard</span>
          </Button>
          <Dialog open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Leaderboard</DialogTitle>
                <DialogDescription>
                  Check the current leaderboard.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4" />
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-4">
            <div className="font-bold text-lg">Score:</div>
            <div className="text-lg font-bold">120 / 200</div>
          </div>
        </div>
      </header>
      <ResizablePanelGroup direction="horizontal">
        <div className="flex flex-row gap-8 p-8">
          <ResizablePanel>
            <Tabs defaultValue="description" className="">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="testcase">Test Cases</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">Problem Statement</h2>
                    <p className="mt-2 text-muted-foreground">
                      Given an array of integers, find the maximum sum of
                      non-adjacent elements. For example, if the input is [2, 4,
                      1, 5, 3, 5], the maximum sum of non-adjacent elements is
                      12 (4 + 5 + 3).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Input/Output</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium">Input:</div>
                        <div className="text-muted-foreground">
                          An array of integers
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Output:</div>
                        <div className="text-muted-foreground">
                          The maximum sum of non-adjacent elements
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Constraints</h3>
                    <ul className="mt-2 list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>1 ≤ array length ≤ 10^6</li>
                      <li>0 ≤ array elements ≤ 10^4</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="testcase">
                <div>
                  <h2 className="text-2xl font-bold">Test Cases</h2>
                  <Card className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Test Case 1</div>
                        <div className="text-muted-foreground">
                          [2, 4, 1, 5, 3, 5]
                        </div>
                      </div>
                      <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Passed
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Test Case 2</div>
                        <div className="text-muted-foreground">
                          [1, 2, 3, 1]
                        </div>
                      </div>
                      <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Passed
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Test Case 3</div>
                        <div className="text-muted-foreground">
                          [0, 0, 0, 0, 0, 0]
                        </div>
                      </div>
                      <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Passed
                      </div>
                    </div>
                  </Card>
                  <Button className="mt-4 w-full">Submit</Button>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Code Editor</h2>
                <div className="mb-2 flex flex-row gap-4">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Submit</Button>
                </div>

                <div className="h-[600px] rounded-lg border bg-card text-card-foreground">
                  <MonacoEditor />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </div>
      </ResizablePanelGroup>
    </div>
  );
}

function BadgeIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function ShieldOffIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 2 20 20" />
      <path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71" />
      <path d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264" />
    </svg>
  );
}
