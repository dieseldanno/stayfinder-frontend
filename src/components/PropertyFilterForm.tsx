"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initial: {
    city: string;
    maxPrice: string;
    guests: string;
    sort: string;
  };
};

export default function PropertyFilterForm({ initial }: Props) {
  const router = useRouter();
  const [city, setCity] = useState(initial.city);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice);
  const [guests, setGuests] = useState(initial.guests);
  const [sort, setSort] = useState(initial.sort);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (guests) params.set("guests", guests);
    if (sort) {
      const [sortField, order] = sort.split("-");
      params.set("sort", sortField);
      params.set("order", order);
    }

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function handleReset() {
    setCity("");
    setMaxPrice("");
    setGuests("");
    setSort("");
    router.push("/");
  }

  const inputClass = "rounded border px-3 py-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-wrap items-end gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="city">City</label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="max-price">Max price / night</label>
        <input
          id="max-price"
          type="number"
          min={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="filter-guests">Guests</label>
        <input
          id="filter-guests"
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sort">Sort</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={inputClass}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <button type="submit" className="rounded border px-4 py-2">
        Search
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="rounded border px-4 py-2"
      >
        Reset
      </button>
    </form>
  );
}
