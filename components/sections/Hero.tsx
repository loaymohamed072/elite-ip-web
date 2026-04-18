"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    // Loop handler — jumps back to loopStart instead of replaying intro
    const handleLoop = () => {
      video.currentTime = HERO_VIDEO_LOOP_START;
      video.play().catch(() => {});
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
      {/* Video background */}
      <video
        ref={videoRef}
        src="/videos/hero-full.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center"
        muted
        playsInline
        preload="auto"
      />

      {/* Multi-layer overlay: keep it readable without killing the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E20]/60 via-[#0A1E20]/30 to-[#0A1E20]/80 z-10" />
      <div className="absolute inset-0 bg-[#0A1E20]/20 z-10" />

      {/* Hero content — positioned in lower third to avoid logo overlap */}
      <AnimatePresence>
        {contentVisible && (
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-[12vh] sm:pb-[14vh]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
              <div className="max-w-2xl">
                {/* Label */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                  className="text-label text-[#B8A882] mb-6"
                >
                  Dubai · Intellectual Property & Corporate Law
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[1.0] text-[#E9E9DF] mb-6 tracking-[-0.02em]"
                >
                  The firm brands call
                  <br />
                  <em className="italic text-[#B8A882] not-italic font-normal" style={{ fontStyle: "italic" }}>
                    when the stakes are real.
                  </em>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-[#E9E9DF]/65 text-base md:text-lg leading-relaxed max-w-xl mb-10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Elite advises established and emerging businesses on intellectual property, trademark, and corporate legal strategy — with the commercial fluency that premium brands demand.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={scrollToConsult}
                    className="text-label text-[#0A1E20] bg-[#E9E9DF] px-7 py-4 hover:bg-[#B8A882] transition-all duration-300 cursor-pointer"
                  >
                    Request Consultation
                  </button>
                  <button
                    onClick={scrollToServices}
                    className="text-label text-[#E9E9DF] border border-[#E9E9DF]/30 px-7 py-4 hover:border-[#B8A882] hover:text-[#B8A882] transition-all duration-300 cursor-pointer"
                  >
                    Explore Services
                  </button>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2"
              >
                <span className="text-label text-[#E9E9DF]/30" style={{ writingMode: "vertical-rl" }}>
                  Scroll
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-[#B8A882]/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
