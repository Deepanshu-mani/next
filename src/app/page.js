"use client";
import ReactLenis from "@studio-freight/react-lenis";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Home() {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const heroText = new SplitType(".home h1", { types: "chars" });

      gsap.set(heroText.chars, { y: 200  , opacity:0});

      gsap.to(heroText.chars, {
        y: 0,
        opacity:1,
        duration: 1,
        stagger: 0.075,
        ease: "power4.out",
        delay: 1,
      });
    }, container);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <ReactLenis root>
      <div className="home" ref={container}>
        <h1>Mani</h1>
      </div>
    </ReactLenis>
  );
}