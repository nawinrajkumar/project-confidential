"use client";

import { useState } from "react";
import Link from "next/link";
import MemePlaceholder from "@/components/MemePlaceholder";

export default function NoPage() {
  const [count, setCount] = useState(0);

  const messages = [
    "🥺 Are you sure?",
    "🙏 Pleeease?",
    "🥹 Just one more thought? 👉👈",
  ];

  const memes = [
    { title: "Meme for the first no", src: "/cat_in_tears.jpg" },
    { title: "Meme for the second no", src: "/cat_please.gif" },
    { title: "Meme for the final no", src: "/one_last_thought.gif" },
  ];

  const positions = [
    { top: "65%", left: "60%" },
    { top: "56%", left: "20%" },
    { top: "72%", left: "25%" },
  ];

  const handleNo = () => {
    if (count === 2) {
      setCount(3);
      void fetch("/api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: "no" }),
      });
      return;
    }

    setCount((prev) => prev + 1);
  };

  return (
    <main className="relative min-h-dvh overflow-hidden px-5 py-10 sm:px-6 sm:py-12">

      {/* Moving Message */}
      {count < 3 && (
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold transition-all duration-500">
            {messages[count]}
          </h1>
          <MemePlaceholder
            title={memes[count].title}
            src={memes[count].src}
          />
        </div>
      )}

      {/* Moving No Button */}
      {count < 3 && (
        <>
          <Link
            href="/yes"
            style={{ transform: `translateX(-50%) scale(${1 + count * 0.2})` }}
            className="absolute bottom-[12%] left-1/2 z-10 whitespace-nowrap rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-500 hover:bg-green-700"
          >
            Yes
          </Link>

          <button
            onClick={handleNo}
            style={positions[count]}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 px-8 py-4 text-lg text-white shadow-lg transition-all duration-500 hover:scale-105"
          >
          🙈 No
          </button>
        </>
      )}

      {/* Final Message */}
      {count === 3 && (
        <div className="flex justify-center py-10">

          <div className="max-w-3xl text-center">

            <h1 className="text-3xl md:text-5xl font-bold mb-10">
              😌 That's Okay ❤️
            </h1>

            <p className="text-lg md:text-2xl leading-8 md:leading-10 text-gray-700">

              Thank you for taking the time to go through this.

              <br /><br />

              I completely respect your decision.

              <br /><br />

              I'd rather know your answer than spend months wondering
              what it might have been.

              <br /><br />

              We can still be friends if you're okay with it.

              I know my boundaries, and if I ever cross one
              unintentionally...

              feel free to slap some sense into me. 😅

              <br /><br />

              I hope this made you smile at least once.

              <br /><br />

              Have a wonderful day. See you at gym

            </p>

            <p className="mt-12 text-xl italic">
              — Nawin
            </p>

            <p className="mt-10 text-base italic leading-7 text-gray-700 sm:text-lg">
              P.S. I was uninspired for a few months, sourcing ideas to work
              on. This was genuinely interesting, and I had fun during these
              two sleepless nights.
              <br /><br />
              Special thanks to Codex and my friend for tolerating my nonsense
              while reviewing this so it didn&apos;t end up cringe.
              <br /><br />
              BTW, I still don&apos;t understand how frontend development works.
              Hats off to the people who do this.
            </p>

            <MemePlaceholder title="Postscript meme" />


          </div>

        </div>
      )}

    </main>
  );
}
