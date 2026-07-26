import { useEffect, useRef } from "react";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import "./ChatBox.css";

const SUGGESTIONS = [
  "How long is the internship?",
  "What do I submit each week?",
  "How is my work evaluated?",
  "Do I get a certificate?",
];

function ChatBox({ messages, loading, onSend }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="chat-scroll" ref={scrollRef}>
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM20 5.5c0-.83-.67-1.5-1.5-1.5H13v16h5.5c.83 0 1.5-.67 1.5-1.5v-13Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="empty-eyebrow">INTERNSHIP GUIDE · Q&amp;A</p>
          <h2>What do you want to know?</h2>
          <p className="empty-copy">
            Ask anything about the program and I'll answer straight from the
            internship guide.
          </p>
          <div className="suggestion-grid">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="suggestion-chip"
                onClick={() => onSend?.(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((m, i) => (
          <Message
            key={i}
            sender={m.sender}
            text={m.text}
            sources={m.sources}
            isError={m.isError}
            onRetry={m.retryQuestion ? () => onSend(m.retryQuestion) : null}
          />
        ))
      )}
      {loading && <Loader />}
    </div>
  );
}

export default ChatBox;