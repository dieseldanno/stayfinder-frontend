import Link from "next/link";
import { LoginForm } from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Log in</h1>
      <LoginForm mode="login" />
      <p className="mt-4">
        No account?{" "}
        <Link href="/register" className="underline">
          Create one
        </Link>
      </p>
    </main>
  );
}
