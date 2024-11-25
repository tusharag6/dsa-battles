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
    if (testCases.length > 0) {
      setSelectedCase(1);
    }
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
      setSelectedCase(newTestCases.length);
      setNewCaseInput("");
    }
  };

  const updateTestCase = (input: string) => {
    const updatedTestCases = testCasesState.map((tc) =>
      tc.id === testCasesState[selectedCase - 1].id ? { ...tc, input } : tc
    );
    setTestCasesState(updatedTestCases);
    setTestCases(updatedTestCases);
  };

  return (
    <div className="w-full h-full bg-card flex flex-col">
      <div className="flex items-center p-2 space-x-2 overflow-x-auto">
        {testCasesState.map((testCase, index) => (
          <Button
            key={testCase.id}
            variant={selectedCase === index + 1 ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCase(index + 1)}
          >
            Case {index + 1}
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
          <span className="sr-only">Add new test case</span>
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
            value={testCasesState[selectedCase - 1]?.input || ""}
            onChange={(e) => updateTestCase(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground"
          />
        )}
      </div>
    </div>
  );
}
