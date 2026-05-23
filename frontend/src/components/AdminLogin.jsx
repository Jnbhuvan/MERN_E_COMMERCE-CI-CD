import { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginAdmin } = useAdminAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a small delay for UX
    setTimeout(() => {
      if (loginAdmin(password)) {
        setPassword("");
      } else {
        setError("Invalid password. Please try again.");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Access</h1>
        <p>Enter the admin password to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isLoading || !password}>
            {isLoading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
