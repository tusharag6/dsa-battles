import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import React, { useRef, useEffect } from "react";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const customTheme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [{ token: "", foreground: "b5e8ff" }],
  colors: {
    "editor.background": "#000000",
    "editor.foreground": "#000000",
    "editorCursor.foreground": "#000000",
    "editor.lineHighlightBackground": "#000000",
    "editorLineNumber.foreground": "#000000",
    "editor.selectionBackground": "#000000",
    "editor.inactiveSelectionBackground": "#000000",
  },
};

interface MonacoEditorProps {
  language?: string;
  initialCode?: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language = "javascript",
  initialCode = "// Your code here",
  setCode,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      // Define the custom theme
      monaco.editor.defineTheme("customTheme", customTheme);

      // Create the editor with simplified options
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: initialCode,
        language: language,
        theme: "customTheme",
        minimap: { enabled: false },
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
        },
        lineNumbers: "on",
        folding: false,
        links: false,
        contextmenu: false,
        quickSuggestions: false,
        parameterHints: { enabled: false },
        suggestOnTriggerCharacters: false,
        acceptSuggestionOnEnter: "off",
        tabCompletion: "off",
        wordBasedSuggestions: "off",
        renderLineHighlight: "line",
        roundedSelection: false,
        automaticLayout: true,
      });

      // Disable the command palette
      editorInstance.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP,
        () => {
          // Do nothing
        }
      );

      // Add a listener to update setCode on content change
      const model = editorInstance.current.getModel();
      if (model) {
        editorInstance.current.onDidChangeModelContent(() => {
          const updatedCode = model.getValue();
          setCode(updatedCode);
        });
      }

      // Clean up
      return () => {
        editorInstance.current?.dispose();
      };
    }
  }, [language, initialCode]);

  useEffect(() => {
    if (editorInstance.current) {
      const editorElement = editorInstance.current.getDomNode();
      if (editorElement) {
        editorElement.style.outline = "none";
      }
    }
  }, []);

  return (
    <div
      ref={editorRef}
      className="monaco-editor rounded-xl focus-visible:outline-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MonacoEditor;
