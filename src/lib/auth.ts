import { getApiBaseUrl, readError } from "@/lib/api";
import type { AuthUser } from "@/types/auth";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error(await readError(response));
  }

  const data = (await response.json()) as { user: AuthUser };
  return data.user;
}

async function postAuth(
  path: "login" | "register",
  email: string,
  password: string,
): Promise<AuthUser> {
  const response = await fetch(`${getApiBaseUrl()}/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  const data = (await response.json()) as { user: AuthUser };
  return data.user;
}

export function loginUser(email: string, password: string) {
  return postAuth("login", email, password);
}

export function registerUser(email: string, password: string) {
  return postAuth("register", email, password);
}

export async function logoutUser(): Promise<void> {
  const response = await fetch(`${getApiBaseUrl()}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
}
