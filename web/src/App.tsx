import { Amplify } from "aws-amplify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import ErrorPage from "./pages/ErrorPage";
import awsmobile from "./safeAwsExports";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    index: true,
    path: "auth/",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export function App() {
  useEffect(() => {
    Amplify.configure(awsmobile);
    console.log({ awsmobile });
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
