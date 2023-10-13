import Swal from "sweetalert2";
import axios from "axios";
import { getTokenFromLs } from "./getToken";
import { getUserNotes } from "./GetNotes";
import ConfirmMsg, { alertMsg } from "./ConfirmMsg";

// ? open Add Note Modal

export async function openAddNoteModal({ setNotes, notes }) {
  Swal.fire({
    title: "Add Your Note ✨",
    html: `
    <input type='text' required class='form-control w-100 mb-3' placeholder='Enter Title' id='title' name='title'/>
    <textarea required class='form-control w-100' placeholder='Enter Content' name='content' id='content' rows="7"></textarea>
    `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        if (result.value.title === "" || result.value.content === "") {
          alertMsg();
        } else {
          ConfirmMsg("added");
          addNote({
            title: result.value.title,
            content: result.value.content,
            setNotes,
            notes,
          });
        }
      }
    })
    .catch((err) => err);
}

async function addNote({ title, content, setNotes, notes }) {
  return axios
    .post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      {
        title,
        content,
      },
      {
        headers: {
          token: getTokenFromLs(),
        },
      }
    )
    .then(async (response) => {
      if (response.data.msg === "done") {
        await getUserNotes({ setter: setNotes });
      }
      return response;
    })
    .catch((error) => {
      Swal.showValidationMessage(`Request failed: ${error}`);
    });
}
