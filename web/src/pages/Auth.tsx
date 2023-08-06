import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";

import "../styles/customLogin.css";

function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <Authenticator>
        {() => {
          setTimeout(() => {
            navigate("/home");
          }, 1000);

          return <div> Redirecting to home......</div>;
        }}
      </Authenticator>
    </div>
  );
}

export default AuthPage;
