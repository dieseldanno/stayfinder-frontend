import { PropertyForm } from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-4 text-2xl font-bold">Create property</h1>
      <PropertyForm />
    </main>
  );
}
