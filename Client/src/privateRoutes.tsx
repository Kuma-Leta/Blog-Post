import React from "react";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps {
  redirectPath?: string;
  children: React.ReactNode;
}
export const PrivateRoutes: React.FC<PrivateRouteProps> = ({
  redirectPath = "/login",
  children,
}) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (!isAuthenticated) return <Navigate to={redirectPath} replace />;
  return <>{children}</>;
};
