import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import UserContextProvider from "./Contexts/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import NotesContextProvider from "./Contexts/NotesContext";

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />{" "}
            </ProtectedAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
      ],
    },
  ]);
  return (
    <UserContextProvider>
      <NotesContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </NotesContextProvider>
    </UserContextProvider>
  );
}

export default App;
