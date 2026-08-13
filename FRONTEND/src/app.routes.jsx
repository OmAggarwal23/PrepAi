import { createBrowserRouter } from "react-router";
import Landing from "./features/interview/pages/Landing.jsx";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "../src/features/auth/components/protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/interview.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
]);
