import React from "react";
import { clickDeleteBtn } from "../../Utilities/DeleteNote";
import { UpdateNote } from "../../Utilities/UpdateNote";

export default function Note({ array, setter }) {
  return (
    <>
      {array.map((note) => {
        return (
          <div className="col-md-6 col-lg-4" key={note._id}>
            <div className="p-3 rounded-2 card-shadow">
              <h2 className="h4 fw-semibold light-text text-capitalize">
                {note.title}
              </h2>
              <p className="mt-0 mt-2 mb-3 fs-5">{note.content}</p>
              <button
                className="btn px-2 fs-5 py-1 btn-outline-danger me-3"
                onClick={() => {
                  clickDeleteBtn(note._id, setter);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button
                className="btn px-2 fs-5 py-1 btn-outline-dark main-text main-btn"
                onClick={() => {
                  UpdateNote({
                    title: note.title,
                    content: note.content,
                    id: note._id,
                    setNotes: setter,
                  });
                }}
              >
                <i className="fa-solid fa-edit "></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
