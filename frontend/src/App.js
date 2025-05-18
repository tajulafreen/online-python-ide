import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";

function App() {
  const [code, setCode] = useState(`print("Hello, World!")`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    console.log("🔁 Running Code:");
    console.log("🔹 Sent Code:", code); // Log the code being sent

    try {
      const response = await axios.post(
        "https://online-python-ide.onrender.com/run",
        { code }
      );
      console.log("✅ Server Response:", response.data);
      setOutput(response.data.output);
    } catch (error) {
      console.error("❌ Error:", error.message);
      setOutput("❌ Error connecting to server");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 font-mono">
      <h1 className="text-3xl font-bold text-center mb-6">
        🐍 Online Python IDE
      </h1>
      <div className="max-w-4xl mx-auto space-y-4">
        <CodeEditor code={code} setCode={setCode} />

        <div className="text-center">
          <button
            onClick={runCode}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold"
          >
            {loading ? "Running..." : "▶️ Run Code"}
          </button>
        </div>
        <Terminal output={output} />
      </div>
    </div>
  );
}

export default App;
