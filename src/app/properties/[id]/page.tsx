import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";
import BookingSection from "@/components/BookingSection";
import Image from "next/image";

type PropertyDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      {property.image_url ? (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded">
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-4/3 w-full items-center justify-center bg-gray-100 text-gray-400">
          No image
        </div>
      )}
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p className="mt-2">{property.description}</p>
      <p className="mt-2">
        {property.city}, {property.country}
      </p>
      <p>{property.price_per_night} kr / night</p>
      <p>Max guests: {property.max_guests}</p>
      <BookingSection property={property} />
    </main>
  );
}
