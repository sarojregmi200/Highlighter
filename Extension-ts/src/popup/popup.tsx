import React, { useEffect, useState } from "react";
import { Title, Shortcut, Color, Toggler } from "../components";
import { colorState, toggleState } from "../types";

// keyboard shortcuts
const shortcuts = [
  {
    shortcut: "Ctrl + Alt + A",
    desc: "Activate the highlighter",
  },
  {
    shortcut: "Ctrl + Space",
    desc: "Search Content",
  },
  {
    shortcut: "Ctrl + Shift + Space",
    desc: "Switch highlight color",
  },
  {
    shortcut: "Ctrl + Alt + Space",
    desc: "Switch topic",
  },
  {
    shortcut: "Ctrl + Alt + P",
    desc: "Activate / Deactivate the pen",
  },
];

const Popup = () => {
  const [colors, setColors]: [
    colors: colorState,
    setColors: React.Dispatch<React.SetStateAction<colorState>>
  ] = useState<colorState>({
    all: ["#8CFF32", "#E9FF32", "#FF9C35", "#AEE2FF", "#E90064"],
    active: "#8CFF32",
  });
  const [pen, setPen]: [
    colors: toggleState,
    setColors: React.Dispatch<React.SetStateAction<toggleState>>
  ] = useState<toggleState>({
    status: true,
  });
  const [background, setbackground]: [
    colors: toggleState,
    setColors: React.Dispatch<React.SetStateAction<toggleState>>
  ] = useState<toggleState>({
    status: true,
  });
  const [underline, setunderline]: [
    colors: toggleState,
    setColors: React.Dispatch<React.SetStateAction<toggleState>>
  ] = useState<toggleState>({
    status: true,
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ msg: "getAllColors" }).then((res) => {
      setColors((prev) => {
        return {
          ...prev,
          all: [...res.colors],
        };
      });
    });
    chrome.runtime.sendMessage({ msg: "getGlobalState" }).then((res) => {
      const globalState = res.state;
      setPen({ status: globalState.penState });
      setbackground({ status: globalState.backgroundState });
      setunderline({ status: globalState.underlineState });
      setColors((prev) => {
        return {
          ...prev,
          active: globalState.activeColor,
        };
      });
    });
  }, []);

  const authenticated = false;
  const siteUrl = 

  return (
    <div className="mainContainer">
      {authenticated ? (
        <>
          <div className="userModes">
            <div className="mode">
              <Title title="Pen Mode" icon={true} />
              <Toggler
                type={"pen"}
                state={{ state: pen, setState: setPen }}
                sideText={"Highlighter"}
              />
            </div>
            <div className="mode">
              <Title title="Highlight style mode" icon={true} />
              <Toggler
                type={"background"}
                state={{ state: background, setState: setbackground }}
                sideText={"Activate Background"}
              />
              <Toggler
                type={"underline"}
                state={{ state: underline, setState: setunderline }}
                sideText={"Activate Underline"}
              />
            </div>
          </div>

          <div className="colorsContainer">
            <Title title="Colors" icon={true} />
            <div className="colors">
              {colors.all.map((color, index) => {
                return (
                  <Color
                    active={color === colors.active}
                    color={color}
                    key={index}
                    setColor={setColors}
                  ></Color>
                );
              })}
            </div>
          </div>

          <div className="shortcutContainer">
            <Title title="Keyboard Shortcuts" icon={true} />

            <div className="shortcuts">
              {shortcuts.map(({ shortcut, desc }, index) => {
                return <Shortcut shortcut={shortcut} desc={desc} key={index} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="authContainer">
          <div className="logo-auth">
            <img src="./logo.png" alt="logoImg" />
          </div>
          <div className="auth-txt">
            <div className="title-auth">Highlighter</div>
            <div className="desc-auth">
              Learn everything and forget nothing. <br /> Highlight the
              important stuff and let us remember it for you.
            </div>
          </div>
          <div className="auth-buttons">
            <div className="cta-ignite button-auth" onClick={()=>{window.open(loginUrl)}}>Ignite your Learning</div>
            <div className="secondary-btn button-auth" onClick={()=>{window.open(siteUrl)}}>Learn More</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
