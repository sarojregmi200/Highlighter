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
  const changeColor = () => {};
  return (
    <div
      className={active ? "color active" : "color"}
      onClick={changeColor}
      style={{ background: color }}
    ></div>
  );
}

export default Color;
