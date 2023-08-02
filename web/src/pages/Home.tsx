import { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const signout = () => {
    const userCookie = document.cookie
      .split(";")
      .filter((cookie) => cookie.includes("user="))[0];

    document.cookie.replace(userCookie, "");
  };
  const getCookie = (): string => {
    return document.cookie
      .split(";")
      .filter((cookie) => cookie.includes("user="))[0]
      .replace("user=", "");
  };

  useEffect(() => {
    const cookie = getCookie();
    console.log("the cookie is ", cookie);
    if (!cookie) navigate("/login");
  }, []);
  return (
    <div className="mainContainer">
      <button onClick={signout}>Sign out</button>
    </div>
  );
}

export default Home;
