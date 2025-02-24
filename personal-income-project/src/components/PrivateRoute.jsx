import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (!token) return setIsAuthenticated(false);

    fetch("https://localhost:5000/api/auth/validate-token", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, [token]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
