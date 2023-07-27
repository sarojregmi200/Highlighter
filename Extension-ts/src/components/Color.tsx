import React from "react";
import { colorState } from "../types";

function Color({
  color,
  active,
  setColor,
}: {
  color: string;
  active: boolean;
  setColor: React.Dispatch<colorState>;
}): React.JSX.Element {
  const activeStyle = {
    border: `4px solid white`,
    outline: `3px solid ${color}`,
    opacity: 1,
    filter: `saturate(100%)`,
  };

  const changeColor = () => {};
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
