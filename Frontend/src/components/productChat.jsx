import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../middleware/authContext";

function ProductChat({ product }) {
  const { API, theme } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "Is this good for daily use?",
    "Is this product worth buying?",
    "What are the pros and cons?",
    "Is this good for summer?",
  ];

  const sendMessage = async (customMsg) => {
    const msgToSend = customMsg || input;

    if (!msgToSend) return;

    const userMsg = {
      message: msgToSend,
      sender: "user",
    };

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
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.log(error);
    }

    setTyping(false);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: theme === "dark" ? "#0b0b0b" : "#fff",
      }}
    >
      {/* BODY */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px",
        }}
      >
        {/* SUGGESTIONS */}
        {messages.length === 0 && (
          <>
            <h6 className="mb-3 fw-bold">
              Ask something about this product
            </h6>

            <div className="d-flex flex-wrap gap-2">
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="btn btn-sm"
                  style={{
                    borderRadius: "20px",
                    border: "1px solid #ff7b00",
                    color: "#ff7b00",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </>
        )}

        {/* MESSAGES */}
        <div className="mt-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-3 ${msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
                }`}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: "18px",
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(90deg,#ff7b00,#ff9d42)"
                      : theme === "dark"
                        ? "#1a1a1a"
                        : "#f1f1f1",
                  color:
                    msg.sender === "user"
                      ? "#fff"
                      : theme === "dark"
                        ? "#fff"
                        : "#000",
                }}
              >
                {msg.message}
              </div>
            </div>
          ))}

          {/* TYPING */}
          {typing && (
            <div className="mb-3">
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: "18px",
                  background:
                    theme === "dark" ? "#1a1a1a" : "#f1f1f1",
                }}
              >
                Typing...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "12px",
          borderTop:
            theme === "dark"
              ? "1px solid #222"
              : "1px solid #eee",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="Ask about this product..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="form-control"
          style={{
            borderRadius: "30px",
            background: theme === "dark" ? "#111" : "#f8f9fa",
            color: theme === "dark" ? "#fff" : "#000",
            border:
              theme === "dark"
                ? "1px solid #222"
                : "1px solid #ddd",
          }}
        />

        <button
          onClick={() => sendMessage()}
          className="btn text-white"
          style={{
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            background:
              "linear-gradient(90deg,#ff7b00,#ff9d42)",
            border: "none",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default ProductChat;