import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Hub } from "aws-amplify";
import Home from "./Home";

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
      break;
  }
});

function setCookie(token: string) {
  const date = new Date();
  date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  const expires = date.toUTCString();
  document.cookie = `authToken=${token}; expires=${expires}; path=/`;
}

function AuthPage() {
  return (
    <Authenticator>
      {({ signOut }) => {
        return <Home from="auth" />;
      }}
    </Authenticator>
  );
}

export default AuthPage;
