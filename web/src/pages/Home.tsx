import { useContext, useEffect } from "react";
import Context from "../Context";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id) {
      navigate("/auth/login");
    }
  }, [user]);
  return <div>Home</div>;
}

export default Home;
