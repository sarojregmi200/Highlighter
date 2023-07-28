import React from "react";
import { colorState } from "../../types";
import { globalState } from "../../background/DataStore";

function Color({
  color,
  active,
  setColor,
}: {
  color: string;
  active: boolean;
  setColor: React.Dispatch<React.SetStateAction<colorState>>;
}): React.JSX.Element {
  const activeStyle = {
    border: `4px solid white`,
    outline: `3px solid ${color}`,
    opacity: 1,
    filter: `saturate(100%)`,
  };

  const changeColor = () => {
    // updating the global state
    chrome.runtime.sendMessage({ msg: "changeActiveColor", color });
    setColor((prev) => {
      return {
        ...prev,
        active: color,
      };
    });
  };
  return (
    <div
      className={active ? "color active" : "color"}
      onClick={changeColor}
      style={
        active ? { ...activeStyle, background: color } : { background: color }
      }
    ></div>
  );
}

export default Color;
