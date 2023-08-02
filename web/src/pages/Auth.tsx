import { Authenticator, Button } from "@aws-amplify/ui-react";

import { redirect, useNavigate } from "react-router-dom";
import { Hub } from "aws-amplify";

function AuthPage({ type }: { type: string }) {
  const navigate = useNavigate();

  Hub.listen("auth", (event) => {
    const type = event.payload.event;
    switch (type) {
      case "signIn":
        setCookie(event.payload.data.username);
        createUser();
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

  function createUser() {}

  return (
    <Authenticator>
      {({ signOut }) => {
        return <button onClick={signOut}> sign out</button>;
      }}
    </Authenticator>
  );
}

export default AuthPage;
