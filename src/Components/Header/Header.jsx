import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userLogout from "../../Utilities/Logout";
import { tokenContext } from "../../Contexts/UserContext";
import { openAddNoteModal } from "../../Utilities/AddNote";
import { notesContext } from "./../../Contexts/NotesContext";
import { displaySearchedNotes, searchNotes } from "../../Utilities/SearchNote";

export default function Header() {
  const navigate = useNavigate();
  const { setToken } = useContext(tokenContext);
  const { notes, setNotes, setFilterNotes } = useContext(notesContext);

  useEffect(() => {
    displaySearchedNotes({ setter: setFilterNotes });
  }, []);
  return (
    <header className="mb-5 fixed-top grey-bg shadow">
      <div className="container ">
        <nav className="navbar navbar-expand-lg justify-content-between align-items-center py-0">
          <p className="fs-3 m-0 fw-bold p-3">
            <Link to="/" className=" text-decoration-none main-text">
              <i className="fa-solid fa-feather-pointed me-3"></i>QuickNotes
            </Link>
          </p>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars main-text fw-semibold fs-2 d-lg-none text-end d-block w-100 "></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0 gap-4 mx-auto w-100 justify-content-evenly align-items-center text-center py-3">
              <li className="nav-item">
                <div className="d-flex">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="form-control rounded-top-2 rounded-start-2 rounded-end-0"
                    placeholder="Search Notes"
                  />
                  <i className="fa-solid fa-magnifying-glass cursor-pointer p-3 sec-bg rounded-bottom-2  rounded-end-2 rounded-start-0"></i>
                </div>
              </li>
              <li className="nav-item">
                <button
                  className="btn fw-bold fs-4 main-text secBtn sec-bg"
                  onClick={() => {
                    openAddNoteModal({ setNotes, notes });
                  }}
                >
                  Add Note <i className="fa-solid fa-plus ms-2"></i>
                </button>
              </li>
              <li className="nav-item">
                <p
                  className="btn fw-bold fs-4 main-text cursor-pointer secBtn m-0"
                  onClick={() => {
                    userLogout({ navigator: navigate, setToken });
                  }}
                >
                  Log Out
                </p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
