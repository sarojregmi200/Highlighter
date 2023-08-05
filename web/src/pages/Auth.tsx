import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Authhandler";

function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    getToken().then((token) => {
      if (token) return navigate("/home");
    });
  }, []);
  return <Authenticator></Authenticator>;
}

export default AuthPage;
