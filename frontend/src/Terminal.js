import React from "react";

const Terminal = ({ output }) => {
  return (
    <div className="terminal">
      <pre>{output}</pre>
    </div>
  );
};

export default Terminal;
