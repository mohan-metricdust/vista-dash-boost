
import React, { forwardRef } from "react";

interface ChatMessageProps {
  sender: "ai" | "user";
  message: string;
  timestamp?: string;
}

const convertToLocalTime = (timestampString: string) => {
  // Convert the string timestamp to a number
  const timestamp = Number(timestampString);

  // Convert the numeric timestamp to a Date object
  const date = new Date(timestamp);

  // Format the time to show only hours and minutes in AM/PM
  const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const localTime = date.toLocaleTimeString("en-US", options);

  return localTime;
};

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ sender, message, timestamp }, ref) => {
    const isAI = sender === "ai";

    return (
      <div
        ref={ref}
        style={{
          maxWidth: "100%",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word"
        }}
        className={`p-3 rounded-2xl glass-card-subtle ${
          isAI 
            ? "bg-blue-100/40 border border-blue-200/50" 
            : "bg-green-100/40 border border-green-200/50"
        } max-w-full`}
      >
        <p className={`text-xs font-medium mb-1 ${
          isAI ? "text-blue-700" : "text-green-700"
        }`}>
          {isAI ? "AI Interviewer" : "You"}
        </p>
        <p className="text-sm text-black">
          {message}
        </p>
        {timestamp && (
          <div className={`flex ${isAI ? "justify-start" : "justify-end"} mt-1`}>
            <span className="text-xs text-gray-500">
              {convertToLocalTime(timestamp)}
            </span>
          </div>
        )}
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
