import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const STATUS_STYLES = {
  Active:    { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500", bar: "bg-emerald-500" },
  "On Hold": { bg: "bg-yellow-100",  text: "text-yellow-800",  dot: "bg-yellow-500",  bar: "bg-yellow-500"  },
  Completed: { bg: "bg-blue-100",    text: "text-blue-800",    dot: "bg-blue-500",    bar: "bg-blue-500"    },
  Planning:  { bg: "bg-purple-100",  text: "text-purple-800",  dot: "bg-purple-500",  bar: "bg-purple-500"  },
};

const STATUS_STYLES_DARK = {
  Active:    { bg: "bg-emerald-900/30", text: "text-emerald-400", dot: "bg-emerald-500", bar: "bg-emerald-500", accent: "bg-emerald-500" },
  "On Hold": { bg: "bg-yellow-900/30",  text: "text-yellow-400",  dot: "bg-yellow-500",  bar: "bg-yellow-500",  accent: "bg-yellow-500"  },
  Completed: { bg: "bg-blue-900/30",    text: "text-blue-400",    dot: "bg-blue-500",    bar: "bg-blue-500",    accent: "bg-blue-400"    },
  Planning:  { bg: "bg-purple-900/30",  text: "text-purple-400",  dot: "bg-purple-500",  bar: "bg-purple-500",  accent: "bg-purple-500"  },
};

export default function ProjectCard({ project }) {
  const { darkMode } = useAuth();
  const navigate = useNavigate();
  const st = darkMode ? STATUS_STYLES_DARK[project.status] : STATUS_STYLES[project.status];

  const formattedDate = new Date(project.startDate).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/dpr/${project.id}`)}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group ${
        darkMode
          ? "bg-[#111712] border-[#1f2d1f] hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
          : "bg-white border-gray-200 hover:border-emerald-400 hover:shadow-lg"
      }`}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${st.accent || st.dot} rounded-l-2xl`} />

      <div className="pl-5 pr-5 py-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <h3
            className={`text-sm font-semibold font-mono flex-1 ${
              darkMode ? "text-emerald-50" : "text-gray-900"
            }`}
          >
            {project.name}
          </h3>

          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full font-mono whitespace-nowrap ${st.bg} ${st.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            {project.status}
          </span>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-4">
          <span className={`text-xs font-mono ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            📍 {project.location}
          </span>
          <span className={`text-xs font-mono ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            📅 {formattedDate}
          </span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span className={`text-xs font-mono ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Progress
            </span>
            <span className={`text-xs font-bold font-mono ${st.text}`}>
              {project.progress}%
            </span>
          </div>
          <div className={`h-1.5 rounded-full ${darkMode ? "bg-[#1f2d1f]" : "bg-gray-100"}`}>
            <div
              className={`h-full rounded-full transition-all duration-700 ${st.bar}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Arrow */}
      <span
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-transform duration-200 group-hover:translate-x-1 ${
          darkMode ? "text-gray-600" : "text-gray-300"
        }`}
      >
        ›
      </span>
    </div>
  );
}
