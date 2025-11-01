"use client";

import { useState, FormEvent } from "react";

interface UsernameModalProps {
  onUsernameSubmit: (username: string) => void;
}

export function UsernameModal({ onUsernameSubmit }: UsernameModalProps) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim()) {
      onUsernameSubmit(inputValue);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-800">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Enter Your Username
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Choose a name to start chatting in the global room
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100 dark:active:bg-slate-200"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

