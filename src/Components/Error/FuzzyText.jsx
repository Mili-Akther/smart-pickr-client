import React from "react";
import { motion } from "framer-motion";

const FuzzyText = ({
  children,
  baseIntensity = 0.2,
  hoverIntensity = 0.6,
  enableHover = true,
}) => {
  return (
    <motion.span
      initial={{ filter: `blur(${baseIntensity}rem)` }}
      whileHover={enableHover ? { filter: `blur(${hoverIntensity}rem)` } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="text-6xl md:text-7xl font-extrabold text-white tracking-wider select-none"
    >
      {children}
    </motion.span>
  );
};

export default FuzzyText;
