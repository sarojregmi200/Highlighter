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
  const changeState = () => {
    state.setState({ status: !state.state.status });

    switch (type) {
      case "pen":
        browser.runtime.sendMessage({
          msg: "changePenState",
          state: !state.state.status,
        });
        break;
      case "background":
        browser.runtime.sendMessage({
          msg: "changeBackgroundState",
          state: !state.state.status,
        });
        break;
      case "underline":
        browser.runtime.sendMessage({
          msg: "changeUnderlineState",
          state: !state.state.status,
        });
        break;
    }
  };
  return (
    <div className="togglerContainer" onClick={changeState}>
      <div className="mainTxt">{sideText}</div>
      <div
        className={
          state.state.status
            ? "toggleBtn tglbtn-active"
            : "toggleBtn tglbtn-inactive"
        }
      >
        <div className="knob"></div>
      </div>
    </div>
  );
}

export default Toggler;
