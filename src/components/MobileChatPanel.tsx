
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send } from 'lucide-react';
import { useChat, useTrackTranscription, useLocalParticipant } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useMessaging } from '@/Hireko/hooks/useMessaging';
import ChatMessage from '../components/ChatMessage';
import { v4 as uuidv4 } from 'uuid';

interface MobileChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  audioTrack: any;
  themeColor1: string;
  mode: 'interview' | 'playground';
}

const MobileChatPanel = ({
  isOpen,
  onClose,
  audioTrack,
  themeColor1,
  mode
}: MobileChatPanelProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, handleSendMessage, addTranscriptionMessage } = useMessaging();
  const scrollRef = useRef<HTMLDivElement>(null);
  const localParticipant = useLocalParticipant();
  const { send } = useChat();

  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const agentMessages = useTrackTranscription(audioTrack);
  const processedSegmentIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="absolute inset-x-0 bottom-0 h-2/3 backdrop-blur-lg bg-white/80 border border-white/30 rounded-t-3xl border-t border-white/20 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-800">
            {mode === 'playground' ? 'Practice Chat' : 'Interview Chat'}
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages - This takes up the remaining space */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      ref={index === messages.length - 1 ? scrollRef : null}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'ml-4' : 'mr-4'}`}>
                        <ChatMessage
                          sender={message.sender}
                          message={message.content}
                          timestamp={message.timestamp}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-500">
                  <p className="text-sm">Waiting for conversation to begin...</p>
                </div>
              )}
              {/* Add bottom padding to ensure last message is visible above input */}
              <div className="h-24"></div>
            </div>
          </ScrollArea>
        </div>

        {/* Input - Fixed at bottom */}
        <div className="p-4 border-t border-white/20 flex-shrink-0 backdrop-blur-lg bg-white/20">
          <div className="flex space-x-3 items-end">
            <div className="flex-1">
              <Textarea
                placeholder="Type your response..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="resize-none bg-white/50 border-white/30 focus:border-white/50 rounded-xl text-gray-800 placeholder-gray-600 min-h-[44px] max-h-[120px] backdrop-blur-sm"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
            </div>
            <Button
              onClick={sendMessage}
              disabled={newMessage.trim() === ""}
              className="rounded-xl px-4 py-2 h-[44px] flex-shrink-0 text-white disabled:opacity-50"
              style={{ backgroundColor: themeColor1 }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileChatPanel;
