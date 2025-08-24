
/**
 * useMessaging.ts
 * 
 * Custom hook that manages the messaging functionality for the interview.
 * Handles storing message history and sending new messages.
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  /**
   * Unique ID for the message
   */
  id: string;
  
  /**
   * Who sent the message ('ai' or 'user')
   */
  sender: 'ai' | 'user';
  
  /**
   * The text content of the message
   */
  content: string;
  
  /**
   * Optional timestamp for when the message was sent
   */
  timestamp?: string;
}


/**
 * useMessaging - Manages the messaging state and operations
 * 
 * @returns {Object} Object containing:
 *   - messages: Array of message objects in the conversation
 *   - handleSendMessage: Function to send a new message
 */
export const useMessaging = () => {
  // State for storing all messages in the conversation
  const [messages, setMessages] = useState<Message[]>([]);

  /**
   * Send a new message from the user
   * 
   * @param {string} content - The text content of the message
   */



  const handleSendMessage = (content: string, sender: "user" | "ai") => {
    if (content.trim() !== "") {
      const newMessage: Message = {
        id: uuidv4(), // Ensure unique ID for each message
        sender,
        content,
        timestamp: new Date().getTime().toString(), // Use a consistent timestamp format
      };
      setMessages((prev) => [...prev, newMessage]); // Append to the message list
    }
  };

  const addTranscriptionMessage = (text: string, sender: "user" | "ai") => {
    handleSendMessage(text, sender); // Reuse the message-adding logic
  };




  return { messages, handleSendMessage, addTranscriptionMessage };

};
