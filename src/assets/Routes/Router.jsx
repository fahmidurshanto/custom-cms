import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../components/Login/Login";
import NewStudents from "../../pages/NewStudents/NewStudents";
import Locations from "../../pages/Locations/Locations";
import Vendors, { loader as vendorsLoader } from "../../pages/Vendors";

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
        loader: () => fetch("https://custom-cms-backend.vercel.app/students"),
        element: <NewStudents></NewStudents>
    },
    {
        path: "/vendors",
        loader: vendorsLoader,
        element: <Vendors />
    },
    {
        path: "/locations",
        loader: async () => {
          const response = await fetch("https://custom-cms-backend.vercel.app/locations");
          if (!response.ok) {
            throw new Error('Failed to fetch locations');
          }
          return response.json();
        },
        element: <Locations />
    }
])

export default router;