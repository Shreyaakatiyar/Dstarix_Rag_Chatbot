import { useState } from "react";
import ChatBox from "./components/ChatBox/ChatBox";
import ChatInput from "./components/ChatInput/ChatInput";
import api from "./services/api";
import "./styles/tokens.css";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {
    const trimmed = question?.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setLoading(true);

    try {
      const response = await api.post("/chat", { question: trimmed });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response?.data?.answer || "I couldn't produce an answer right now.",
          sources: response?.data?.sources || [],
        },
      ]);
    } catch (error) {
      const detail =
        error?.response?.data?.message ||
        "Something went wrong while contacting the assistant.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: detail,
          isError: true,
          retryQuestion: trimmed,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => setMessages([]);

  return (
    <div className="app-shell">
      <div className="tab-rail" aria-hidden="true" />

      <header className="app-header">
        <div className="header-mark" aria-hidden="true">
          DS
        </div>
        <div className="header-text">
          <p className="header-eyebrow">DStarix</p>
          <h1>Internship Guide Chatbot</h1>
          <p className="header-subtitle">
            Ask anything about the internship — answers come straight from the guide.
          </p>
        </div>
        {messages.length > 0 && (
          <button type="button" className="new-chat-button" onClick={startNewChat}>
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                d="M12 5v14M5 12h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>New chat</span>
          </button>
        )}
      </header>

      <main className="app-main">
        <div className="chat-box-wrap">
          <ChatBox messages={messages} loading={loading} onSend={sendMessage} />
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;