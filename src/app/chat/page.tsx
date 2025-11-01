import { ChatContainer } from "@/components/chat/chat-container";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Global Chat
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Connect with people from around the world
          </p>
        </div>
      </header>
      <main className="flex-1">
        <ChatContainer />
      </main>
    </div>
  );
}

