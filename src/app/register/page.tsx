import Link from "next/link";
import { LoginForm } from "../../components/LoginForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Create account</h1>
      <LoginForm mode="register" />
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
