import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { Error } from "./pages/error";
import { Dashboard } from "./pages/app/dashboard/dashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Dashboard /> },
        ],
    }
])