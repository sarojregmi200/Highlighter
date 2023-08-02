import { Amplify } from "aws-amplify";
import aws_config from "./aws-exports.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Home from "./pages/Home.tsx";
import AuthPage from "./pages/Auth.tsx";

Amplify.configure(aws_config);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    index: true,
    path: "login/",
    element: <AuthPage type="login" />,
  },
  {
    path: "register/",
    element: <AuthPage type="register" />,
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
