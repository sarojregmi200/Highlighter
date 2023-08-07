import { useEffect } from "react";
import { motion } from "framer-motion";

import "../styles/landingpage.css";
import { Bolt } from "@mui/icons-material";
function Landing() {
  useEffect(() => {});
  return (
    <div className="landingContainer">
      <motion.div
        className="animationContainer"
        animate={{ opacity: [1, 1, 1, 0] }}
        transition={{ duration: 2 }}
      >
        <div className="logo">
          <img src="/logo.png" />
        </div>
      </motion.div>

      <div className="mainContainer">
        <div className="nav">
          <div className="nav-logo">
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
                  <stop stop-color="white" />
                  <stop offset="0.963537" stop-color="#F4D085" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="buttons">
            <div className="button primary authenticate">Authenticate</div>
          </div>
        </div>

        <div className="mainContents">
          <div className="leftSide">
            <div className="textContents">
              <div className="title">Highlighter</div>
              <div className="desc">
                There are a lot of things that we learn everyday. Most of which
                are very important but not for now, so we tend to pretend like
                you will remember those things. But the reality is we never
                remember those things, and at the time we need those we are
                prone to search those things again. This is why you should get a
                highlighter and research or consume information all you want and
                never ever forget a single thing. By highlighting the important
                things you can remember those things for longer and In case you
                forget those things you can always back track those information
                with the built in full text search engine. Are you ready to join
                the journey? Let’s change the way we read on the web.
              </div>
            </div>

            <div className="buttons">
              <div className="downloadExtension button primary">
                Download Extension
              </div>
              <div className="button secondary contribute">Contribute</div>
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
                    <stop stop-color="white" />
                    <stop offset="0.963537" stop-color="#F4D085" />
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

export default Landing;
