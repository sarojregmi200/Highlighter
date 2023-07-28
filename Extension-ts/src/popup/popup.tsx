import React, { useState } from "react";
import { Title, Shortcut, Color } from "../components";
import { colorState } from "../types";
  
// keyboard shortcuts
const shortcuts = [
  {
    shortcut: "Ctrl + Alt + H",
    desc: "Activate the highlighter",
  },
  {
    shortcut: "Ctrl + Alt + K",
    desc: "Search Content",
  },
  {
    shortcut: "Ctrl + Alt + C",
    desc: "Switch highlight color",
  },
  {
    shortcut: "Ctrl + Alt + T",
    desc: "Switch topic",
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

  return (
    <div className="mainContainer">
      <div className="shortcutContainer">
        <Title title="Keyboard Shortcuts" icon={true} />
      </div>

      <div className="shortcuts">
        {shortcuts.map(({ shortcut, desc }, index) => {
          return <Shortcut shortcut={shortcut} desc={desc} key={index} />;
        })}
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
    </div>
  );
};

export default Popup;
