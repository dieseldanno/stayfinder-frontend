import Link from "next/link";
import { LoginForm } from "../../components/LoginForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Create account
      </h1>
      <LoginForm mode="register" />
      <p className="mt-4 text-sm text-neutral-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-neutral-900 underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
