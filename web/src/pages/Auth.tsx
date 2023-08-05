import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Auth, Hub } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

Hub.listen("auth", (data) => {
  console.log({ data: data.payload.event });
  switch (data.payload.event) {
    case "configured":

      break;
    case "signIn":
      console.log("new Signin");
      break;
  }
});

function AuthPage() {
  useEffect(() => {
    console.log("loaded");
  }, []);
  return <Authenticator></Authenticator>;
}

export default AuthPage;
