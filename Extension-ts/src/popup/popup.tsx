import React from "react";
import "./popup.css";
import { Title } from "../components";

const Popup = () => {
  return (
    <div className="mainContainer">
      <div className="shortcutContainer">
        <Title title="Keyboard Shortcuts" icon={true} />
      </div>
    </div>
  );
};

export default Popup;
