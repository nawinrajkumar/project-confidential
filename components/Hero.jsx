"use client";

import Button from "./Button";

export default function Hero() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-xl text-center">

        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Hi Nithya 👋
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          I made something just for you.
        </p>

        <Button />

      </div>
    </main>
  );
}
