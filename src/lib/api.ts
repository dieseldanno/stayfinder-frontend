import type { NewProperty, Property } from "@/types/property";
import type { ApiError } from "@/types/api";
import { Booking, CreateBookingInput } from "@/types/booking";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
  }
  return API_BASE_URL;
}

export type PropertyFilters = {
  city?: string;
  maxPrice?: number;
  guests?: number;
  sort?: "price";
  order?: "asc" | "desc";
};

export async function getProperties(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  }
  const query = params.toString();

  const response = await fetch(
    `${getApiBaseUrl()}/properties${query ? `?${query}` : ""}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json() as Promise<Property[]>;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const response = await fetch(`${getApiBaseUrl()}/properties/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }
  return response.json() as Promise<Property>;
}

export async function createProperty(input: NewProperty): Promise<Property> {
  const response = await fetch(`${getApiBaseUrl()}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json() as Promise<Property>;
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<Booking> {
  const response = await fetch(`${getApiBaseUrl()}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json() as Promise<Booking>;
}

export async function getBookings(propertyId: string): Promise<Booking[]> {
  const response = await fetch(
    `${getApiBaseUrl()}/bookings?property_id=${encodeURIComponent(propertyId)}`,
    { credentials: "include", cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function updateBooking(
  id: string,
  input: CreateBookingInput,
): Promise<Booking> {
  const response = await fetch(`${getApiBaseUrl()}/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function deleteBooking(id: string): Promise<void> {
  const response = await fetch(`${getApiBaseUrl()}/bookings/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }
}

export async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiError;
    if (body.errors?.length) {
      return body.errors.map((e) => e.message).join(", ");
    }
    if (body.error) {
      return body.error;
    }
  } catch {
    // svaret var inte JSON, använd reservmeddelandet nedan
  }
  return "Something went wrong";
}
