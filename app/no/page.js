"use client";

import { useState } from "react";

export default function NoPage() {
  const [count, setCount] = useState(0);

  const messages = [
    "🥺 Are you sure?",
    "🙏 Pleeease?",
    "🥹 Just one more thought? 👉👈",
  ];

  const positions = [
    { top: "65%", left: "60%" },
    { top: "35%", left: "20%" },
    { top: "70%", left: "25%" },
  ];

  const handleNo = () => {
    if (count < 3) {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F6F2] px-6 py-12">

      {/* Moving Message */}
      {count < 3 && (
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold transition-all duration-500">
            {messages[count]}
          </h1>
        </div>
      )}

      {/* Moving No Button */}
      {count < 3 && (
        <button
          onClick={handleNo}
          style={positions[count]}
          className="absolute px-8 py-4 rounded-full bg-red-500 text-white text-lg shadow-lg transition-all duration-500 hover:scale-105"
        >
          🙈 No
        </button>
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

              Have a wonderful day.

            </p>

            <p className="mt-12 text-xl italic">
              — Nawin
            </p>

          </div>

        </div>
      )}

    </main>
  );
}