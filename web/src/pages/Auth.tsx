import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Authhandler";

import "../styles/customLogin.css";

function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    getToken().then((token) => {
      console.log(token);
      if (token) return navigate("/home");
    });
  }, []);
  return (
    <div className="loginContainer">
      <Authenticator></Authenticator>
    </div>
  );
}

export default AuthPage;
