import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Property not found
      </h1>
      <p className="mt-2 text-neutral-500">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn-secondary mt-6">
        Back to all properties
      </Link>
    </main>
  );
}
