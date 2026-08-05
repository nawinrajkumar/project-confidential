"use client";

import Button from "./Button";

export default function Hero() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9F6F2]">
      <div className="text-center">

        <h1 className="text-6xl font-bold mb-6">
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