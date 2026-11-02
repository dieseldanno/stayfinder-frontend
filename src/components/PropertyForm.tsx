"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import type { Property } from "@/types/property";

type Props = {
  property?: Property;
};

export function PropertyForm() {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <p>You must be logged in to create a property.</p>;
  }

  const inputClass = "rounded border px-3 py-2";

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="city">City</label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">Price per night (kr)</label>
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
        <label htmlFor="guests">Max guests</label>
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
      <div className="flex flex-col">
        <label htmlFor="image">Image URL (optional)</label>
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
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : isEdit
            ? "Save changes"
            : "Create Property"}
      </button>
    </form>
  );
}
