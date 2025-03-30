"use client"
import ReactLenis from "@studio-freight/react-lenis";
import { motion, useScroll } from "framer-motion";
const Projects = () => {
    const { scrollYProgress } = useScroll();
    return (
        <ReactLenis root>
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className=" bg-[#15F095] fixed w-full h-3  top-0 left-0 origin-left  "> </motion.div>
            <div className="projects">
                <div className="images">
                    <img src="2.webp" alt="" />

                    <img src="1.webp" alt="" />
                    <img src="3.webp" alt="" />
                    <img src="4.webp" alt="" />
                    <img src="5.webp" alt="" />
                    <img src="6.webp" alt="" />
                    <img src="7.webp" alt="" />
                    <img src="8.webp" alt="" />
                    <img src="9.webp" alt="" />
                    <img src="12.webp" alt="" />


                </div>

            </div>
        </ReactLenis>

    )
}

export default Projects; 