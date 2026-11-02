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

  return (
    <form
      onSubmit={handleSubmit}
      className="card mb-8 flex flex-wrap items-end gap-4 p-4"
    >
      <div className="flex min-w-36 flex-1 flex-col">
        <label htmlFor="city" className="label">
          City
        </label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex min-w-36 flex-1 flex-col">
        <label htmlFor="max-price" className="label">
          Max price / night
        </label>
        <input
          id="max-price"
          type="number"
          min={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex min-w-36 flex-1 flex-col">
        <label htmlFor="filter-guests" className="label">
          Guests
        </label>
        <input
          id="filter-guests"
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex min-w-44 flex-1 flex-col">
        <label htmlFor="sort" className="label">
          Sort
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-primary">
          Search
        </button>
        <button type="button" onClick={handleReset} className="btn-secondary">
          Reset
        </button>
      </div>
    </form>
  );
}
