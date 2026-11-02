import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";
import { PropertyForm } from "@/components/PropertyForm";

type EditPropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-4 text-2xl font-bold">Edit property</h1>
      <PropertyForm property={property} />
    </main>
  );
}
