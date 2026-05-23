import { createContext, useState, useContext, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already authenticated from localStorage
    const storedAuth = localStorage.getItem("adminAuthenticated");
    if (storedAuth === "true") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const loginAdmin = (password) => {
    // Simple password authentication (change this password as needed)
    const ADMIN_PASSWORD = "admin123";
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
