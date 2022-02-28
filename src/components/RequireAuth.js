import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  return localStorage.token ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
