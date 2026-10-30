import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Property not found</h1>
      <p className="mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 inline-block underline">
        Back to all properties
      </Link>
    </main>
  );
}
