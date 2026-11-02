"use client";

import { useState } from "react";
import Link from "next/link";
import { createBooking } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import type { Property } from "@/types/property";

type Props = {
  property: Property;
  onCreated?: () => void;
};

function countNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) {
    return 0;
  }
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function BookingForm({ property, onCreated }: Props) {
  const { user, isLoading } = useUser();
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nights = countNights(checkIn, checkOut);
  const totalPrice = nights * property.price_per_night;

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (Number(guests) > property.max_guests) {
      setError(`This property allows max ${property.max_guests} guests`);
      return;
    }

    setIsSubmitting(true);

    try {
      await createBooking({
        property_id: property.id,
        guest_name: guestName,
        guest_email: guestEmail,
        check_in: checkIn,
        check_out: checkOut,
        guests: Number(guests),
      });
      setSuccess("Booking created!");
      setGuestName("");
      setCheckIn("");
      setCheckOut("");
      setGuests("1");
      onCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <p className="mt-6">
        <Link href="/login" className="underline">
          Log in
        </Link>{" "}
        to book this property.
      </p>
    );
  }

  const inputClass = "rounded border px-3 py-2";

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Book this property</h2>

      <div className="flex flex-col">
        <label htmlFor="guest-name">Your name</label>
        <input
          id="guest-name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="guest-email">Your email</label>
        <input
          id="guest-email"
          type="email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="check-in">Check-in</label>
        <input
          id="check-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="check-out">Check-out</label>
        <input
          id="check-out"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="guests">Guests (max {property.max_guests})</label>
        <input
          id="guests"
          type="number"
          min={1}
          max={property.max_guests}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      {nights > 0 && (
        <p>
          {nights} {nights === 1 ? "night" : "nights"} ×{" "}
          {property.price_per_night} kr = <strong>{totalPrice} kr</strong>
        </p>
      )}

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-700">{success}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Booking..." : "Book"}
      </button>
    </form>
  );
}
