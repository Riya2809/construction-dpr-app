import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

const ALL_STATUSES = ["All", "Active", "On Hold", "Completed", "Planning"];

export default function Projects() {
  const { darkMode } = useAuth();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className={`min-h-screen font-mono transition-colors duration-200 ${darkMode ? "bg-[#0a0f0a]" : "bg-gray-100"}`}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Page title */}
        <div className="mb-6">
          <h1 className={`text-xl font-bold tracking-tight mb-1 ${darkMode ? "text-emerald-50" : "text-gray-900"}`}>
            Active Projects
          </h1>
          <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {filtered.length} of {projects.length} projects shown
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or locations..."
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm outline-none border transition-colors focus:border-emerald-500 ${
              darkMode
                ? "bg-[#0d150d] border-[#1f2d1f] text-emerald-50 placeholder:text-gray-600"
                : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            }`}
          />

          {/* Status filters */}
          <div className="flex gap-2 flex-wrap">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`text-xs px-3 py-2 rounded-lg border transition-all duration-150 ${
                  filterStatus === s
                    ? "border-emerald-500 text-emerald-400 bg-emerald-900/20"
                    : darkMode
                    ? "border-[#1f2d1f] text-gray-500 hover:text-gray-300 hover:border-gray-600"
                    : "border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                No projects match your search.
              </p>
            </div>
          ) : (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
