import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div>
      Landing
      <NavLink to={"/home"}>Go to home</NavLink>
    </div>
  );
}

export default Landing;
