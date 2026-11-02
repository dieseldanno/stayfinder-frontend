"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";

export function EditPropertyButton({ propertyId }: { propertyId: string }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Link
      href={`/properties/${propertyId}/edit`}
      className="btn-secondary mt-6"
    >
      Edit property
    </Link>
  );
}
