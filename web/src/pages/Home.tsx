import { API, Auth } from "aws-amplify";
import { useEffect } from "react";

import { createActive, createSettings, createUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";
import { getToken } from "../Authhandler";
import { useNavigate } from "react-router-dom";
import { Bolt } from "@mui/icons-material";
import "../styles/landingpage.css";

function Home() {
    const setCookie = async (
        userId: string,
        activeId: string,
        settingsId: string
    ) => {
        const date = new Date();
        date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();

        const authToken = (await Auth.currentSession())
            .getAccessToken()
            .getJwtToken();

        document.cookie = `authToken=${authToken};expires=${expires};path=/;`;
        document.cookie = `userId=${userId};expires=${expires};path=/;`;
        document.cookie = `activeId=${activeId};expires=${expires};path=/;`;
        document.cookie = `settingsId=${settingsId};expires=${expires};path=/;`;
    };
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
            window.location.pathname = "/";
        });
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

            setCookie(dbUserId, dbUserActiveId, dbSettingId);
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
    const authenticate = async () => {
        getToken().then((authToken) => {
            if (!authToken) return (window.location.pathname = "/auth");
            checkUserExistance().then((user) => {
                if (!user) return addNewUser(authToken);
                const { userId, settingsId, activeId } = user;
                return setCookie(userId, activeId, settingsId);
            });
        });
    };
    useEffect(() => {
        authenticate();
    }, []);
    const navigate = useNavigate();

    return (
        <div className="landingContainer">
            <div className="mainContainer">
                <div className="nav">
                    <div
                        className="nav-logo"
                        onClick={() => {
                            navigate("/home");
                        }}
                    >
                        <svg
                            width="60"
                            height="60"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="25"
                                cy="25"
                                r="25"
                                fill="url(#paint0_linear_124_30)"
                            />
                            <path
                                d="M11.2742 37.1547L10.6435 37.7024C9.94494 38.3091 10.374 39.4574 11.2992 39.4574H12.3354C12.6007 39.4574 12.8552 39.352 13.0428 39.1642L13.079 39.1279C13.4493 38.7574 13.4708 38.164 13.1284 37.7675L12.6867 37.2561C12.3251 36.8373 11.692 36.7918 11.2742 37.1547Z"
                                fill="#FFC03F"
                            />
                            <path
                                d="M15.5688 27.386C15.1498 26.9669 14.9402 26.7573 14.8674 26.5181C14.8035 26.3078 14.8106 26.0824 14.8876 25.8765C14.9753 25.6423 15.1976 25.4463 15.6421 25.0544L30.064 12.3405C32.2901 10.378 35.6626 10.5003 37.7407 12.6188V12.6188C39.7852 14.7031 39.8784 18.0106 37.9544 20.2067L32.4844 26.4503L26.9227 32.8193L24.6379 35.3405C24.444 35.5544 24.1455 35.6396 23.8679 35.5603V35.5603C23.7531 35.5275 23.6477 35.4681 23.5603 35.3869L22.4374 34.3443L19.6566 31.4737L15.5688 27.386Z"
                                fill="#FFC03F"
                            />
                            <path
                                d="M11.9746 37.0538C11.797 36.8847 11.7569 36.6167 11.8771 36.4029V36.4029C12.2782 35.69 12.6103 34.9403 12.869 34.1643L13.2683 32.9665C13.281 32.9283 13.2894 32.8888 13.2934 32.8488L13.4202 31.5815C13.5108 30.6747 13.5108 29.7611 13.4202 28.8542L13.3771 28.4237C13.3193 27.8452 13.472 27.2652 13.8073 26.7903V26.7903C14.0971 26.3797 14.6879 26.332 15.0399 26.6906L23.639 35.4536C23.7312 35.5475 23.7828 35.6739 23.7828 35.8055L23.7828 35.9373C23.7828 36.0661 23.7317 36.1895 23.6407 36.2806V36.2806C23.2735 36.6478 22.7708 36.8468 22.2518 36.8306L20.1947 36.7663L19.5818 36.7813C17.5705 36.8303 15.6033 37.3819 13.8597 38.3858V38.3858C13.6799 38.4893 13.4534 38.4622 13.3032 38.3191L11.9746 37.0538Z"
                                fill="#0C4B5C"
                            />
                            <path
                                d="M22.0434 33.8636L16.541 28.2733C16.383 28.1128 16.1217 28.1216 15.9748 28.2922L15.4843 28.8622C15.1487 29.2521 14.9491 29.7407 14.9155 30.254C14.8473 31.2985 14.5991 32.3234 14.1819 33.2833L13.9918 33.7209L13.5304 34.571C13.0923 35.3782 12.5975 36.1532 12.0496 36.8903C11.9882 36.9729 11.9987 37.0885 12.074 37.1587L13.1848 38.1956C13.2441 38.2509 13.3346 38.2555 13.3992 38.2066L13.8197 37.888C15.4211 36.6748 17.2553 35.8044 19.2079 35.331L20.5816 35.1764C21.1779 35.1094 21.7192 34.7968 22.0754 34.314C22.1769 34.1764 22.1634 33.9855 22.0434 33.8636Z"
                                fill="#0E4353"
                            />
                            <path
                                d="M20.0151 27.1585C20.0151 26.0269 20.5143 24.9529 21.3794 24.2234L31.8028 15.4335C31.9571 15.3034 32.1301 15.1973 32.3159 15.1186V15.1186C33.9538 14.4257 35.6194 16.043 34.9747 17.7006L34.9346 17.8038C34.8564 18.005 34.7441 18.1911 34.6026 18.3541L25.8765 28.4046C25.1673 29.2215 24.1644 29.7253 23.0857 29.8067L22.887 29.8217C21.3371 29.9387 20.0151 28.7127 20.0151 27.1585V27.1585Z"
                                fill="#FDD682"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_124_30"
                                    x1="23.125"
                                    y1="13.9583"
                                    x2="62.7083"
                                    y2="84.1667"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="white" />
                                    <stop offset="0.963537" stopColor="#F4D085" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="buttons">
                        <div
                            className="support"
                            onClick={() => {
                                window.open("https://www.buymeacoffee.com/sarojregmi200", "_");
                            }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.5 10.5C7.5 10.5 8.33 17.43 8.5 19C8.67 20.57 10 21 11 21H13C14.5 21 15.875 19.86 16 19C16.125 18.14 17 7 17 7"
                                    stroke="#0C4B5C"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16.5 6C16.5 3.5 14 3 12 3C10 3 9.1 3.43 8 4"
                                    stroke="#0C4B5C"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <mask
                                    id="mask0_131_67"
                                    maskUnits="userSpaceOnUse"
                                    x="5"
                                    y="5"
                                    width="14"
                                    height="4"
                                >
                                    <path
                                        d="M5 6C5 4 7 6 11.5 6C16 6 19 4 19 6V7C19 8.5 17 9 12.5 9C8 9 5 9 5 7V6Z"
                                        fill="white"
                                    />
                                </mask>
                                <g mask="url(#mask0_131_67)">
                                    <path d="M20 4H4V9H20V4Z" fill="#0C4B5C" />
                                </g>
                                <path
                                    d="M10.1249 18.15C10.0399 17.29 9.3999 11.98 9.3999 11.98C9.3999 11.98 11.3399 12.31 12.4999 11.73C13.6599 11.16 14.9799 11 14.9799 11C14.9799 11 14.3999 17.96 14.3499 18.46C14.2999 18.96 13.4499 19.3 12.9499 19.3H11.2299C10.7299 19.3 10.2099 19 10.1249 18.15Z"
                                    fill="#FF9E39"
                                />
                            </svg>
                        </div>
                        <div
                            className="button primary authenticate signout"
                            onClick={() => {
                                signout();
                            }}
                        >
                            signout
                        </div>
                    </div>
                </div>

                <div className="mainContents">
                    <div className="leftSide">
                        <div className="textContents">
                            <div className="title">Highlighter</div>
                            <div className="desc">
                                There are a lot of things that we learn everyday. Most of which
                                are very important but not for now, so we tend to pretend like
                                you will remember those things.
                                <span className="Example-highlights ">
                                    But the reality is we never remember those things,
                                </span>
                                and at the time we need those we are prone to search those
                                things again. This is why you should get a highlighter and
                                research or consume information all you want and never ever
                                forget a single thing.
                                <span className="Example-highlights exmp2">
                                    By highlighting the important things you can remember those
                                    things for longer time
                                </span>
                                and In case you forget those things you can always back track
                                those information with the built in full text search engine. Are
                                you ready to join the journey? Let’s change the way we read on
                                the web.
                            </div>
                        </div>

                        <div className="buttons">
                            <div
                                className="downloadExtension button primary"
                                onClick={() => {
                                    window.open(
                                        "https://addons.mozilla.org/en-US/firefox/addon/_highlighter/",
                                        "_"
                                    );
                                }}
                            >
                                <div className="buttonIcon">
                                    <svg
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.5 13V17C19.5 17.5304 19.2893 18.0391 18.9142 18.4142C18.5391 18.7893 18.0304 19 17.5 19H3.5C2.96957 19 2.46086 18.7893 2.08579 18.4142C1.71071 18.0391 1.5 17.5304 1.5 17V13M5.5 8L10.5 13M10.5 13L15.5 8M10.5 13V1"
                                            stroke="#665635"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                Download Extension
                            </div>
                            <div
                                className="button secondary contribute"
                                onClick={() => {
                                    window.open(
                                        "https://github.com/Thapaarchu/highlighter",
                                        "_"
                                    );
                                }}
                            >
                                <div className="buttonIcon">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                                            fill="#665635"
                                        />
                                    </svg>
                                </div>
                                Contribute
                            </div>
                        </div>
                        <div className={"goodThings"}>
                            <div className={"thing"}>
                                <Bolt />
                                <div className={"txt"}>Open Source</div>
                            </div>
                            <div className={"thing"}>
                                <Bolt />
                                <div className={"txt"}>community driven</div>
                            </div>
                            <div className={"thing"}>
                                <Bolt />
                                <div className={"txt"}>No ads</div>
                            </div>
                        </div>
                    </div>

                    <div className="rightSide">
                        <div className="mainLogo">
                            <svg
                                width="237"
                                height="237"
                                viewBox="0 0 237 237"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="118.5"
                                    cy="118.5"
                                    r="118.5"
                                    fill="url(#paint0_linear_105_23)"
                                />
                                <path
                                    d="M56.2716 173.654L42.892 185.273C42.1935 185.88 42.6225 187.028 43.5477 187.028H60.0198C60.2852 187.028 60.5397 186.923 60.7272 186.735L64.4508 183.008C64.821 182.638 64.8426 182.044 64.5002 181.648L57.6841 173.756C57.3224 173.337 56.6894 173.291 56.2716 173.654Z"
                                    fill="#FFC03F"
                                />
                                <path
                                    d="M69.2894 125.304C68.8703 124.885 68.6608 124.675 68.588 124.436C68.524 124.225 68.5311 124 68.6081 123.794C68.6958 123.56 68.9181 123.364 69.3627 122.972L145.39 55.948C150.995 51.0071 153.797 48.5366 156.925 47.6801C159.679 46.9261 162.597 47.0319 165.288 47.9833C168.346 49.0641 170.962 51.731 176.194 57.0649L181.526 62.5008C186.653 67.7273 189.217 70.3405 190.243 73.3648C191.147 76.0277 191.228 78.901 190.475 81.6106C189.621 84.6878 187.208 87.4412 182.384 92.9479L153.975 125.374L127.613 155.564L116.783 167.514C115.864 168.528 114.449 168.932 113.133 168.556C112.589 168.401 112.089 168.119 111.675 167.734L106.353 162.792L93.1713 149.186L69.2894 125.304Z"
                                    fill="#FFC03F"
                                />
                                <path
                                    d="M56.7595 175.635C55.9178 174.834 55.7275 173.563 56.2973 172.55C58.1983 169.17 59.7726 165.617 60.9988 161.939L62.9116 156.2C62.9585 156.06 62.9895 155.914 63.0043 155.767L63.8 147.81C64.1044 144.766 64.1044 141.699 63.8 138.656L63.4073 134.729C63.1331 131.986 63.857 129.237 65.4463 126.986C66.8198 125.04 69.6205 124.814 71.2887 126.514L112.049 168.05C112.486 168.495 112.73 169.094 112.73 169.718L112.73 170.343C112.73 170.953 112.488 171.538 112.057 171.97C110.316 173.71 107.933 174.654 105.473 174.577L95.7225 174.272L92.8177 174.343C83.2838 174.576 73.9597 177.19 65.6949 181.949C64.8426 182.44 63.769 182.311 63.0568 181.633L56.7595 175.635Z"
                                    fill="#0C4B5C"
                                />
                                <path
                                    d="M104.486 160.514L77.7759 133.377C77.3657 132.96 76.6868 132.983 76.3053 133.426L73.3959 136.807C71.8052 138.655 70.8589 140.971 70.6998 143.404C70.3762 148.355 69.1997 153.213 67.2224 157.763L66.3211 159.837L64.134 163.867C62.0575 167.693 59.7121 171.366 57.1154 174.86C56.8244 175.252 56.874 175.8 57.2307 176.133L62.4963 181.047C62.7772 181.309 63.206 181.331 63.5123 181.099L65.5055 179.589C73.0964 173.838 81.7903 169.713 91.0455 167.469L97.5571 166.736C100.383 166.418 102.949 164.937 104.638 162.648C105.119 161.996 105.054 161.091 104.486 160.514Z"
                                    fill="#0E4353"
                                />
                                <path
                                    d="M94.8721 128.731C94.8721 123.367 97.2383 118.277 101.339 114.819L150.746 73.1546C151.477 72.538 152.297 72.0349 153.178 71.6623C160.941 68.3776 168.836 76.0438 165.781 83.9007L165.59 84.3901C165.22 85.3434 164.687 86.2257 164.017 86.9982L122.655 134.638C119.293 138.51 114.539 140.898 109.427 141.284L108.485 141.355C101.138 141.909 94.8721 136.098 94.8721 128.731Z"
                                    fill="#FDD682"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_105_23"
                                        x1="109.612"
                                        y1="66.1625"
                                        x2="297.237"
                                        y2="398.95"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="white" />
                                        <stop offset="0.963537" stopColor="#F4D085" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
