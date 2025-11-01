import { create } from "zustand";

export interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

interface ChatState {
  username: string | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  fetchMessages: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  initializeUsername: () => void;
}

function getStoredUsername(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("global-chat-username");
    return stored ? stored.trim() : null;
  } catch {
    return null;
  }
}

function setStoredUsername(username: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("global-chat-username", username);
  } catch {
    // Ignore localStorage errors
  }
}

export const useChatStore = create<ChatState>((set, get) => ({
  username: getStoredUsername(),
  messages: [],
  isLoading: false,
  error: null,

  setUsername: (username: string) => {
    const trimmedUsername = username.trim();
    setStoredUsername(trimmedUsername);
    set({ username: trimmedUsername, error: null });
  },

  initializeUsername: () => {
    const stored = getStoredUsername();
    if (stored && !get().username) {
      set({ username: stored });
    }
  },

  setMessages: (messages: Message[]) => {
    set({ messages, error: null });
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
      error: null,
    }));
  },

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  fetchMessages: async () => {
    const { setIsLoading, setError, setMessages } = get();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/messages");

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      const formattedMessages = data.messages.map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  },

  sendMessage: async (message: string) => {
    const { username, setIsLoading, setError, addMessage } = get();

    if (!username || !message.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      const newMessage = await response.json();
      const formattedMessage: Message = {
        ...newMessage,
        timestamp: new Date(newMessage.timestamp),
      };

      addMessage(formattedMessage);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  },
}));

