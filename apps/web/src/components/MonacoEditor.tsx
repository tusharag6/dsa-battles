import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import React, { useRef, useEffect } from "react";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
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
    "editor.background": "#010d1a",
    "editor.foreground": "#b5e8ff",
    "editorCursor.foreground": "#b5e8ff",
    "editor.lineHighlightBackground": "#021b34",
    "editorLineNumber.foreground": "#1a4666",
    "editor.selectionBackground": "#0a4675",
    "editor.inactiveSelectionBackground": "#314b5e",
  },
};

const MonacoEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Define the custom theme
      monaco.editor.defineTheme("customTheme", customTheme);

      // Create the editor
      const editor = monaco.editor.create(editorRef.current, {
        value: "// Your code here",
        language: "typescript",
        theme: "customTheme",
      });

      // Clean up
      return () => editor.dispose();
    }
  }, []);

  return <div ref={editorRef} style={{ width: "100%", height: "100%" }} />;
};

export default MonacoEditor;
