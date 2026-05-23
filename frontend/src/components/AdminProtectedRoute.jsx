import { Navigate } from "react-router";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import AdminLogin from "./AdminLogin.jsx";

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return children;
};

export default AdminProtectedRoute;
