import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("token") !== null) {
    return children;
  }
  return <Navigate to={"/login"} />;
}
