"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { useChatStore } from "@/store/chat-store";

export function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage, isLoading } = useChatStore();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      await sendMessage(inputValue);
      setInputValue("");
    }
  }

  async function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        await sendMessage(inputValue);
        setInputValue("");
      }
    }
  }

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100 dark:active:bg-slate-200"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}
