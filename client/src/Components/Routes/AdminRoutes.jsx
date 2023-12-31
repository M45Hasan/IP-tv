import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Loading/Loading";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminRoutes = ({ children }) => {
  // const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const location = useLocation();
  const { profile, isAuthenticated } = useContext(AuthContext);
  // console.log(profile, isAuthenticated);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  // Check if the user is authenticated
  if (loading) {
    return <Loading />;
  }
  if (profile?.email) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default AdminRoutes;
