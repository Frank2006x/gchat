"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/chat-store";
import { UsernameModal } from "./username-modal";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

export function ChatContainer() {
  const {
    username,
    messages,
    isLoading,
    error,
    fetchMessages,
    setUsername,
    initializeUsername,
  } = useChatStore();

  useEffect(() => {
    initializeUsername();
  }, [initializeUsername]);

  useEffect(() => {
    if (username) {
      fetchMessages();
    }
  }, [username, fetchMessages]);

  if (!username) {
    return <UsernameModal onUsernameSubmit={setUsername} />;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-slate-50 dark:bg-slate-900">
      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      <ChatMessages
        messages={messages}
        currentUsername={username}
        isLoading={isLoading}
      />
      <ChatInput />
    </div>
  );
}
