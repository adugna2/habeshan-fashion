import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../auth/AdminAuthContext";

const PrivateAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminLoggedIn } = useAdminAuth();

  return isAdminLoggedIn ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default PrivateAdminRoute;
