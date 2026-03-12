import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ImagePreview from "../components/ImagePreview";
import projects from "../data/projects";
import { validateDPR } from "../utils/validation";

const WEATHER_OPTIONS = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Stormy", "Foggy"];

export default function DPRForm() {
  const { darkMode, showToast } = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [form, setForm] = useState({
    project: projectId || "",
    date: new Date().toISOString().split("T")[0],
    weather: "",
    workDesc: "",
    workerCount: "",
    photos: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const readers = files.map(
      (f) =>
        new Promise((res) => {
          const r = new FileReader();
          r.onload = () => res({ name: f.name, url: r.result });
          r.readAsDataURL(f);
        })
    );
    Promise.all(readers).then((imgs) => set("photos", imgs));
  };

  const removePhoto = (index) => {
    set("photos", form.photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const validationErrors = validateDPR(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    showToast("DPR submitted successfully!", "success");
  };

  // Shared input styles
  const inputClass = (key) =>
    `w-full text-sm outline-none rounded-xl px-4 py-3 border transition-colors focus:border-emerald-500 ${
      errors[key] ? "border-red-900" : darkMode ? "border-[#1f2d1f]" : "border-gray-200"
    } ${darkMode ? "bg-[#0d150d] text-emerald-50 placeholder:text-gray-600" : "bg-gray-50 text-gray-900 placeholder:text-gray-400"}`;

  const labelClass = "block text-[11px] tracking-widest uppercase mb-2 font-semibold " + (darkMode ? "text-gray-400" : "text-gray-500");
  const sectionClass = `rounded-2xl border p-7 ${darkMode ? "bg-[#111712] border-[#1f2d1f]" : "bg-white border-gray-200"}`;
  const sectionTitle = `text-sm font-semibold font-mono mb-6 pb-4 border-b flex items-center gap-2 ${darkMode ? "text-emerald-50 border-[#1f2d1f]" : "text-gray-800 border-gray-100"}`;

  // Success screen
  if (submitted) {
    const projectName = projects.find((p) => p.id === Number(form.project))?.name;
    return (
      <div className={`min-h-screen font-mono transition-colors duration-200 ${darkMode ? "bg-[#0a0f0a]" : "bg-gray-100"}`}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className={`rounded-3xl border p-12 ${darkMode ? "bg-[#111712] border-[#1f2d1f]" : "bg-white border-gray-200"}`}>
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white shadow-[0_0_40px_rgba(16,185,129,0.4)]"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
            >
              ✓
            </div>
            <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-emerald-50" : "text-gray-900"}`}>
              Report Submitted!
            </h2>
            <p className={`text-sm leading-relaxed mb-8 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              Your Daily Progress Report has been recorded successfully
              {projectName ? ` for ${projectName}` : ""}.
            </p>
            <button
              onClick={() => navigate("/projects")}
              className="py-3.5 px-8 rounded-xl text-white text-sm font-bold shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-mono transition-colors duration-200 ${darkMode ? "bg-[#0a0f0a]" : "bg-gray-100"}`}>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-xl font-bold tracking-tight mb-1 ${darkMode ? "text-emerald-50" : "text-gray-900"}`}>
            New DPR Entry
          </h1>
          <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Document today's site activity and progress
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Section 1 — Site Info */}
          <div className={sectionClass}>
            <p className={sectionTitle}>
              <span>📋</span> Site Information
            </p>

            {/* Project */}
            <div className="mb-5">
              <label className={labelClass}>Project *</label>
              <select
                value={form.project}
                onChange={(e) => set("project", e.target.value)}
                className={inputClass("project")}
                style={{ appearance: "none" }}
              >
                <option value="">— Select a project —</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.project && <p className="text-red-400 text-xs mt-1.5">⚡ {errors.project}</p>}
            </div>

            {/* Date + Weather */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className={inputClass("date")}
                />
                {errors.date && <p className="text-red-400 text-xs mt-1.5">⚡ {errors.date}</p>}
              </div>
              <div>
                <label className={labelClass}>Weather *</label>
                <select
                  value={form.weather}
                  onChange={(e) => set("weather", e.target.value)}
                  className={inputClass("weather")}
                  style={{ appearance: "none" }}
                >
                  <option value="">— Select —</option>
                  {WEATHER_OPTIONS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                {errors.weather && <p className="text-red-400 text-xs mt-1.5">⚡ {errors.weather}</p>}
              </div>
            </div>

            {/* Work Description */}
            <div className="mb-5">
              <label className={labelClass}>Work Description *</label>
              <textarea
                value={form.workDesc}
                onChange={(e) => set("workDesc", e.target.value)}
                placeholder="Describe work carried out today, issues encountered, materials used..."
                rows={5}
                className={`${inputClass("workDesc")} resize-vertical leading-relaxed`}
              />
              <div className="flex justify-between mt-1">
                {errors.workDesc ? (
                  <p className="text-red-400 text-xs">⚡ {errors.workDesc}</p>
                ) : (
                  <span />
                )}
                <span className={`text-xs ${form.workDesc.length < 20 ? "text-red-400" : darkMode ? "text-gray-600" : "text-gray-400"}`}>
                  {form.workDesc.length}/20 min
                </span>
              </div>
            </div>

            {/* Worker Count */}
            <div>
              <label className={labelClass}>Worker Count *</label>
              <input
                type="number"
                min="1"
                max="500"
                value={form.workerCount}
                onChange={(e) => set("workerCount", e.target.value)}
                placeholder="Number of workers on site today"
                className={inputClass("workerCount")}
              />
              {errors.workerCount && (
                <p className="text-red-400 text-xs mt-1.5">⚡ {errors.workerCount}</p>
              )}
            </div>
          </div>

          {/* Section 2 — Photos */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: darkMode ? "#1f2d1f" : "#f3f4f6" }}>
              <p className={`text-sm font-semibold font-mono flex items-center gap-2 ${darkMode ? "text-emerald-50" : "text-gray-800"}`}>
                <span>📸</span> Site Photos
              </p>
              <span className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                Up to 3 images
              </span>
            </div>

            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-8 px-5 cursor-pointer transition-colors duration-200 ${
                darkMode
                  ? "border-[#1f2d1f] bg-[#0d150d] hover:border-emerald-500/50"
                  : "border-gray-200 bg-gray-50 hover:border-emerald-400"
              }`}
            >
              <span className="text-3xl mb-2">📁</span>
              <span className={`text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Click to upload photos
              </span>
              <span className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                JPG, PNG, WEBP — max 3 files
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotos}
                className="hidden"
              />
            </label>

            <ImagePreview photos={form.photos} onRemove={removePhoto} />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl text-white text-sm font-bold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_28px_rgba(16,185,129,0.5)] hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
          >
            {loading ? "⏳ Submitting Report..." : "Submit Daily Progress Report →"}
          </button>
        </div>
      </div>
    </div>
  );
}
