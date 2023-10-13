export default function userLogout({ navigator, setToken }) {
  localStorage.removeItem("token");
  navigator("/login");
  setToken(null);
}
