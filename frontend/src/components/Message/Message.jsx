import { useState } from "react";
import "../../styles/shared.css";
import "./Message.css";

function Message({ sender, text, sources = [], isError = false, onRetry = null }) {
  const [showSources, setShowSources] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUser = sender === "user";
  const hasSources = !isUser && sources.length > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — fail silently, non-critical
    }
  };

  return (
    <div className={`message-row ${isUser ? "user" : "assistant"}`}>
      {!isUser && (
        <div className="avatar assistant-avatar" aria-hidden="true">
          G
        </div>
      )}

      <div className="bubble-stack">
        <div className={isUser ? "" : "assistant-bubble-wrap"}>
          <div
            className={`bubble ${isUser ? "user-bubble" : "assistant-bubble"} ${
              isError ? "error-bubble" : ""
            }`}
          >
            {text}
          </div>

          {!isUser && !isError && (
            <button
              type="button"
              className={`copy-button ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              aria-label="Copy answer"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" width="13" height="13">
                  <path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="13" height="13">
                  <rect
                    x="8"
                    y="8"
                    width="12"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {isError && onRetry && (
          <button type="button" className="retry-button" onClick={onRetry}>
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
              <path
                d="M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0 0 14.5 3M19.5 9A8 8 0 0 0 5 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Try again
          </button>
        )}

        {hasSources && (
          <div className="citation-tab-wrap">
            <button
              type="button"
              className="citation-tab"
              onClick={() => setShowSources((v) => !v)}
              aria-expanded={showSources}
            >
              <span>{showSources ? "−" : "+"}</span>
              {showSources ? "Hide guide excerpt" : "From the guide"}
            </button>

            {showSources && (
              <div className="citation-card">
                {sources.map((source, i) => (
                  <p key={i} className="citation-line">
                    {source}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="avatar user-avatar" aria-hidden="true">
          You
        </div>
      )}
    </div>
  );
}

export default Message;