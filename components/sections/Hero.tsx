"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SESSION_KEY = "eliteHeroIntroSeen";
// Texture loop starts here — logo intro occupies 0–4s
const HERO_VIDEO_LOOP_START = 4.0;
// Set to a specific second (e.g. 29.5) to loop before the file ends.
// Leave as Infinity to let the video end naturally then jump back.
const HERO_VIDEO_LOOP_END = Infinity;
// Delay before hero text appears on first visit (lets logo clear)
const INTRO_TEXT_DELAY_MS = 3500;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopMaskRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const introSeen = sessionStorage.getItem(SESSION_KEY) === "1";
    const video = videoRef.current;
    if (!video) return;

    // Show hero text: immediately on return visits, delayed on first
    if (introSeen) {
      setContentVisible(true);
    } else {
      setTimeout(() => setContentVisible(true), INTRO_TEXT_DELAY_MS);
    }

    // Loop handler — brief overlay pulse masks the frame seam at reset
    const handleLoop = () => {
      const mask = loopMaskRef.current;
      if (mask) {
        mask.style.transition = "opacity 180ms ease-in";
        mask.style.opacity = "1";
        video.currentTime = HERO_VIDEO_LOOP_START;
        video.play().catch(() => {});
        setTimeout(() => {
          mask.style.transition = "opacity 320ms ease-out";
          mask.style.opacity = "0";
        }, 180);
      } else {
        video.currentTime = HERO_VIDEO_LOOP_START;
        video.play().catch(() => {});
      }
    };

    // timeupdate: fires when LOOP_END is a real finite value
    const handleTimeUpdate = () => {
      if (
        HERO_VIDEO_LOOP_END !== Infinity &&
        video.currentTime >= HERO_VIDEO_LOOP_END
      ) {
        handleLoop();
      }
    };

    if (introSeen) {
      // Skip intro — seek directly to loop segment once metadata is ready
      const onMeta = () => {
        video.currentTime = HERO_VIDEO_LOOP_START;
        video.play().catch(() => {});
      };
      video.addEventListener("loadedmetadata", onMeta, { once: true });
    } else {
      // First visit — play from 0, mark seen once past the intro threshold
      const onTimeUpdate = () => {
        if (video.currentTime >= HERO_VIDEO_LOOP_START) {
          sessionStorage.setItem(SESSION_KEY, "1");
        }
      };
      video.addEventListener("timeupdate", onTimeUpdate);

      // Clean up this one separately
      video.addEventListener("ended", () =>
        video.removeEventListener("timeupdate", onTimeUpdate)
      );
    }

    video.addEventListener("ended", handleLoop);
    video.addEventListener("timeupdate", handleTimeUpdate);

    video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", handleLoop);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const scrollToConsult = () => {
    document.querySelector("#consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Mobile video — simple loop, no intro logic */}
      <video
        src="/videos/mobile-hero.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />
      {/* Desktop video — full intro + loop logic */}
      <video
        ref={videoRef}
        src="/videos/hero-full.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        muted
        playsInline
        preload="auto"
      />

      {/* Loop seam mask — imperceptible pulse at video reset */}
      <div
        ref={loopMaskRef}
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ backgroundColor: "#0A1E20", opacity: 0 }}
      />

      {/* Cinematic overlays — directional, not flat */}
      {/* Left-weighted: dark on left for text readability, lets video breathe on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E20]/85 via-[#0A1E20]/40 to-[#0A1E20]/5 z-10" />
      {/* Bottom: seals the lower text zone */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E20]/95 via-[#0A1E20]/20 to-transparent z-10" />
      {/* Top vignette — preserves header legibility */}
      <div className="absolute top-0 left-0 right-0 h-[28%] bg-gradient-to-b from-[#0A1E20]/70 to-transparent z-10" />

      {/* Editorial left accent rule */}
      <div className="absolute left-6 md:left-10 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-[#B8A882]/18 to-transparent z-20 hidden lg:block" />

      <AnimatePresence>
        {contentVisible && (
          <div className="absolute inset-0 z-20 flex flex-col justify-end" style={{ paddingBottom: "10vh" }}>
            <div className="site-container w-full">

              {/* Main content column — left-anchored, controlled text measure */}
              <div className="max-w-[540px]">

                {/* Eyebrow — logo on mobile, text on desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                  className="mb-9"
                >
                  {/* Mobile: logo */}
                  <Image
                    src="/images/elite-logo-nobg.png"
                    alt="Elite IP"
                    width={320}
                    height={120}
                    className="w-[220px] h-auto md:hidden"
                    priority
                  />
                  {/* Desktop: original eyebrow text */}
                  <div className="hidden md:flex items-center gap-3">
                    <span className="w-5 h-px bg-[#B8A882]/50 shrink-0" />
                    <p className="text-label text-[#B8A882]">
                      Dubai · Intellectual Property & Corporate Law
                    </p>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="hero-headline font-display text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[1.0] text-[#E9E9DF] mb-9 tracking-[-0.02em]"
                >
                  The firm brands call
                  <br />
                  <em style={{ fontStyle: "italic", color: "#B8A882" }}>
                    when the stakes are real.
                  </em>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="hero-paragraph text-[#E9E9DF]/60 text-base md:text-[1.0625rem] leading-relaxed max-w-[460px] mb-16"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Elite advises established and emerging businesses on intellectual property, trademark, and corporate legal strategy — with the commercial fluency that premium brands demand.
                </motion.p>

                {/* CTAs — primary dominant, secondary recedes on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button onClick={scrollToConsult} className="btn-primary">
                    Request Consultation
                  </button>
                  <button onClick={scrollToServices} className="btn-ghost-secondary">
                    Explore Services
                  </button>
                </motion.div>
              </div>

            </div>

            {/* Right decorative column — visible only on xl+ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1.4 }}
              className="absolute right-10 bottom-[14vh] hidden xl:flex flex-col items-center gap-3"
            >
              <div className="w-px h-14 bg-gradient-to-b from-[#B8A882]/28 to-transparent" />
              <span
                className="text-label text-[#E9E9DF]/20"
                style={{ writingMode: "vertical-rl", letterSpacing: "0.22em" }}
              >
                Dubai · GCC
              </span>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-7 right-8 md:right-12 flex flex-col items-center gap-2"
            >
              <span className="text-label text-[#E9E9DF]/25" style={{ writingMode: "vertical-rl" }}>
                Scroll
              </span>
              <div className="w-px h-10 bg-gradient-to-b from-[#B8A882]/35 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
