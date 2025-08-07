import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [...prev, { text: trimmedInput, sender: "user" }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: trimmedInput })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { text: data.response, sender: "bot" }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong.", sender: "bot" }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">💬 Chat with SkillForgeAI</h2>

        <div className="h-[450px] overflow-y-auto space-y-3 p-4 bg-blue-100 rounded-lg shadow-inner">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] p-3 rounded-xl transition-all duration-300 ${
                msg.sender === "user"
                  ? "bg-blue-300 text-black ml-auto text-right"
                  : "bg-white text-blue-800 mr-auto text-left"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-5 flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 rounded-l-lg border border-blue-300 focus:outline-none resize-none bg-blue-50 text-blue-900"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
