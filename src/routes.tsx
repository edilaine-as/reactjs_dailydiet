import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { Error } from "./pages/error";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/app/auth/sign-in";
import { SignUp } from "./pages/app/auth/sign-up";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Dashboard /> },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
          { path: '/sign-in', element: <SignIn /> },
          { path: '/sign-up', element: <SignUp /> },
        ],
      },
])