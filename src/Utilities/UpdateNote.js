import Swal from "sweetalert2";
import axios from "axios";
import { getTokenFromLs } from "./getToken";
import { getUserNotes } from "./GetNotes";
import ConfirmMsg, { alertMsg } from "./ConfirmMsg";

export function UpdateNote({ title, content, id, setNotes }) {
  Swal.fire({
    title: "Update Your Note ✨",
    html: `
        <input required type='text' class='form-control w-100 mb-3' placeholder='Enter Title' id='title' name='title' value="${title}"/>
        <textarea required class='form-control w-100' placeholder='Enter Content' name='content' id='content' rows="7">${content}</textarea>
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
          ConfirmMsg("updated");
          updateNoteData({
            title: result.value.title,
            content: result.value.content,
            id,
            setNotes,
          });
        }
        console.log(result);
      }
    })
    .catch((err) => err);
}

async function updateNoteData({ id, title, content, setNotes }) {
  return axios
    .put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
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
