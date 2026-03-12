import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const { logout, darkMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDPR = location.pathname.startsWith("/dpr");

  const handleBack = () => navigate("/projects");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center gap-3 px-5 h-14 border-b transition-colors duration-200 ${
        darkMode
          ? "bg-[#111712] border-[#1f2d1f]"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      {isDPR ? (
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 text-sm font-mono transition-colors"
        >
          ← Back
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xl">🏗️</span>
          <span
            className={`font-bold text-base font-mono tracking-tight ${
              darkMode ? "text-emerald-50" : "text-gray-900"
            }`}
          >
            FieldForce
          </span>
        </div>
      )}

      <span
        className={`flex-1 text-xs font-mono ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {isDPR ? "Daily Progress Report" : "Projects"}
      </span>

      <DarkModeToggle />

      {!isDPR && (
        <button
          onClick={handleLogout}
          className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
            darkMode
              ? "border-[#1f2d1f] text-gray-400 hover:text-gray-200 hover:border-gray-600"
              : "border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-400"
          }`}
        >
          Sign out
        </button>
      )}
    </nav>
  );
}
