import { getProperties, PropertyFilters } from "@/lib/api";
import { PropertyCard } from "../components/PropertyCard";
import PropertyFilterForm from "../components/PropertyFilterForm";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const filters: PropertyFilters = {
    city: params.city || undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    guests: params.guests ? Number(params.guests) : undefined,
    sort: params.sort === "price" ? "price" : undefined,
    order: params.order === "desc" ? "desc" : "asc",
  };

  const properties = await getProperties(filters);

  const sortValue = params.sort === "price" ? `price-${filters.order}` : "";

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Properties</h1>

      <PropertyFilterForm
        initial={{
          city: params.city ?? "",
          maxPrice: params.maxPrice ?? "",
          guests: params.guests ?? "",
          sort: sortValue,
        }}
      />

      {properties.length === 0 ? (
        <p>No properties match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </main>
  );
}
