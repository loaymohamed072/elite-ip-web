"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#0A1E20] overflow-hidden">
      {/* Dark marble — richer presence */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: "url('/images/dark-marble.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Directional atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E20]/30 via-transparent to-[#0A1E20]/70" />
      {/* Decorative wax seal — top right, very faint */}
      <div className="absolute top-0 right-0 w-[320px] h-[320px] opacity-[0.04] pointer-events-none overflow-hidden">
        <Image
          src="/images/wax-seal.png"
          alt=""
          fill
          className="object-contain object-right-top"
          sizes="320px"
        />
      </div>

      {/* Top gold line */}
      <div className="site-container relative">
        <div className="divider-gold" />
      </div>

      <div className="site-container section-pad relative">
        <div style={{ maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
          <FadeIn>
            <p className="text-label text-[#B8A882]" style={{ marginBottom: "1.75rem" }}>Take the First Step</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display font-light leading-[1.0] text-[#E9E9DF] tracking-[-0.02em]" style={{ fontSize: "clamp(2.6rem,5.5vw,5rem)", marginBottom: "2.5rem" }}>
              Your brand cannot afford
              <br />
              <em className="italic">to be unprotected.</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              style={{ fontFamily: "var(--font-body)", maxWidth: "36rem", marginLeft: "auto", marginRight: "auto", marginBottom: "3rem", color: "rgba(233,233,223,0.50)", fontSize: "1.0625rem", lineHeight: 1.75 }}
            >
              A single consultation with Elite gives you clarity on your IP exposure, what requires immediate action, and what a strategic protection plan looks like for your specific business.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <a
                href="#consultation"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#consultation")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                Request Consultation
              </a>
              <a
                href="mailto:hello@eliteip.ae"
                className="text-label"
                style={{ color: "rgba(233,233,223,0.55)", borderBottom: "1px solid rgba(233,233,223,0.18)", paddingBottom: "2px", transition: "color 0.3s, border-color 0.3s", textDecoration: "none" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "#B8A882"; (e.target as HTMLElement).style.borderBottomColor = "#B8A882"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(233,233,223,0.55)"; (e.target as HTMLElement).style.borderBottomColor = "rgba(233,233,223,0.18)"; }}
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
