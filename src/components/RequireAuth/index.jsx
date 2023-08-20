// @/src/components/RequireAuth.jsx
import { useAtom } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userAtom } from "../../store/Atoms";

const RequireAuth = ({children}) => {
  const location = useLocation();
  const [user, setUser] = useAtom(userAtom);

  if (!user) {
    return (
      <Navigate to={{ pathname: "/sign-in" }} state={{ location }} replace />
    );
  }

  return children;
};

export default RequireAuth;
