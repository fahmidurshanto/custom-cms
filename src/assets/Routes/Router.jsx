import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../components/Login/Login";
import NewStudents from "../../pages/NewStudents/NewStudents";
import Locations from "../../pages/Locations/Locations";
import Vendors, { loader as vendorsLoader } from "../../pages/Vendors";
import Courses, { loader as coursesLoader } from "../../pages/Courses";
import Employees, { loader as employeesLoader } from "../../pages/Employees";
import Batches, { loader as batchesLoader } from "../../pages/Batches";
import Certifications, { loader as certificationsLoader } from "../../pages/Certifications";

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
    },
    {
        path: "/courses",
        loader: coursesLoader,
        element: <Courses />
    },
    {
        path: "/employees",
        loader: employeesLoader,
        element: <Employees />
    },
    {
        path: "/batches",
        loader: batchesLoader,
        element: <Batches />
    },
    {
        path: "/certifications",
        loader: certificationsLoader,
        element: <Certifications />
    }
])

export default router;