import Link from "next/link";
import type { Property } from "@/types/property";
import Image from "next/image";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="card overflow-hidden">
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
        <div className="flex aspect-4/3 w-full items-center justify-center bg-neutral-100 text-neutral-400">
          No image
        </div>
      )}

      <div className="p-4">
        <h2 className="font-semibold">{property.title}</h2>
        <p className="text-sm text-neutral-500">
          {property.city}, {property.country}
        </p>
        <p className="mt-3 font-medium">
          {property.price_per_night} kr{" "}
          <span className="text-sm font-normal text-neutral-500">/ natt</span>
        </p>
        <Link
          href={`/properties/${property.id}`}
          className="btn-secondary mt-4 w-full"
        >
          See details
        </Link>
      </div>
    </article>
  );
}
