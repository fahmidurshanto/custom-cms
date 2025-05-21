import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../components/Login/Login";
import Admission from "../components/Admission/Admission";
import NewStudents from "../../pages/NewStudents/NewStudents";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/admission",
                element: <Admission></Admission>
            },
        ]
    },
    {
        path: "/students",
        loader: () =>  fetch("http://localhost:3000/students"),
        element: <NewStudents></NewStudents>
    }
])

export default router;