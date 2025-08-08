import React, { useState } from "react";

export default function MultiShot() {
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query.trim()) {
      alert("Please enter a query first!");
      return;
    }
    setLoading(true);
    setPrompt("");
    setResponse("");

    try {
      const res = await fetch(`http://localhost:5000/api/multishot?prompt=${encodeURIComponent(query)}`);
      console.log("Response from server:", res);
      const data = await res.json();
      setPrompt(data.prompt || "No prompt returned.");
      setResponse(data.data || "No response from AI.");
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Multi-shot Prompting Demo</h1>
      <input
        type="text"
        placeholder='e.g. "Write a funny AI joke"'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "10px",
        }}
      />
      <br />
      <button
        onClick={sendQuery}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Ask AI"}
      </button>

      {prompt && (
        <div style={{ marginTop: "20px" }}>
          <h3>📜 Multi-shot Prompt Sent:</h3>
          <pre
            style={{
              background: "#000",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
            }}
          >
            {prompt}
          </pre>

          <h3>🤖 AI Response:</h3>
          <pre
            style={{
              background: "#000",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
            }}
          >
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}