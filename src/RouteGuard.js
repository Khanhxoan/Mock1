import { Navigate, Outlet } from "react-router-dom";

export const DirectRole = ({ role }) => {
  if (role === "admin") {
    return <Navigate to="/admin" />;
  }
  if (role === "user") {
    return <Navigate to="/setting" />;
  }
  return <Outlet />;
};

export const GuardUser = ({ role }) => {
  if (role === "admin") {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
};

export const GuardAdmin = ({ role }) => {
  if (role === "user") {
    return <Navigate to="/setting" />;
  }
  return <Outlet />;
};
