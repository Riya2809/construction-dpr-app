import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";

const MOCK_EMAIL = "test@test.com";
const MOCK_PASSWORD = "123456";

export default function Login() {
  const { login, showToast } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateLogin({ email, password });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      login();
      showToast("Welcome back! 👋", "success");
      navigate("/projects");
    } else {
      setErrors({ auth: "Invalid credentials. Try test@test.com / 123456" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] flex items-center justify-center px-5 font-mono relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-3xl shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
            🏗️
          </div>
          <h1 className="text-emerald-50 text-xl font-bold tracking-tight mb-1">FieldForce</h1>
          <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Construction Management</p>
        </div>

        {/* Card */}
        <div className="bg-[#111712] border border-[#1f2d1f] rounded-2xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          <h2 className="text-emerald-50 text-lg font-semibold mb-1">Sign in to continue</h2>
          <p className="text-gray-600 text-xs mb-7">Access your field management dashboard</p>

          {/* Auth error */}
          {errors.auth && (
            <div className="bg-red-950 border border-red-900 rounded-xl px-4 py-3 mb-5 flex items-start gap-2.5">
              <span className="text-red-400 text-sm mt-0.5">⚠</span>
              <span className="text-red-300 text-sm leading-snug">{errors.auth}</span>
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-400 text-[11px] tracking-widest uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
              onKeyDown={handleKeyDown}
              placeholder="test@test.com"
              className={`w-full bg-[#0d150d] border rounded-xl px-4 py-3 text-emerald-50 text-sm outline-none transition-colors placeholder:text-gray-600 focus:border-emerald-500 ${
                errors.email ? "border-red-900" : "border-[#1f2d1f]"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5">⚡ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-7">
            <label className="block text-gray-400 text-[11px] tracking-widest uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                onKeyDown={handleKeyDown}
                placeholder="••••••"
                className={`w-full bg-[#0d150d] border rounded-xl px-4 py-3 pr-12 text-emerald-50 text-sm outline-none transition-colors placeholder:text-gray-600 focus:border-emerald-500 ${
                  errors.password ? "border-red-900" : "border-[#1f2d1f]"
                }`}
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm p-1 transition-colors"
              >
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5">⚡ {errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_28px_rgba(16,185,129,0.5)] hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
          >
            {loading ? "⏳ Authenticating..." : "→ Sign In"}
          </button>

          {/* Demo hint */}
          <div className="mt-5 px-4 py-3 bg-[#0a120a] rounded-xl border border-dashed border-[#1f2d1f]">
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Demo:{" "}
              <span className="text-emerald-500">test@test.com</span> /{" "}
              <span className="text-emerald-500">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
