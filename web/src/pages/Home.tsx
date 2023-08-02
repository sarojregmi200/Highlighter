import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const signout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    Auth.signOut().then(() => {
      navigate("/");
    });
  };
  const getCookie = (): string => {
    if (
      !document.cookie ||
      !document.cookie
        .split(";")
        .filter((cookie) => cookie.includes("user="))[0]
    )
      return "";
    return document.cookie
      .split(";")
      .filter((cookie) => cookie.includes("user="))[0]
      .replace("user=", "");
  };

  useEffect(() => {
    const cookie = getCookie();
    if (!cookie) navigate("/auth");
  }, []);
  return (
    <div className="mainContainer">
      <button onClick={signout}>Sign out</button>
    </div>
  );
}

export default Home;
