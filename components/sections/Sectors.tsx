import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const sectors = [
  {
    name: "Luxury & Fashion",
    description: "Brand names, product designs, craftsmanship methods, and heritage narratives — the full scope of a luxury brand's IP estate.",
    image: "/images/green-fabric.png",
  },
  {
    name: "Food & Beverage",
    description: "Trade names, recipes, packaging, restaurant concepts, and franchise protection for F&B businesses that have built a loyal market.",
    image: "/images/premium-table.png",
  },
  {
    name: "Real Estate & Hospitality",
    description: "Development branding, hospitality concepts, lifestyle positioning, and architectural identity for premium property and hotel ventures.",
    image: "/images/premium-building.png",
  },
  {
    name: "Lifestyle & Wellness",
    description: "Product lines, brand identity, and proprietary methods for wellness, beauty, and lifestyle businesses with strong consumer brand equity.",
    image: "/images/ivory-paper.png",
  },
  {
    name: "Technology & Innovation",
    description: "Patent filings, software copyrights, trade secret protection, and IP strategy for technology businesses and product innovators.",
    image: "/images/fingerprint-paper.png",
  },
  {
    name: "Creative & Media",
    description: "Content ownership, licensing frameworks, and copyright enforcement for creative studios, media houses, and content-led brands.",
    image: "/images/leather-notebook.png",
  },
];

export default function Sectors() {
  return (
    <section id="sectors" className="relative bg-[#0A1E20] overflow-hidden">
      {/* Green textile texture — atmospheric material layer */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "url('/images/green-textile.png')", backgroundSize: "cover" }}
      />
      {/* Divider */}
      <div className="site-container">
        <div className="divider-gold" />
      </div>

      <div className="site-container section-pad">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Sectors We Serve</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
              Deep fluency across
              <br />
              <em className="italic">the industries that matter.</em>
            </h2>
          </FadeIn>
        </div>

        {/* Sectors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#B8A882]/10">
          {sectors.map((sector, i) => (
            <FadeIn key={sector.name} delay={i * 0.07}>
              <div className="bg-[#0A1E20] p-8 md:p-10 group hover:bg-[#132D30]/60 transition-colors duration-500 h-full">
                <div className="relative w-full h-40 mb-7 overflow-hidden">
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    className="object-cover object-center opacity-50 group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E20] via-transparent to-transparent" />
                </div>
                <h3 className="font-display text-xl text-[#E9E9DF] mb-3 group-hover:text-[#B8A882] transition-colors duration-300">
                  {sector.name}
                </h3>
                <p className="text-sm text-[#E9E9DF]/45 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {sector.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Footer note */}
        <FadeIn delay={0.2}>
          <div className="mt-12 flex items-start gap-4 max-w-2xl">
            <span className="accent-line mt-3 shrink-0" />
            <p className="text-sm text-[#E9E9DF]/35 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Elite works with businesses at every stage — from early-stage brand protection to comprehensive IP strategy for established market leaders. If your industry is not listed above, speak with us — our practice extends across all commercially active sectors in the UAE.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
