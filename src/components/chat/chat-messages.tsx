"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/store/chat-store";

interface ChatMessagesProps {
  messages: Message[];
  currentUsername: string;
  isLoading: boolean;
}

export function ChatMessages({ messages, currentUsername, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No messages yet. Be the first to say hello!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mx-auto max-w-4xl space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.username === currentUsername;
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 sm:max-w-md ${
                  isOwnMessage
                    ? "bg-slate-900 text-white dark:bg-slate-700"
                    : "bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                }`}
              >
                {!isOwnMessage && (
                  <div className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {message.username}
                  </div>
                )}
                <p className="break-words text-sm leading-relaxed">{message.message}</p>
                <div
                  className={`mt-1 text-xs ${
                    isOwnMessage
                      ? "text-slate-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
