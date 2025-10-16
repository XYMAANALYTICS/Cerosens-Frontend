import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useProtectedRouteStore from "../store/protectedRouteStore";

const protectedRoute = ({ allowedRoles, requireTC }) => {
  const verifyAccessToken = useProtectedRouteStore((s) => s.verifyAccessToken);
  const loading = useProtectedRouteStore((s) => s.loading);
  const isAuthenticated = useProtectedRouteStore((s) => s.isAuthenticated);
  const acceptedTC = useProtectedRouteStore((s) => s.acceptedTC);
  const userRole = useProtectedRouteStore((s) => s.userRole);

  useEffect(() => {
    verifyAccessToken();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-gray-800 text-white">
        Loading ...
      </div>
    );

  if (!isAuthenticated || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  } else if (requireTC && !acceptedTC) {
    return <Navigate to="/terms-and-conditions" replace />;
  } else if (!requireTC && acceptedTC) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default protectedRoute;
