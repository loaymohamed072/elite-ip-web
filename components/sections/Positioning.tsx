import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const pillars = [
  {
    number: "01",
    title: "Commercially Fluent",
    body: "We understand what your brand represents in the market — and what losing control of it would cost. Our counsel is shaped by business reality, not just legal theory.",
  },
  {
    number: "02",
    title: "Regionally Grounded",
    body: "Built in Dubai, licensed in the UAE, and experienced across GCC jurisdictions. We navigate local regulatory structures with precision and speed.",
  },
  {
    number: "03",
    title: "Discretion as Standard",
    body: "Our clients operate in sensitive industries where confidentiality is not optional. Every engagement is handled with the discretion that high-value businesses require.",
  },
  {
    number: "04",
    title: "Strategic, Not Reactive",
    body: "Elite works ahead of the problem — designing IP protection strategies that align with your growth plans, not just your current exposure.",
  },
];

export default function Positioning() {
  return (
    <section className="relative bg-[#132D30] overflow-hidden">
      {/* Marble atmosphere — full section, layered */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "url('/images/dark-marble.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Paper warmth — lower half only */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "url('/images/ivory-paper.webp')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      />

      <div className="site-container section-pad">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 header-gap-lg">
          <FadeIn>
            <div>
              <p className="text-label text-[#B8A882] mb-6">Why Elite</p>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
                The legal counsel your brand
                <br />
                <em className="italic">was built to need.</em>
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col justify-end">
              <p className="text-[#E9E9DF]/55 leading-relaxed text-[1.0625rem]" style={{ fontFamily: "var(--font-body)" }}>
                Premium brands deserve IP counsel that matches their standard. Not a generalist firm. Not a volume practice. A focused, commercial partner for businesses where brand equity is the core of what they have built.
              </p>
              <div className="mt-8">
                <span className="accent-line" />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 header-gap-lg">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.number} delay={i * 0.08}>
              <div className="group border-t border-[#B8A882]/20 pt-6 hover:border-[#B8A882]/50 transition-colors duration-500">
                <p className="text-label text-[#B8A882]/50 mb-4">{pillar.number}</p>
                <h3 className="font-display text-xl text-[#E9E9DF] mb-4 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#E9E9DF]/50 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {pillar.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Visual anchor: editorial quote block */}
        <FadeIn direction="none">
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#0A1E20]/50 border border-[#B8A882]/15 p-8 md:p-14 overflow-hidden">
            {/* Faint ivory paper texture inside the quote block */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "url('/images/ivory-paper.webp')", backgroundSize: "cover" }}
            />
            {/* Gold accent on the left edge */}
            <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#B8A882]/40 to-transparent" />
            <div className="relative shrink-0 w-32 h-32 md:w-44 md:h-44 overflow-hidden border border-[#B8A882]/15">
              <Image
                src="/images/gold-seal.webp"
                alt="Elite IP — Premium Legal Authority"
                fill
                className="object-cover opacity-90"
                sizes="176px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A1E20]/30" />
            </div>
            <div className="relative">
              <span className="accent-line mb-6 block" />
              <p className="font-display text-2xl md:text-[1.875rem] font-light text-[#E9E9DF] mb-4 leading-snug tracking-[-0.01em]">
                "Protecting what you have built is not a formality — it is a strategic asset."
              </p>
              <p className="text-label text-[#B8A882]/55">Elite IP · Dubai</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
