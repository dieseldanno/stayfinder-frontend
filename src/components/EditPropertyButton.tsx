"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";

export function EditPropertyButton({ propertyId }: { propertyId: string }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Link
      href={`/properties/${propertyId}/edit`}
      className="mt-4 inline-block rounded border px-3 py-1"
    >
      Edit property
    </Link>
  );
}
