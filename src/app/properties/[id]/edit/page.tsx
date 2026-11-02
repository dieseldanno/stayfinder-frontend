import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/PropertyForm";
import { getPropertyById } from "@/lib/api";

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
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Edit property
      </h1>
      <PropertyForm property={property} />
    </main>
  );
}
