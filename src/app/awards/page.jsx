"use client";
import { useEffect, useRef } from "react";
import "./Awards.css";
import { awards } from "./data";
import gsap from "gsap";
import { Lenis } from "@studio-freight/react-lenis";

const POSITIONS = {
  BOTTOM: 0,
  MIDDLE: -80,
  TOP: -160,
};

const Awards = () => {
  const awardsListRef = useRef(null);
  const awardPreviewRef = useRef(null);

  useEffect(() => {
    const awardsList = awardsListRef.current;
    const awardPreview = awardPreviewRef.current;
    if (!awardsList || !awardPreview) return;

    // Clear existing awards properly to prevent duplication
    while (awardsList.firstChild) {
      awardsList.removeChild(awardsList.firstChild);
    }

    // Populate awards list
    awards.forEach((award, index) => {
      const awardElement = document.createElement("div");
      awardElement.className = "award";
      awardElement.innerHTML = `
        <div class="award-wrapper">
          <div class="award-name">
            <h1>${award.name}</h1>
            <h1>${award.type}</h1>
          </div>
          <div class="award-project">
            <h1>${award.project}</h1>
            <h1>${award.label}</h1>
          </div>        
          <div class="award-name">
            <h1>${award.name}</h1>
            <h1>${award.type}</h1>
          </div>
        </div>
      `;
      awardsList.appendChild(awardElement);
    });

    const awardsElements = awardsList.querySelectorAll(".award");
    let activeAward = null;
    let lastMousePosition = { x: 0, y: 0 };
    let mouseTimeout = null;
    let ticking = false;

    // Animate preview images
    const animatePreview = () => {
      const awardsListRect = awardsList.getBoundingClientRect();
      const isOutside =
        lastMousePosition.x < awardsListRect.left ||
        lastMousePosition.x > awardsListRect.right ||
        lastMousePosition.y < awardsListRect.top ||
        lastMousePosition.y > awardsListRect.bottom;

      if (isOutside) {
        const previewImages = awardPreview.querySelectorAll("img");
        previewImages.forEach((img) => {
          gsap.to(img, {
            scale: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => img.remove(),
          });
        });
      }
    };

    // Update awards position and preview
    const updateAwards = () => {
      animatePreview();

      awardsElements.forEach((award, index) => {
        const rect = award.getBoundingClientRect();
        const wrapper = award.querySelector(".award-wrapper");
        const isMouseOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom;

        if (isMouseOver && award !== activeAward) {
          activeAward = award;
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: "power2.out",
          });
        } else if (!isMouseOver && award === activeAward) {
          activeAward = null;
          gsap.to(wrapper, {
            y: lastMousePosition.y < rect.top + rect.height / 2 ? POSITIONS.TOP : POSITIONS.BOTTOM,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });

      ticking = false;
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      lastMousePosition.x = e.clientX;
      lastMousePosition.y = e.clientY;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const images = awardPreview.querySelectorAll("img");
        if (images.length > 1) {
          const lastImage = images[images.length - 1];
          images.forEach((img) => {
            if (img !== lastImage) {
              gsap.to(img, {
                scale: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => img.remove(),
              });
            }
          });
        }
      }, 2000);

      if (!ticking) {
        requestAnimationFrame(updateAwards);
        ticking = true;
      }
    };

    // Add mouseenter/mouseleave handlers for image previews
    awardsElements.forEach((award, index) => {
      award.addEventListener("mouseenter", (e) => {
        activeAward = award;
        const wrapper = award.querySelector(".award-wrapper");
        gsap.to(wrapper, {
          y: POSITIONS.MIDDLE,
          duration: 0.4,
          ease: "power2.out",
        });

        const img = document.createElement("img");
        img.src = `/assets/img${index + 1}.webp`;
        img.style.position = "absolute";
        img.style.top = "0";
        img.style.left = "0";
        img.style.scale = "0";
        img.style.zIndex = Date.now();
        awardPreview.appendChild(img);

        gsap.to(img, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      award.addEventListener("mouseleave", (e) => {
        activeAward = null;
        const rect = award.getBoundingClientRect();
        const wrapper = award.querySelector(".award-wrapper");
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;

        gsap.to(wrapper, {
          y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateAwards);
        ticking = true;
      }
    }, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateAwards);
      clearTimeout(mouseTimeout);
      awardsElements.forEach((award) => {
        award.removeEventListener("mouseenter", () => {});
        award.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <Lenis root>
      <div>
        <section className="awards">
          <p className="heading">Recognition and Awards</p>
          <div className="awards-list" ref={awardsListRef}></div>
        </section>
        <div className="awards-preview" ref={awardPreviewRef}></div>
      </div>
    </Lenis>
  );
};

export default Awards;