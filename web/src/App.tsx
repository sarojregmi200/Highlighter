import { Amplify } from "aws-amplify";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import awsmobile from "./safeAwsExports";
// import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);
export function App() {
  return (
    <Routes>
      <Route element={<Landing />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<AuthPage />} path="/auth" />
    </Routes>
  );
}

export default App;
