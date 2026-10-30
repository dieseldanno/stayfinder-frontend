import Link from "next/link";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="rounded border p-4">
      <h2 className="font-semibold">{property.title}</h2>
      <p>
        {property.city}, {property.country}
      </p>
      <p>{property.price_per_night} kr / natt</p>
      <Link
        href={`/properties/${property.id}`}
        className="mt-2 inline-block underline"
      >
        Se detaljer
      </Link>
    </article>
  );
}
