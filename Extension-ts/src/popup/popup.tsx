import React from "react";
import { Title, Shortcut } from "../components";

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
    </div>
  );
};

export default Popup;
