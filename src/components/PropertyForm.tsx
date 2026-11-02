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
    return <p>Loading...</p>;
  }
  if (!user) {
    return <p>You must be logged in to manage properties.</p>;
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black";
  const labelClass = "mb-1 text-sm font-medium";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-6 rounded-lg border p-6 shadow-sm"
    >
      <div className="flex flex-col">
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="price" className={labelClass}>
            Price per night (kr)
          </label>
          <input
            id="price"
            type="number"
            min={100}
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guests" className={labelClass}>
            Max guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className={labelClass}>
          Image URL (optional)
        </label>
        <input
          id="image"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
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
          className="w-full rounded-md border border-red-600 px-4 py-2 font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete property"}
        </button>
      )}
    </form>
  );
}
