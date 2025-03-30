"use client";
import ReactLenis from "@studio-freight/react-lenis";
import Home from "./home/Home";
import { useRef } from "react";

export default function MainHome() {
  const container = useRef(null);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <ReactLenis root>
      <div className="home" ref={container}>
        <Home
          text="M A N I"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[2000%] mb-8"
        />
      </div>
    </ReactLenis>
  );
}