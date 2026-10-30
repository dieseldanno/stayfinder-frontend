import { PropertyForm } from "@/app/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Create property</h1>
      <PropertyForm />
    </main>
  );
}
