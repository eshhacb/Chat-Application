// src/ProtectedRoute.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Accessing `authUser` from the Redux store
  const { authUser } = useSelector((store) => store.user || {}); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/");  // Redirect to home or login page if user is not authenticated
    }
  }, [authUser, navigate]);

  // If user is not authenticated, redirect, otherwise render the children
  if (!authUser) {
    return <Navigate to="/" />;  // You can also redirect to the login page if needed
  }

  return <>{children}</>;  // Render the protected content
};

export default ProtectedRoute;
