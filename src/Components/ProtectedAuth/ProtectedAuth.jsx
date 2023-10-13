import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  if (localStorage.getItem("token") === null) {
    return children;
  }
  return <Navigate to={"/"} />;
}
