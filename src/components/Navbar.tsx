"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export function Navbar() {
  const router = useRouter();
  const { user, isLoading, logout } = useUser();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          StayFinder
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isLoading ? null : user ? (
            <>
              <Link href="/properties/new" className="btn-primary">
                Add property
              </Link>
              <span className="text-neutral-400">{user.email}</span>
              <button onClick={handleLogout} className="btn-secondary">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-primary">
                Log in
              </Link>
              <Link href="/register" className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
