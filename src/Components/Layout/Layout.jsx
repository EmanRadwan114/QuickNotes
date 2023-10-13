import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { tokenContext } from "./../../Contexts/UserContext";

export default function Layout() {
  const { setToken } = useContext(tokenContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="container-sm py-5 min-vh-100r">
      <Outlet></Outlet>
    </div>
  );
}
