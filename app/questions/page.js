"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-5 py-10 sm:px-8">

      <h1 className="text-4xl sm:text-5xl font-bold mb-8">
        Hi Nithya 👋
      </h1>

      <p className="text-xl text-center max-w-xl mb-10">
        I made something for you.
      </p>

      <button
        onClick={() => router.push("/story")}
        className="px-8 py-4 rounded-full bg-black text-white"
      >
        Continue →
      </button>

    </main>
  );
}
