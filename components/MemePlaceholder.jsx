import Image from "next/image";

export default function MemePlaceholder({ src, title }) {
  return (
    <div className="my-10 flex justify-center">
      {src ? (
        <Image
          src={src}
          alt={title}
          width={500}
          height={500}
          className="rounded-2xl shadow-xl object-cover"
        />
      ) : (
        <div className="w-full max-w-md h-64 rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center bg-white">
          <p className="text-gray-500 text-center">
            📸 {title}
          </p>
        </div>
      )}
    </div>
  );
}