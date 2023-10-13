import React, { useState } from "react";
import { createContext } from "react";

export const notesContext = createContext();

export default function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState(null);
  return (
    <notesContext.Provider
      value={{ notes, setNotes, filterNotes, setFilterNotes }}
    >
      {children}
    </notesContext.Provider>
  );
}
