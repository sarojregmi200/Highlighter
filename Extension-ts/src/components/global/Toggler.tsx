import React from "react";
import { toggleState } from "../../types";

function Toggler({
  type,
  state,
  sideText,
}: {
  type: string;
  state: {
    state: toggleState;
    setState: React.Dispatch<React.SetStateAction<toggleState>>;
  };
  sideText: string;
}) {
  return (
    <div className="togglerContainer">
      <div className="mainTxt">{sideText}</div>
      <div
        className={
          state ? "toggleBtn tglbtn-active" : "toggleBtn tglbtn-inactive"
        }
      >
        <div className="knob"></div>
      </div>
    </div>
  );
}

export default Toggler;
