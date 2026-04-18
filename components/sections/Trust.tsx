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
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/images/dark-marble.png')",
          backgroundSize: "cover",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Why Elite</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
              The standard you should
              <br />
              <em className="italic">expect from your legal firm.</em>
            </h2>
          </FadeIn>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-24">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.07}>
              <div className="group">
                <div className="flex items-start gap-4">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#B8A882] shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-[#E9E9DF] mb-2 group-hover:text-[#B8A882] transition-colors duration-300">
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

        {/* Dubai visual anchor */}
        <FadeIn direction="none">
          <div className="relative overflow-hidden h-[260px] md:h-[320px]">
            <Image
              src="/images/dubai-skyline.png"
              alt="Dubai — Elite IP Home"
              fill
              className="object-cover object-center opacity-35"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#132D30] via-transparent to-[#132D30]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-label text-[#B8A882] mb-4">Based in Dubai</p>
                <p className="font-display text-3xl md:text-5xl font-light text-[#E9E9DF] tracking-[-0.02em]">
                  Serving the Gulf Region
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
