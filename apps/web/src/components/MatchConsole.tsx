import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TestCase {
  id: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface MatchConsoleProps {
  testCases: TestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
}

export default function MatchConsole({
  testCases,
  setTestCases,
}: MatchConsoleProps) {
  const [testCasesState, setTestCasesState] = useState<TestCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<number>(1);
  const [newCaseInput, setNewCaseInput] = useState<string>("");

  useEffect(() => {
    setTestCasesState(testCases);
  }, [testCases]);

  const addNewCase = () => {
    if (newCaseInput.trim() !== "") {
      const newId = Math.max(...testCases.map((tc) => tc.id), 0) + 1;
      const newTestCases = [
        ...testCasesState,
        {
          id: newId,
          input: newCaseInput,
          expected_output: "",
          is_hidden: false,
        },
      ];
      setTestCasesState(newTestCases);
      setTestCases(newTestCases);
      setSelectedCase(newId);
      setNewCaseInput("");
    }
  };
  const updateTestCase = (input: string) => {
    const updatedTestCases = testCasesState.map((tc) =>
      tc.id === selectedCase ? { ...tc, input } : tc
    );
    setTestCasesState(updatedTestCases);
    setTestCases(updatedTestCases);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="flex items-center p-2 space-x-2 overflow-x-auto">
        {testCasesState.map((testCase) => (
          <Button
            key={testCase.id}
            variant={selectedCase === testCase.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCase(testCase.id)}
          >
            Case {testCase.id}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedCase(-1);
            setNewCaseInput("");
          }}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-4 space-y-2 flex-grow">
        <div className="text-sm text-muted-foreground">nums =</div>
        {selectedCase === -1 ? (
          <div className="space-y-2">
            <Input
              type="text"
              value={newCaseInput}
              onChange={(e) => setNewCaseInput(e.target.value)}
              placeholder="Enter new test case"
              className="w-full bg-secondary text-secondary-foreground"
            />
            <Button onClick={addNewCase} className="w-full">
              Add New Case
            </Button>
          </div>
        ) : (
          <Input
            type="text"
            value={
              testCasesState.find((tc) => tc.id === selectedCase)?.input || ""
            }
            onChange={(e) => updateTestCase(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground"
          />
        )}
      </div>
    </div>
  );
}
