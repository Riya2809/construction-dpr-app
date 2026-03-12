import { useAuth } from "../context/AuthContext";

export default function ImagePreview({ photos, onRemove }) {
  const { darkMode } = useAuth();

  if (!photos || photos.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {photos.map((photo, index) => (
        <div key={index} className="relative group">
          <img
            src={photo.url}
            alt={photo.name}
            className={`w-20 h-20 object-cover rounded-xl border-2 transition-all duration-200 ${
              darkMode ? "border-[#1f2d1f]" : "border-gray-200"
            }`}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="text-white text-xs font-mono truncate px-1 max-w-full">
              {photo.name.length > 10 ? photo.name.slice(0, 10) + "…" : photo.name}
            </span>
          </div>
          {/* Delete button */}
          <button
            onClick={() => onRemove(index)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 border-2 border-[#111712] text-white text-xs flex items-center justify-center font-bold transition-colors duration-150 z-10"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
