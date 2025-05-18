// src/CodeEditor.js
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

const CodeEditor = ({ code, setCode }) => {
  console.log("📥 Code in Editor:", code);
  return (
    <CodeMirror
      value={code}
      height="400px"
      extensions={[python()]}
      theme={oneDark}
      onChange={(val) => {
        console.log("✏️ Edited Code:", val);
        setCode(val);
      }}
    />
  );
};

export default CodeEditor;
