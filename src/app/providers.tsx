"use client";

import type { ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <UserProvider>{children}</UserProvider>;
}
