"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import SplitType from "split-type";
import { motion, useScroll } from "framer-motion";

import Awards from "../Awards/page";
import CircularText from "../circularText/CircularText";

const Info = () => {

    const { scrollYProgress } = useScroll();
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
            opacity: 0,
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
    }, []);

    return (
        <ReactLenis root>
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className=" bg-[#51C2CF] fixed w-full h-3  top-0 left-0 origin-left  "> </motion.div>
            <div className="info" ref={container}>
                <div className="col">
                    <img src="11.webp" alt=""
                        className="h-[80vh] rounded-r-xl"
                    />
                </div>
                <div className="col relative">
                    <p>
                        Kaelon is a portrait photographer who captures striking and artistic images. His work focuses on light, shadow, and movement, creating portraits that feel both modern and timeless. With a minimal and moody style, he brings out raw emotion and unique beauty in every subject.
                    </p>

                    <CircularText
                        text="XT*MANI*PORTFOLIO*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="absolute  right-0 transform translate-x-1/2 -translate-y-1/2"
                        />
                </div>

            </div>
            <Awards />

        </ReactLenis>
    );
};

export default Info;