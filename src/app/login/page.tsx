import Link from "next/link";
import { LoginForm } from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Log in</h1>
      <LoginForm mode="login" />
      <p className="mt-4 text-sm text-neutral-500">
        No account?{" "}
        <Link
          href="/register"
          className="font-medium text-neutral-900 underline"
        >
          Create one
        </Link>
      </p>
    </main>
  );
}
