import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "../styles/landingpage.css";
function Landing() {
  useEffect(() => {});
  return (
    <div className="landingContainer">
      <motion.div
        className="animationContainer"
        animate={{ opacity: [1, 1, 1, 0] }}
        transition={{ duration: 2 }}
      >
        <div className="logo">
          <img src="/logo.png" />
        </div>
      </motion.div>
    </div>
  );
}

export default Landing;
