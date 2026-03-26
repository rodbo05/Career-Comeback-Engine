"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">Page not found.</p>
      <button onClick={() => router.push("/")} className="btn-primary mt-6">
        Go Home
      </button>
    </div>
  );
}
