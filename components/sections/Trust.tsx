import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const reasons = [
  {
    title: "Licensed in the UAE",
    body: "Elite operates under full UAE legal licensing, with deep experience navigating the UAE Ministry of Economy IP registration system and local court proceedings.",
  },
  {
    title: "Senior Counsel on Every Matter",
    body: "No hand-offs to junior associates. Every client engagement is led by a qualified IP or corporate lawyer with direct accountability.",
  },
  {
    title: "Commercial Thinking First",
    body: "We measure success by business outcomes — not billable hours. Our advice is shaped by what genuinely protects and advances your commercial interests.",
  },
  {
    title: "Response in Hours",
    body: "In IP and brand protection, timing matters enormously. Elite commits to same-day responses for urgent matters and 4-hour acknowledgment for all inquiries.",
  },
  {
    title: "Absolute Confidentiality",
    body: "Every matter handled by Elite is treated with complete discretion. Client information and commercial strategies are never discussed or referenced outside of the engagement.",
  },
  {
    title: "Built for Premium Brands",
    body: "We do not operate a volume practice. Elite works with a focused roster of clients — which means you receive the attention, expertise, and strategic thinking your brand deserves.",
  },
];

export default function Trust() {
  return (
    <section className="relative bg-[#132D30] overflow-hidden">
      {/* Marble texture — more presence than before */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "url('/images/dark-marble.webp')",
          backgroundSize: "cover",
        }}
      />

      {/* Header + reasons grid — reduced bottom padding to flow into the skyline */}
      <div className="site-container section-pad-trust relative">
        {/* Header */}
        <div className="header-gap-lg" style={{ textAlign: "center", maxWidth: "48rem", marginLeft: "auto", marginRight: "auto" }}>
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Why Elite</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display font-light text-[#E9E9DF]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              The standard you should
              <br />
              <em className="italic">expect from your legal firm.</em>
            </h2>
          </FadeIn>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.07}>
              <div className="group">
                <div className="flex items-start gap-4">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#B8A882] shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-[#E9E9DF] mb-3 group-hover:text-[#B8A882] transition-colors duration-300">
                      {r.title}
                    </h3>
                    <p className="text-sm text-[#E9E9DF]/45 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {r.body}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Dubai skyline — full-bleed, cinematic, editorial text */}
      <FadeIn direction="none">
        <div className="relative overflow-hidden w-full" style={{ height: "clamp(280px, 32vw, 460px)" }}>
          <Image
            src="/images/dubai-skyline.webp"
            alt="Dubai — Elite IP Home"
            fill
            className="object-cover object-center"
            style={{ opacity: 0.48 }}
            sizes="100vw"
          />
          {/* Top fade from section bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#132D30]/80 via-transparent to-[#132D30]/60" />
          {/* Subtle side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#132D30]/40 via-transparent to-[#132D30]/30" />

          {/* Editorial text — exactly centered horizontally and vertically */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <p className="text-label text-[#B8A882]/70 mb-3">Based in Dubai</p>
            <p className="font-display font-light text-[#E9E9DF]" style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", letterSpacing: "-0.02em", lineHeight: 1.0 }}>
              Serving the Gulf Region
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Bottom section gap — prevents visual collision with FinalCTA */}
      <div style={{ height: "4rem", background: "linear-gradient(to bottom, #132D30, #0A1E20)" }} />
    </section>
  );
}
