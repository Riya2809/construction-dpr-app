import { useAuth } from "../context/AuthContext";

export default function DarkModeToggle() {
  const { darkMode, toggleDark } = useAuth();

  return (
    <button
      onClick={toggleDark}
      title="Toggle dark mode"
      className={`text-sm px-2.5 py-1.5 rounded-lg border transition-colors ${
        darkMode
          ? "border-[#1f2d1f] hover:border-gray-600"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
