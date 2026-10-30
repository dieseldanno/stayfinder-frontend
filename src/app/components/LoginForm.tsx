"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/auth";
import { useUser } from "@/context/UserContext";

type LoginFormProps = {
  mode: "login" | "register";
};

export function LoginForm({ mode }: LoginFormProps) {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await loginUser(email, password);
        await refreshUser();
        router.push("/");
      } else {
        await registerUser(email, password);
        await refreshUser();
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="rounded border px-3 py-2"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-700">{message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting
          ? "Please wait..."
          : mode === "login"
            ? "Log in"
            : "Create account"}
      </button>
    </form>
  );
}
