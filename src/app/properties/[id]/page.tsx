import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";

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
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p className="mt-2">{property.description}</p>
      <p className="mt-2">
        {property.city}, {property.country}
      </p>
      <p>{property.price_per_night} kr / night</p>
      <p>Max guests: {property.max_guests}</p>
    </main>
  );
}
