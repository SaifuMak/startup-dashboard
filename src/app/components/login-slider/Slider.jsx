"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "swiper/css/effect-fade";
import './Slider.css';


import { LoginSliderData } from "@/app/data/LoginSliderData";

// Register
gsap.registerPlugin(SplitText, useGSAP);

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const titleRef = useRef([]);
  const subtitleRef = useRef([]);
  const buttonRef = useRef([]);
  const containerRef = useRef();

  useGSAP(() => {
    const title = titleRef.current[currentIndex];
    const sub = subtitleRef.current[currentIndex];
    const btn = buttonRef.current[currentIndex];

    const split = new SplitText(title, {
      type: "words, chars",
    });

    const tl = gsap.timeline({
      delay: 0.9,
    });

    tl.to(containerRef.current,
      { opacity: 1 });

    tl.from(split.chars, {
      y: 40,
      opacity: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    });

    tl.from(sub, { y: 30, opacity: 0, duration: 0.8 });
    // tl.from(btn, { y: 20, opacity: 0, duration: 0.4 });
    return () => split.revert();
  }, [currentIndex]);

  return (
    <Swiper
      effect={"fade"}
      spaceBetween={0}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      speed={1500}
      allowTouchMove={false}
      modules={[EffectFade, Autoplay]}
      onSlideChange={(s) => setCurrentIndex(s.realIndex)}
      ref={containerRef}
      className="opacity-0"
    >
      {LoginSliderData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative  min-h-[100vh] w-full overflow-hidden">

            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center  lg:max-w-xl xl:max-w-3xl px-4 text-white">
                <h1
                  ref={(el) => (titleRef.current[index] = el)}
                  className="text-3xl md:text-4xl xl:text-5xl font-bold mb-5"
                >
                  {slide.title}
                </h1>

                <p
                  ref={(el) => (subtitleRef.current[index] = el)}
                  className="text-base xl:text-lg mb-3 xl:mb-5"
                >
                  {slide.subtitle}
                </p>

                {/* <button
                  ref={(el) => (buttonRef.current[index] = el)}
                  className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  {slide.cta.title}
                </button> */}
              </div>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
