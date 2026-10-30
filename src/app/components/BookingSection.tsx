"use client";

import { useState } from "react";
import { BookingForm } from "./BookingForm";
import BookingList from "@/app/components/BookingList";
import type { Property } from "@/types/property";

export default function BookingSection({ property }: { property: Property }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <BookingForm
        property={property}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />
      <BookingList propertyId={property.id} refreshKey={refreshKey} />
    </>
  );
}
