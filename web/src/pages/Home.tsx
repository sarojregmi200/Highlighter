import { API, Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createActive, createSettings, createUser } from "../graphql/mutations";

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

  async function addNewUser(userId: string) {
    if (!userId) return;

    try {
      const userSettings = await API.graphql({
        query: createSettings,
        variables: {
          input: {
            colors: ["#8CFF32", "#E9FF32", "#FF9C35", "#AEE2FF"],
            topics: ["Global", "Research", "Learnings"],
          },
        },
      });
      const userActives = await API.graphql({
        query: createActive,
        variables: {
          input: {
            topic: "Global",
            color: "#ff9c35",
            pen: true,
            background: true,
            underline: true,
          },
        },
      });

      //   creating a new user
      await API.graphql({
        query: createUser,
        variables: {
          input: {
            userActiveId: userActives?.data?.createActive.id,
            userSettingsId: userSettings?.data?.createSettings.id,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const userId = getCookie();
    if (!userId) return navigate("/auth");

    addNewUser(userId);
  }, []);
  return (
    <div className="mainContainer">
      <button onClick={signout}>Sign out</button>
    </div>
  );
}

export default Home;
