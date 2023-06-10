// @/src/components/RequireAuth.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const user = true;
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={{ pathname: "/sign-in" }} state={{ location }} replace />
    );
  }

  return <Outlet />;
};
