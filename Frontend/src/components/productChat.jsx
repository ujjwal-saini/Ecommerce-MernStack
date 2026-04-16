import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../middleware/authContext";

function ProductChat({ isOpen, onClose, product }) {
  const { API, theme } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "Is this good for daily use?",
    "Is this product worth buying?",
    "What are the pros and cons?",
    "Is this good for summer?"
  ];

  const sendMessage = async (customMsg) => {
    const msgToSend = customMsg || input;
    if (!msgToSend) return;
    const userMsg = { message: msgToSend, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    setInput("");
    try {
      const res = await axios.post(`${API}/aiChatProduct`, {
        message: msgToSend,
        product: {
          name: product.name,
          description: product.description,
        },
      });
      const aiMsg = {
        message: res.data.reply,
        sender: "admin",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.log(error);
    }
    setTyping(false);
  };

  return (
    <div className={`chat-sidebar ${isOpen ? "open" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>

      {/* HEADER */}
      <div className={`chat-header d-flex justify-content-between align-items-center px-3 py-2 
        ${theme === "dark" ? "bg-dark text-light" : "bg-primary text-white"}`}>
        
        <div className="d-flex align-items-center gap-2">
          <div className="avatar">🤖</div>
          <div>
            <div>AI Assistant</div>
            <small>{typing ? "Typing..." : "Online"}</small>
          </div>
        </div>

        <button className="btn btn-sm btn-light" onClick={onClose}>✖</button>
      </div>

      {/* BODY */}
      <div className={`chat-body ${theme === "dark" ? "bg-dark text-light" : "bg-light"}`}>

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="p-3">
            <p className="fw-bold">Ask something:</p>
            <div className="d-flex flex-wrap gap-2">
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg-row ${msg.sender === "user" ? "right" : "left"}`}>
            <div className={`msg-bubble ${
              msg.sender === "user"
                ? "user"
                : theme === "dark"
                ? "ai-dark"
                : "ai"
            }`}>
              {msg.message}
            </div>
          </div>
        ))}

        {/* Typing */}
        {typing && (
          <div className="msg-row left">
            <div className={`msg-bubble ${theme === "dark" ? "ai-dark" : "ai"}`}>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className={`chat-footer ${theme === "dark" ? "bg-dark" : ""}`}>
        <input
          className={`form-control ${theme === "dark" ? "bg-secondary text-light border-0" : ""}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this product..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}/>
        <button className="btn btn-primary" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ProductChat;