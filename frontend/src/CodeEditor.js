import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";

const CodeEditor = ({ code, setCode, theme }) => {
  return (
    <CodeMirror
      value={code}
      height="400px"
      extensions={[python()]}
      theme={theme === "dark" ? oneDark : EditorView.theme({}, { dark: false })}
      onChange={(val) => setCode(val)}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        indentOnInput: true,
      }}
    />
  );
};

export default CodeEditor;
