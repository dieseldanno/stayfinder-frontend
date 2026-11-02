"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { deleteBooking, getBookings, updateBooking } from "@/lib/api";
import type { Booking, CreateBookingInput } from "@/types/booking";

type Props = {
  propertyId: string;
  refreshKey: number;
};

export default function BookingList({ propertyId, refreshKey }: Props) {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CreateBookingInput | null>(null);

  useEffect(() => {
    if (!user) return;

    getBookings(propertyId)
      .then(setBookings)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Something went wrong"),
      )
      .finally(() => setIsLoading(false));
  }, [user, propertyId, refreshKey]);

  function startEdit(booking: Booking) {
    setError(null);
    setEditingId(booking.id);
    setDraft({
      property_id: booking.property_id,
      guest_name: booking.guest_name,
      guest_email: booking.guest_email,
      check_in: booking.check_in,
      check_out: booking.check_out,
      guests: booking.guests,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  async function handleSave(id: string) {
    if (!draft) return;
    setError(null);

    try {
      const updated = await updateBooking(id, draft);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this booking?")) return;
    setError(null);

    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  // Inloggningsprompten finns redan i BookingForm
  if (!user) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">
        Bookings for this property
      </h2>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {isLoading ? (
        <p className="text-neutral-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-neutral-500">No bookings yet.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <li key={booking.id} className="card p-4">
              {editingId === booking.id && draft ? (
                <div className="space-y-3">
                  <input
                    className="input"
                    value={draft.guest_name}
                    onChange={(e) =>
                      setDraft({ ...draft, guest_name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    className="input"
                    value={draft.guest_email}
                    onChange={(e) =>
                      setDraft({ ...draft, guest_email: e.target.value })
                    }
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="date"
                      className="input"
                      value={draft.check_in}
                      onChange={(e) =>
                        setDraft({ ...draft, check_in: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="input"
                      value={draft.check_out}
                      onChange={(e) =>
                        setDraft({ ...draft, check_out: e.target.value })
                      }
                    />
                  </div>
                  <input
                    type="number"
                    min={1}
                    className="input"
                    value={draft.guests}
                    onChange={(e) =>
                      setDraft({ ...draft, guests: Number(e.target.value) })
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(booking.id)}
                      className="btn-primary"
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{booking.guest_name}</p>
                    <p className="text-sm text-neutral-500">
                      {booking.guest_email}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {booking.check_in} → {booking.check_out} ·{" "}
                      {booking.guests} guests · {booking.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(booking)}
                      className="btn-secondary px-3 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="btn-danger px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
