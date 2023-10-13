import React, { useState } from "react";
import { createContext } from "react";

export const tokenContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
