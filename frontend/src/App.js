import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";

function App() {
  const [code, setCode] = useState('print("Hello, " + input())');
  const [inputText, setInputText] = useState(""); // NEW
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [theme]);
  const runCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://online-python-ide.onrender.com/run",
        { code, input: inputText } // send input too
      );
      setOutput(res.data.output);
    } catch (err) {
      setOutput("❌ Error connecting to server");
    }
    setLoading(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`min-h-screen p-4 font-mono ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        🐍 Online Python IDE
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="mb-4 px-4 py-2 rounded border border-gray-500"
          >
            Toggle {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <CodeEditor code={code} setCode={setCode} theme={theme} />

        {/* INPUT BOX */}
        <textarea
          className="w-full h-24 p-2 bg-gray-800 text-white rounded"
          placeholder="👇 Enter stdin for your program here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="text-center space-x-4">
          <button
            onClick={runCode}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold"
          >
            {loading ? "Running…" : "▶️ Run Code"}
          </button>

          <button
            onClick={() => setOutput("")}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold"
          >
            🧹 Clear Output
          </button>
        </div>

        <Terminal output={output} />
      </div>
    </div>
  );
}

export default App;
