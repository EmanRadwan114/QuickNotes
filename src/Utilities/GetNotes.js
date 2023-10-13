import axios from "axios";
import { getTokenFromLs } from "./getToken";

export async function getUserNotes({ setter }) {
  return axios
    .get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
      headers: { token: getTokenFromLs() },
    })
    .then((response) => {
      if (response?.data.msg === "done") {
        setter(response?.data.notes);
      }
      return response;
    })
    .catch((err) => {
      setter([]);
      return err;
    });
}
