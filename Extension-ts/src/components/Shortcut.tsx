import React from "react";

function Shortcut({
  shortcut,
  desc,
}: {
  shortcut: string;
  desc: string;
}): React.JSX.Element {
  return (
    <div className="shortcut">
      <div className="key">{shortcut}</div>
      <div className="description">{desc}</div>
    </div>
  );
}

export default Shortcut;
