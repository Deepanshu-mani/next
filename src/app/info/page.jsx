"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import SplitType from "split-type";

const Info = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        const text = new SplitType(".info p", {
            types: "lines",
            tagName: "div",
            lineClass: "line",
        });

        text.lines.forEach((line) => {
            const content = line.innerHTML;
            line.innerHTML = `<span>${content}</span>`;
        });

        gsap.set(".info p .line span", {
            y: 400,
            opacity:0,
            display: "block",
        });

        gsap.to(".info p .line span", {
            y: 0,
            opacity: 1,
            duration: 2,
            stagger: 0.075,
            ease: "power4.out",
            delay: 0.75,
        });

        return () => {
            text.revert();
        };
    }, []); // Fixed dependency

    return (
        <ReactLenis root>
            <div className="info" ref={container}>
                <div className="col">
                    <img src="11.jpg" alt="" 
                        className="h-[100vh]"
                    />
                </div>
                <div className="col">
                    <p>
                        Kaelon is a portrait photographer who captures striking and artistic images. His work focuses on light, shadow, and movement, creating portraits that feel both modern and timeless. With a minimal and moody style, he brings out raw emotion and unique beauty in every subject.
                    </p>
                </div>
            </div>
        </ReactLenis>
    );
};

export default Info;