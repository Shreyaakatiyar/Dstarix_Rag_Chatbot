import { useRef, useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const resize = (el) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    resize(e.target);
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="chat-input-bar">
      <textarea
        ref={textareaRef}
        className="chat-input"
        placeholder="Ask about the internship guide…"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        aria-label="Ask a question about the internship guide"
      />
      <button
        type="button"
        className="send-button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send question"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M4 12L20 4L14 20L11 13L4 12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default ChatInput;