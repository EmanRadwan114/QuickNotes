import axios from "axios";
import { getTokenFromLs } from "./getToken";
import Swal from "sweetalert2";
import { getUserNotes } from "./GetNotes";
import ConfirmMsg from "./ConfirmMsg";

async function deleteNote(id, setNotes) {
  return axios
    .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
      headers: { token: getTokenFromLs() },
    })
    .then((response) => {
      getUserNotes({ setter: setNotes });
      return response;
    })
    .catch((err) => err);
}

export async function clickDeleteBtn(id, setNotes) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(112, 60, 100)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteNote(id, setNotes);
      ConfirmMsg("deleted");
    }
  });
}
