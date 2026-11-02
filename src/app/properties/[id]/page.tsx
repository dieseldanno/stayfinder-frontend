import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";
import BookingSection from "@/components/BookingSection";
import Image from "next/image";
import { EditPropertyButton } from "@/components/EditPropertyButton";

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
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      {property.image_url ? (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            priority
            sizes="(min-width: 1024px) 672px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mb-6 flex aspect-video w-full items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
          No image
        </div>
      )}

      <h1 className="text-3xl font-semibold tracking-tight">
        {property.title}
      </h1>
      <p className="mt-1 text-neutral-500">
        {property.city}, {property.country}
      </p>
      <p className="mt-4 leading-relaxed text-neutral-700">
        {property.description}
      </p>
      <p className="mt-4 font-medium">
        {property.price_per_night} kr{" "}
        <span className="font-normal text-neutral-500">
          / night · max {property.max_guests} guests
        </span>
      </p>

      <EditPropertyButton propertyId={property.id} />
      <BookingSection property={property} />
    </main>
  );
}
