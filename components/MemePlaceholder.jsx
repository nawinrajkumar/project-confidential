export default function MemePlaceholder({ title }) {
  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-md h-64 rounded-2xl border-2 border-dashed border-gray-400 bg-white flex items-center justify-center shadow">
        <p className="text-gray-500 text-lg text-center px-6">
          😂 {title}
        </p>
      </div>
    </div>
  );
}