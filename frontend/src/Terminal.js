import React from "react";

const Terminal = ({ output }) => {
  return (
    <div className="bg-black text-green-400 p-4 rounded h-48 overflow-y-auto border border-gray-700">
      <pre className="whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default Terminal;
