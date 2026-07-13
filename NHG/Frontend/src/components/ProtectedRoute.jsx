import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import { getAuthData } from "../utils/authStorage";

const normalizeRole = (role) => String(role || "").trim().toUpperCase();

const hasRequiredRole = (userRole, requiredRole) => {
  if (!requiredRole) return true;

  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return allowedRoles.map(normalizeRole).includes(normalizeRole(userRole));
};

export default function ProtectedRoute({ children, requiredRole }) {
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      const authData = await getAuthData();

      if (!active) return;

      if (!authData) {
        setUser(null);
        setStatus("invalid");
        return;
      }

      setUser(authData);
      setStatus(hasRequiredRole(authData.role, requiredRole) ? "valid" : "unauthorized");
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, [requiredRole]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-sm font-semibold text-slate-500">
        Checking secure session...
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
        <Login />
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/" replace />;
  }

  return typeof children === "function" ? children(user) : children;
}
