"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded border px-4 py-2">
        Try again
      </button>
    </main>
  );
}
