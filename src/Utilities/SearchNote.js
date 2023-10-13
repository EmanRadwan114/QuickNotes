export async function searchNotes({ event }) {
  const newArr = JSON.parse(localStorage.getItem("notes")).filter((note) => {
    return note.title.toLowerCase().includes(event.target.value.toLowerCase());
  });
  return newArr;
}

export async function displaySearchedNotes({ setter }) {
  document.getElementById("search").addEventListener("input", async (event) => {
    const searchedNotes = await searchNotes({ event, setter });
    await setter(searchedNotes);
  });
}
