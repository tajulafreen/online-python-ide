import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [code, setCode] = useState(`print("Hello, World!")`);
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error connecting to server");
    }
  };

  return (
    <div className="app">
      <h1>Online Python IDE</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={runCode}>Run Code</button>
      <div className="terminal">
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
