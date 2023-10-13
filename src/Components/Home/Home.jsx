import React, { useContext, useEffect } from "react";
import Header from "./../Header/Header";
import Note from "./../Note/Note";
import { getUserNotes } from "../../Utilities/GetNotes";
import { notesContext } from "../../Contexts/NotesContext";
import { Helmet } from "react-helmet";

export default function Home() {
  const { notes, setNotes, filterNotes, setFilterNotes } =
    useContext(notesContext);

  localStorage.setItem("notes", JSON.stringify(notes));

  useEffect(() => {
    if (localStorage.getItem("notes") !== null) {
      getUserNotes({ setter: setNotes });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>QuickNotes</title>
        <meta
          name="description"
          content="QuickNotes allows you to jot down your quick thoughts"
        />
      </Helmet>
      <Header></Header>
      <div className="borderBtm main-text fw-bold pb-3 mb-4 space">
        <h1 className="h2">My Notes</h1>
      </div>
      <div className="row g-4 align-items-center">
        {!filterNotes ? (
          JSON.parse(localStorage.getItem("notes")).length === 0 ? (
            ""
          ) : (
            <Note array={notes} setter={setNotes}></Note>
          )
        ) : (
          <Note array={filterNotes} setter={setFilterNotes}></Note>
        )}
      </div>
      {filterNotes?.length === 0 || notes?.length === 0 ? (
        <p className="fw-bold text-dark fs-2 text-center mt-5">
          No Notes Found 😔
        </p>
      ) : (
        ""
      )}
    </>
  );
}
