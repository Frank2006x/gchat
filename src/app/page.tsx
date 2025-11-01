import Link from "next/link";

export default function Home() {
  return (
    // eslint-disable-next-line -- bg-gradient-to-br is valid Tailwind CSS class
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-900 dark:to-slate-800">
      <main className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
            Global Chat
          </h1>
          <p className="text-xl font-medium text-slate-600 dark:text-slate-400 sm:text-2xl">
            Connect. Share. Unite.
          </p>
          <p className="mx-auto max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-500 sm:text-lg">
            One room, endless conversations. Join people from around the world in a single, unified chat space.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/chat"
            className="w-full rounded-lg bg-slate-900 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100 dark:active:bg-slate-200 sm:w-auto"
          >
            Start Chatting
          </Link>
        </div>

        <div className="pt-8">
          <blockquote className="border-l-4 border-slate-300 pl-4 text-left italic text-slate-600 dark:border-slate-600 dark:text-slate-400">
            &ldquo;In a world where distance means nothing, conversations mean everything.&rdquo;
          </blockquote>
        </div>
      </main>
    </div>
  );
}
