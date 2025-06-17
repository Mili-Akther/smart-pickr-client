import React from "react";
import "./GradientText.css"; 

export default function GradientText({
  children,
  className = "",
  colors = ["#40a2ff", "#000000", "#444444"],
  animationSpeed = 8,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={`text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text gradient-animate ${className}`}
      style={gradientStyle}
    >
      {children}
    </div>
  );
}
