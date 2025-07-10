import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based route protection
  if (location.pathname.startsWith("/admin") && role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname.startsWith("/staff") && role !== "staff") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
