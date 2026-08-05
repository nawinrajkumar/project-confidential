"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/story")}
      className="
        px-8
        py-4
        rounded-full
        bg-black
        text-white
        text-lg
        font-medium
        shadow-lg
        transition-all
        duration-300
        hover:scale-105
        hover:bg-neutral-800
        active:scale-95
      "
    >
      Begin ✨
    </button>
  );
}