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
import React, { useEffect, useState } from "react";
import MatchHeader from "../components/MatchHeader";
import MonacoEditor from "../components/MonacoEditor";
import { Button } from "@/components/ui/button";
import { Maximize, RotateCcw } from "lucide-react";
import MatchConsole from "@/components/MatchConsole";
import axios from "axios";

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
}

interface TestCase {
  id: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

interface SubmissionResult {
  stdout: string;
  stderr: string;
  status: {
    id: number;
    description: string;
  };
  compile_output: string;
  time: string;
  memory: number;
}

const API_URL = "http://localhost:5001";
// const socket = io("http://localhost:5001");

export default function Match() {
  const [language, setLanguage] = useState("javascript");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    fetchProblem();
  }, []);

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/problems/2`);
      const { problem, testCases } = response.data;
      console.log("Problem: ", problem);
      setProblem(problem[0]);
      setTestCases(testCases);
    } catch (error) {
      console.error("Error fetching problem: ", error);
    }
  };

  const handleRun = () => {
    // Logic to run test cases
    console.log("Running test cases...");
  };

  const handleSubmit = async () => {
    try {
      // TODO: send custom test cases
      const response = await axios.post(`${API_URL}/api/submit/bulk`, {
        source_code: code,
        language_id: language,
        problem_id: 2,
      });

      console.log("SUBMISSION RESPONSE: ", response.data);

      const submissionTokens = response.data.tokens;

      if (!Array.isArray(submissionTokens)) {
        console.error("Expected submissionTokens to be an array");
        return;
      }

      submissionTokens.forEach((t) => {
        let isPolling = false; // Flag to prevent overlap

        const intervalId = setInterval(async () => {
          if (isPolling) return; // If a request is already in progress, skip

          isPolling = true; // Mark as in progress
          try {
            const checkResponse = await axios.get(`${API_URL}/api/check`, {
              headers: {
                "submission-token": t.token,
              },
            });

            console.log("CHECKING RESULT: ", checkResponse.data);

            const { status } = checkResponse.data;

            if (status.id === 3 || status.id === 4) {
              // 3 (Accepted), 4 (Wrong Answer)
              console.log("Final result received, stopping polling");
              clearInterval(intervalId);
            }
          } catch (error) {
            console.error("ERROR CHECKING CODE: ", error);
            clearInterval(intervalId);
          } finally {
            isPolling = false;
          }
        }, 1000);

        setTimeout(() => {
          clearInterval(intervalId);
          console.log("Interval stopped after 10 seconds");
        }, 10000);
      });
    } catch (error) {
      console.error("ERROR SUBMITTING CODE: ", error);
    }
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
                    <CardTitle>{problem?.title || "Loading..."}</CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div>
                      <p className="text-muted-foreground">
                        {problem?.description || "Loading description..."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Difficulty</h3>
                      <p className="text-muted-foreground">
                        {problem?.difficulty || "Loading difficulty..."}
                      </p>
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
                      <MonacoEditor setCode={setCode} language={language} />
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
                  <MatchConsole
                    testCases={testCases}
                    setTestCases={setTestCases}
                  />
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
