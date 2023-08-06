import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import "../styles/customLogin.css";
import { useEffect } from "react";
import { getToken } from "../Authhandler";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    getToken().then((authToken) => {
      if (authToken) return navigate("/home");
    });
  }, []);

  return (
    <div className="loginContainer">
      <Authenticator>
        {() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          return <div> Redirecting to home......</div>;
        }}
      </Authenticator>
    </div>
  );
}

export default AuthPage;
