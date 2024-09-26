import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import MatchHeader from "../components/MatchHeader";
import MonacoEditor from "../components/MonacoEditor";
import { Button } from "@/components/ui/button";
import { Maximize, RotateCcw } from "lucide-react";
import MatchConsole from "@/components/MatchConsole";

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
      <MatchHeader onRun={handleRun} onSubmit={handleSubmit} />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={50} minSize={30}>
          <Card className="h-full rounded-none border-0">
            <CardContent className="h-full p-0">
              <Tabs defaultValue="description" className="h-full">
                <TabsList className="w-full justify-start rounded-none border-b p-0">
                  <TabsTrigger value="description" className="rounded-none p-2">
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="testcase" className="rounded-none p-2">
                    Submission
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4 overflow-auto">
                  <CardHeader className="px-0">
                    <CardTitle>Two Sum</CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div>
                      <p className="text-muted-foreground">
                        Given an array of integers, find the maximum sum of
                        non-adjacent elements. For example, if the input is [2,
                        4, 1, 5, 3, 5], the maximum sum of non-adjacent elements
                        is 12 (4 + 5 + 3).
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
                <TabsContent value="testcase" className="p-4 overflow-auto">
                  <h1>Hello</h1>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <Card className="h-full rounded-none border-0">
                <CardContent className="h-full p-0">
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center p-2 border-b">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px] border-none">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                        </SelectContent>
                      </Select>
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary-foreground hover:bg-primary/20"
                        >
                          <RotateCcw className="w-5 h-5" />
                          <span className="sr-only">Reset Code</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary-foreground hover:bg-primary/20"
                        >
                          <Maximize className="w-5 h-5" />
                          <span className="sr-only">Maximize</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <MonacoEditor language={language} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20} maxSize={30} minSize={5}>
              <Tabs defaultValue="tests" className="p-0 m-0">
                <TabsList className="w-full rounded-none m-0 p-0">
                  <TabsTrigger
                    value="tests"
                    className="flex-1 rounded-none p-2"
                  >
                    Tests
                  </TabsTrigger>
                  <TabsTrigger
                    value="output"
                    className="flex-1 p-2 rounded-none"
                  >
                    Output
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tests">
                  <MatchConsole />
                </TabsContent>
                <TabsContent value="output">
                  <Card className="h-full rounded-none border-0">
                    <CardContent className="h-full p-4">
                      <p className="text-sm text-muted-foreground">
                        Output will appear here after running tests...
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
