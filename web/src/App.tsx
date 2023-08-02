import { Amplify } from "aws-amplify";
import aws_config from "./aws-exports.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Home from "./pages/Home.tsx";
import AuthPage from "./pages/Auth.tsx";
  import  ErrorPage from "./pages/ErrorPage.tsx";
  
     
Amplify.configure(aws_config);

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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
