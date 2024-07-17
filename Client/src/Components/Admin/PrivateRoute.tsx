import React from "react";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps {
  redirectPath?: string;
  children: React.ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = "/admin/login",
  children,
}) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (!isAuthenticated) return <Navigate to={redirectPath} replace />;
  return <>{children}</>;
};

export default PrivateRoute;
