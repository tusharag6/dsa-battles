import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

interface TestCase {
  id: number;
  input: string;
}

export default function MatchConsole() {
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: "[10,2]" },
    { id: 2, input: "[3,4,5]" },
  ]);
  const [selectedCase, setSelectedCase] = useState<number>(1);
  const [newCaseInput, setNewCaseInput] = useState<string>("");

  const addNewCase = () => {
    if (newCaseInput.trim() !== "") {
      const newId = Math.max(...testCases.map((tc) => tc.id), 0) + 1;
      setTestCases([...testCases, { id: newId, input: newCaseInput }]);
      setSelectedCase(newId);
      setNewCaseInput("");
    }
  };

  const updateTestCase = (input: string) => {
    setTestCases(
      testCases.map((tc) => (tc.id === selectedCase ? { ...tc, input } : tc))
    );
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="flex items-center p-2 space-x-2 overflow-x-auto">
        {testCases.map((testCase) => (
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
            value={testCases.find((tc) => tc.id === selectedCase)?.input || ""}
            onChange={(e) => updateTestCase(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground"
          />
        )}
      </div>
    </div>
  );
}
