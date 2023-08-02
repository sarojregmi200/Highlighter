import { Amplify } from "aws-amplify";
import aws_config from "./aws-exports.ts";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";

Amplify.configure(aws_config);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login/",
        element: <Auth type="login" />,
      },
      {
        path: "register/",
        element: <Auth type="register" />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
