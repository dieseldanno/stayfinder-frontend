import { getProperties } from "@/lib/api";
import { PropertyCard } from "./components/PropertyCard";

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Boenden</h1>
      <section className="space-y-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
    </main>
  );
}
