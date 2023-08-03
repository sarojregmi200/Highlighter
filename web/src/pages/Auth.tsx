import { Authenticator } from "@aws-amplify/ui-react";

import { useNavigate } from "react-router-dom";
import { Hub } from "aws-amplify";

function AuthPage() {
  const navigate = useNavigate();

  Hub.listen("auth", (event) => {
    const type = event.payload.event;
    switch (type) {
      case "signIn":
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          " userId=;   expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          " activeId=;  expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          " settingsId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setCookie(event.payload.data.signInUserSession.accessToken.jwtToken);
        navigate("/home");
        break;
    }
  });

  function setCookie(token: string) {
    console.log({
      token,
    });
    const date = new Date();
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `authToken=${token}; expires=${expires}; path=/`;
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
