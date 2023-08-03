import { API, Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createActive, createSettings, createUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";

function Home() {
  const navigate = useNavigate();
  const signout = () => {
    document.cookie =
      "authToken=; userId=; activeId=; settingsId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      " userId=;   expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      " activeId=;  expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      " settingsId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    Auth.signOut().then(() => {
      navigate("/");
    });
  };
  const setCookie = (userId: string, activeId: string, settingsId: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();

    const authToken = getCookie("authToken");
    console.log(userId);

    document.cookie = `authToken=${authToken};expires=${expires};path=/;`;
    document.cookie = `userId=${userId};expires=${expires};path=/;`;
    document.cookie = `activeId=${activeId};expires=${expires};path=/;`;
    document.cookie = `settingsId=${settingsId};expires=${expires};path=/;`;
  };
  const getCookie = (cookieName: string): string => {
    if (
      !document.cookie ||
      !document.cookie
        .split(";")
        .filter((cookie) => cookie.includes(`${cookieName}=`))[0]
    )
      return "";
    return document.cookie
      .split(";")
      .filter((cookie) => cookie.includes(`${cookieName}=`))[0]
      .replace(`${cookieName}=`, "");
  };

  async function addNewUser(authToken: string) {
    if (!authToken) return;

    try {
      const userSettings = (await API.graphql({
        query: createSettings,
        variables: {
          input: {
            colors: ["#8CFF32", "#E9FF32", "#FF9C35", "#AEE2FF"],
            topics: ["Global", "Research", "Learnings"],
          },
        },
      })) as any;
      const userActives = (await API.graphql({
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
      })) as any;

      //   creating a new user
      const user = (await await API.graphql({
        query: createUser,
        variables: {
          input: {
            userActiveId: userActives?.data?.createActive.id,
            userSettingsId: userSettings?.data?.createSettings.id,
          },
        },
      })) as any;

      const { data } = user;

      const dbUserId = data.createUser.id;
      const dbUserActiveId = data.createUser.active.id;
      const dbSettingId = data.createUser.settings.id;

      console.log({
        dbSettingId,
        dbUserActiveId,
        dbUserId,
      });

      setCookie(dbUserId, dbUserActiveId, dbUserId);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkUserExistance(): Promise<
    { userId: string; activeId: string; settingsId: string } | false
  > {
    const {
      data: {
        listUsers: { items },
      },
    } = (await API.graphql({
      query: listUsers,
      variables: {
        input: {},
      },
    })) as { data: { listUsers: { items: any } } };
    if (!items[0] || !items[0].id) return false;

    return {
      userId: items[0].id,
      settingsId: items[0].settings.id,
      activeId: items[0].active.id,
    };
  }

  useEffect(() => {
    (async () => {
      let authToken = getCookie("authToken");
      if (!authToken) return navigate("/auth");

      const user = await checkUserExistance();
      if (!user) return addNewUser(authToken);

      const { userId, settingsId, activeId } = user;
      return setCookie(userId, settingsId, activeId);
    })();
  }, []);
  return (
    <div className="mainContainer">
      <button onClick={signout}>Sign out</button>
    </div>
  );
}

export default Home;
