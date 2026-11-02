import { PropertyForm } from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Create property
      </h1>
      <PropertyForm />
    </main>
  );
}
