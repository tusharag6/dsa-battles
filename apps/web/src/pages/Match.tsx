import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Card } from "@repo/ui";
import React, { useState } from "react";
import MatchHeader from "../components/MatchHeader";
import MonacoEditor from "../components/MonacoEditor";

export default function Match() {
  const [language, setLanguage] = useState("javascript");
  const handleRun = () => {
    // Logic to run test cases
    console.log("Running test cases...");
  };

  const handleSubmit = () => {
    // Logic to submit the problem
    console.log("Submitting solution...");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg">Time Remaining:</div>
          <div className="text-lg font-bold">12:34</div>
        </div>
        <div>
          <Button
            className="text-primary-foreground rounded-md"
            variant={"outline"}
          >
            <Play className="w-5 h-5 mr-2" />
            <span>Run</span>
          </Button>
          <Button
            className="text-primary-foreground rounded-md"
            variant={"outline"}
          >
            <CloudUpload className="w-5 h-5 mr-2" />
            <span>Submit</span>
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
      </header> */}
      <MatchHeader onRun={handleRun} onSubmit={handleSubmit} />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full p-6 overflow-auto">
            <Tabs defaultValue="description" className="h-full">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="testcase">Test Cases</TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="flex-grow overflow-auto"
              >
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
              <TabsContent value="testcase" className="flex-grow overflow-auto">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Test Cases</h2>
                  <Card className="p-4 space-y-4">
                    {[
                      {
                        name: "Test Case 1",
                        input: "[2, 4, 1, 5, 3, 5]",
                        status: "Passed",
                      },
                      {
                        name: "Test Case 2",
                        input: "[1, 2, 3, 1]",
                        status: "Passed",
                      },
                      {
                        name: "Test Case 3",
                        input: "[0, 0, 0, 0, 0, 0]",
                        status: "Passed",
                      },
                    ].map((testCase, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary"
                      >
                        <div>
                          <div className="font-medium">{testCase.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {testCase.input}
                          </div>
                        </div>
                        <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {testCase.status}
                        </div>
                      </div>
                    ))}
                  </Card>
                  <Button className="w-full">Run Tests</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
            <div className="mb-4 flex items-center gap-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-grow rounded-lg border bg-card text-card-foreground overflow-hidden">
              <MonacoEditor language={language} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
