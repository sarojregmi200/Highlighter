import { useEffect } from "react";

const Popup = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return <div> hlo how are you</div>;
};

export default Popup;
