import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import DPRForm from "./pages/DPRForm";

// Toast component rendered globally
function Toast() {
  const { toast, dismissToast } = useAuth();
  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl max-w-sm"
      style={{
        background: toast.type === "success" ? "#022c22" : "#450a0a",
        borderColor: toast.type === "success" ? "#10b981" : "#ef4444",
        animation: "slideUp 0.3s ease",
      }}
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold shrink-0"
        style={{ background: toast.type === "success" ? "#10b981" : "#ef4444" }}
      >
        {toast.type === "success" ? "✓" : "✕"}
      </span>
      <span className="text-emerald-50 text-sm font-mono leading-snug flex-1">
        {toast.message}
      </span>
      <button
        onClick={dismissToast}
        className="text-gray-500 hover:text-gray-300 text-lg leading-none ml-1"
      >
        ×
      </button>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/projects" replace /> : <Login />}
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dpr/:projectId"
            element={
              <ProtectedRoute>
                <DPRForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
