import React, { useEffect, useState } from "react";
import { Title, Shortcut, Color } from "../components";
import { colorState } from "../types";
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
      setColors((prev) => {
        return {
          ...prev,
          active: res.state.activeColor,
        };
      });
    });
  }, []);
  return (
    <div className="mainContainer">
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
      </div>

      <div className="shortcuts">
        {shortcuts.map(({ shortcut, desc }, index) => {
          return <Shortcut shortcut={shortcut} desc={desc} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Popup;
