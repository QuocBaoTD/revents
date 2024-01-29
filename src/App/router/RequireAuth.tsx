import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

function RequireAuth() {
  const { authenticated, initialised } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!authenticated && initialised) {
    return <Navigate to="/unauthorised" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
