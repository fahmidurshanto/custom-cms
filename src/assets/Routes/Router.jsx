import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../components/Login/Login";
import NewStudents from "../../pages/NewStudents/NewStudents";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/students",
        loader: () =>  fetch("https://custom-cms-backend.vercel.app/students"),
        element: <NewStudents></NewStudents>
    }
])

export default router;