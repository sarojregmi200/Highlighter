import { Authenticator } from "@aws-amplify/ui-react";

import { useNavigate } from "react-router-dom";
import { Hub } from "aws-amplify";

function AuthPage() {
  const navigate = useNavigate();

  Hub.listen("auth", (event) => {
    const type = event.payload.event;
    switch (type) {
      case "signIn":
        setCookie(event.payload.data.signInUserSession.accessToken.jwtToken);
        navigate("/home");
        break;
    }
  });

  function setCookie(userName: string) {
    const date = new Date();
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = "user=" + userName + ";" + expires + ";path=/";
  }

  return (
    <Authenticator>
      {({ signOut }) => {
        return <button onClick={signOut}> sign out</button>;
      }}
    </Authenticator>
  );
}

export default AuthPage;
