"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#0A1E20] overflow-hidden">
      {/* Background image with deep overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/images/dark-marble.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E20]/40 via-transparent to-[#0A1E20]/60" />

      {/* Top gold line */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="divider-gold" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-8">Take the First Step</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-light leading-[1.0] text-[#E9E9DF] tracking-[-0.02em] mb-8">
              Your brand cannot afford
              <br />
              <em className="italic">to be unprotected.</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#E9E9DF]/50 text-[1.0625rem] leading-relaxed mb-12 max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              A single consultation with Elite gives you clarity on your IP exposure, what requires immediate action, and what a strategic protection plan looks like for your specific business.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="#consultation"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#consultation")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-label text-[#0A1E20] bg-[#E9E9DF] px-9 py-4 hover:bg-[#B8A882] transition-all duration-300 cursor-pointer inline-block"
              >
                Request Consultation
              </a>
              <a
                href="mailto:hello@eliteip.ae"
                className="text-label text-[#E9E9DF]/60 border-b border-[#E9E9DF]/20 pb-px hover:text-[#B8A882] hover:border-[#B8A882] transition-all duration-300"
              >
                hello@eliteip.ae
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
