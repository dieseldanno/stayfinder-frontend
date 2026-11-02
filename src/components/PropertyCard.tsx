import Link from "next/link";
import type { Property } from "@/types/property";
import Image from "next/image";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="rounded border p-4">
      {property.image_url ? (
        <div className="relative aspect-4/3 w-full">
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-4/3 w-full items-center justify-center bg-gray-100 text-gray-400">
          No image
        </div>
      )}
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
