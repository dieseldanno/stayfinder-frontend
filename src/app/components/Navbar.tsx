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
    <nav className="border-b">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-4">
        <Link href="/" className="font-bold">
          StayFinder
        </Link>

        <div className="flex items-center gap-4">
          {isLoading ? null : user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <button onClick={handleLogout} className="underline">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
