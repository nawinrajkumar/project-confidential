"use client";

import { useState } from "react";

export default function YesPage() {

  const [step, setStep] = useState(0);

  return (
    <main className="min-h-screen bg-[#F9F6F2] flex items-center justify-center px-8">

      <div className="max-w-xl text-center">

        {step === 0 && (
          <>
            <h1 className="text-5xl font-bold mb-8">
              😊 Yay!!
            </h1>

            <p className="text-2xl mb-10">
              You just made someone very happy.
            </p>

            <button
              onClick={() => setStep(1)}
              className="px-8 py-4 rounded-full bg-black text-white"
            >
              Continue →
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-4xl font-bold mb-8">
              Which café?
            </h1>

            <div className="flex flex-col gap-4">

              <button className="p-4 rounded-xl border hover:bg-black hover:text-white transition">
                Amethyst
              </button>

              <button className="p-4 rounded-xl border hover:bg-black hover:text-white transition">
                Writer's Cafe
              </button>

              <button className="p-4 rounded-xl border hover:bg-black hover:text-white transition">
                Pumpkin Tales
              </button>

              <button className="p-4 rounded-xl border hover:bg-black hover:text-white transition">
                Surprise Me
              </button>

            </div>
          </>
        )}

      </div>

    </main>
  );
}