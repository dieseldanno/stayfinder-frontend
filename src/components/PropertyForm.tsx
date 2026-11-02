"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty, deleteProperty } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import type { Property } from "@/types/property";

type Props = {
  property?: Property;
};

export function PropertyForm({ property }: Props) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const isEdit = property !== undefined;
  const [title, setTitle] = useState(property?.title ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [city, setCity] = useState(property?.city ?? "");
  const [country, setCountry] = useState(property?.country ?? "");
  const [pricePerNight, setPricePerNight] = useState(
    property ? String(property.price_per_night) : "",
  );
  const [maxGuests, setMaxGuests] = useState(
    property ? String(property.max_guests) : "",
  );
  const [imageUrl, setImageUrl] = useState(property?.image_url ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const input = {
      title,
      description,
      city,
      country,
      price_per_night: Number(pricePerNight),
      max_guests: Number(maxGuests),
      image_url: imageUrl.trim() === "" ? null : imageUrl.trim(),
    };

    try {
      const saved = isEdit
        ? await updateProperty(property.id, input)
        : await createProperty(input);
      router.push(`/properties/${saved.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!property) return;
    if (!window.confirm(`Delete "${property.title}"? This cannot be undone.`)) {
      return;
    }

    setError(null);
    setIsDeleting(true);

    try {
      await deleteProperty(property.id);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return <p className="text-neutral-500">Loading...</p>;
  }
  if (!user) {
    return (
      <p className="text-neutral-500">
        You must be logged in to manage properties.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full space-y-6 p-6">
      <div className="flex flex-col">
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="city" className="label">
            City
          </label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="country" className="label">
            Country
          </label>
          <input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="input"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="price" className="label">
            Price per night (kr)
          </label>
          <input
            id="price"
            type="number"
            min={100}
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guests" className="label">
            Max guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
            className="input"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="label">
          Image URL (optional)
        </label>
        <input
          id="image"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isSubmitting || isDeleting}
          className="btn-primary w-full"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Save changes"
              : "Create property"}
        </button>

        {property && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting || isDeleting}
            className="btn-danger w-full"
          >
            {isDeleting ? "Deleting..." : "Delete property"}
          </button>
        )}
      </div>
    </form>
  );
}
