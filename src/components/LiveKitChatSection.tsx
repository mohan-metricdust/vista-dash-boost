
import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useChat, useTrackTranscription, useLocalParticipant } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useMessaging } from '@/Hireko/hooks/useMessaging';
import ChatMessage from '../components/ChatMessage';
import { v4 as uuidv4 } from 'uuid';

interface LiveKitChatSectionProps {
  audioTrack: any;
  themeColor1: string;
  mode: 'interview' | 'playground';
  style?: React.CSSProperties;
}

const LiveKitChatSection = ({ audioTrack, themeColor1, mode, style }: LiveKitChatSectionProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, handleSendMessage, addTranscriptionMessage } = useMessaging();
  const { send } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const localParticipant = useLocalParticipant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const agentMessages = useTrackTranscription(audioTrack);
  const processedSegmentIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    localMessages.segments.forEach((segment) => {
      if (segment.final && !processedSegmentIds.current.has(segment.id)) {
        addTranscriptionMessage(segment.text, "user");
        processedSegmentIds.current.add(segment.id);
      }
    });

    agentMessages.segments.forEach((segment) => {
      if (segment.final && !processedSegmentIds.current.has(segment.id)) {
        addTranscriptionMessage(segment.text, "ai");
        processedSegmentIds.current.add(segment.id);
      }
    });
  }, [localMessages.segments, agentMessages.segments, addTranscriptionMessage]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        id: uuidv4(),
        sender: "user" as const,
        content: newMessage.trim(),
        timestamp: new Date().getTime().toString(),
      };

      handleSendMessage(message.content, message.sender);
      send(message.content);
      setNewMessage("");
    }
  };

  return (
    <div className="w-100 h-100 d-flex flex-column p-4">
  {/* Chat Messages */}
  <div className="flex-grow-1 pe-2 mb-4 overflow-auto">
    <div className="d-flex flex-column gap-3">
      {messages.length > 0 ? (
        <div 
          className="flex flex-col space-y-4 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth"
          }}
        >
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'pl-4' : 'pr-4'}`}>
                <ChatMessage
                  sender={message.sender}
                  message={message.content}
                  timestamp={message.timestamp}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "8rem", color: "#4b5563" }}>
          <div className="text-center rounded-3 p-4" style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <p className="small text-dark">Waiting for conversation...</p>
            <p className="text-muted" style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
              Start speaking or type a message
            </p>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Chat Input */}
  <div className="d-flex align-items-end gap-3">
    <div className="flex-grow-1">
      <Textarea
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="form-control rounded-3"
        style={{
          resize: "none",
          minHeight: "44px",
          maxHeight: "120px",
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#374151"
        }}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = Math.min(target.scrollHeight, 120) + "px";
        }}
      />
    </div>

    <Button
      onClick={sendMessage}
      disabled={newMessage.trim() === ""}
      className="rounded-3 px-4 py-2 d-flex align-items-center"
      style={{
        height: "44px",
        background: "linear-gradient(to right, #3b82f6, #2563eb)",
        color: "#fff",
        transition: "transform 0.2s"
      }}
    >
      <Send className="w-4 h-4" />
    </Button>
  </div>
</div>

  );
};

export default LiveKitChatSection;
