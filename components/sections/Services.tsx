"use client";

import { useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "trademark",
    number: "01",
    title: "Trademark Protection",
    short: "Secure your brand identity at every level.",
    body: "From registration strategy across UAE and GCC jurisdictions to enforcement and oppositions, Elite builds trademark frameworks that protect your brand name, logo, and identity — proactively, not reactively.",
    detail: "Filing strategy · GCC registration · Opposition proceedings · Renewal management · Portfolio audits",
    image: "/images/leather-notebook.png",
  },
  {
    id: "copyright",
    number: "02",
    title: "Copyright Advisory",
    short: "Protect the creative assets that define your brand.",
    body: "Creative work — campaigns, content, design systems, packaging — represents significant commercial value. We advise on copyright ownership, licensing, infringement response, and cross-border protection.",
    detail: "Ownership structuring · Licensing agreements · Infringement action · Content protection · Digital IP",
    image: "/images/fingerprint-paper.png",
  },
  {
    id: "patent",
    number: "03",
    title: "Patent & Innovation Advisory",
    short: "Protect your technical and product innovations.",
    body: "Elite works with businesses developing proprietary products, formulas, and systems to navigate UAE and international patent processes — ensuring technical innovation is secured before it is exposed.",
    detail: "Patentability assessment · UAE filing · PCT applications · Innovation strategy · Prior art review",
    image: "/images/wax-seal.png",
  },
  {
    id: "enforcement",
    number: "04",
    title: "IP Enforcement & Brand Defence",
    short: "Act decisively when your IP is threatened.",
    body: "When infringement occurs, speed and precision matter. Elite pursues enforcement through UAE courts, customs authorities, and digital platforms — removing counterfeit products and infringing content with urgency.",
    detail: "Cease & desist · Court proceedings · Customs recordal · Marketplace takedowns · Counterfeit action",
    image: "/images/gold-seal.png",
  },
  {
    id: "brand",
    number: "05",
    title: "Brand Protection Strategy",
    short: "A proactive framework for long-term brand security.",
    body: "Beyond individual registrations, Elite designs comprehensive brand protection strategies — mapping IP assets, identifying vulnerabilities, and building legal infrastructure that scales with your brand.",
    detail: "IP audits · Risk mapping · Portfolio management · Brand monitoring · Strategy sessions",
    image: "/images/green-textile.png",
  },
  {
    id: "corporate",
    number: "06",
    title: "Corporate Legal Services",
    short: "The structural legal support growing businesses need.",
    body: "From commercial contracts and business formation to licensing agreements and regulatory compliance, Elite provides the corporate legal framework that protects your business from the inside out.",
    detail: "Company formation · Commercial contracts · Licensing · Partner agreements · Regulatory compliance",
    image: "/images/luxury-corridor.png",
  },
  {
    id: "litigation",
    number: "07",
    title: "Civil and Criminal",
    short: "Strategic litigation when your rights are on the line.",
    body: "Elite handles civil disputes and criminal infringement matters with precision and authority — from IP-related litigation and counterfeit prosecution to court proceedings across UAE jurisdictions.",
    detail: "Civil litigation · Criminal prosecution · IP disputes · Court proceedings · Enforcement strategy",
    image: "/images/gold-seal.png",
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeService = services.find((s) => s.id === activeId);

  return (
    <section id="services" className="relative bg-[#0A1E20] overflow-hidden">
      {/* Subtle paper texture — adds material depth without distracting */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "url('/images/ivory-paper.png')", backgroundSize: "cover" }}
      />
      {/* Bottom atmosphere fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#132D30]/30 to-transparent pointer-events-none" />
      <div className="site-container section-pad">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Legal Services</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
                Precision counsel across
                <br />
                <em className="italic">every IP dimension.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#E9E9DF]/40 text-sm max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Tap any service to explore what Elite delivers.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Service grid with expandable detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#B8A882]/15">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.06}>
              <button
                onClick={() => setActiveId(activeId === service.id ? null : service.id)}
                className={`w-full text-left p-8 md:p-10 border-b border-r-0 md:border-r border-[#B8A882]/15 group transition-all duration-500 cursor-pointer ${
                  activeId === service.id
                    ? "bg-[#132D30]"
                    : "bg-transparent hover:bg-[#132D30]/40"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-label text-[#B8A882]/40">{service.number}</span>
                  <span
                    className={`w-5 h-5 flex items-center justify-center border border-[#B8A882]/30 text-[#B8A882] text-xs transition-transform duration-300 ${
                      activeId === service.id ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-light text-[#E9E9DF] mb-3 leading-snug group-hover:text-[#B8A882] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-sm text-[#E9E9DF]/45 leading-relaxed mb-0" style={{ fontFamily: "var(--font-body)" }}>
                  {service.short}
                </p>

                <AnimatePresence>
                  {activeId === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 mt-5 border-t border-[#B8A882]/15">
                        <p className="text-sm text-[#E9E9DF]/60 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                          {service.body}
                        </p>
                        <p className="text-xs text-[#B8A882]/50" style={{ fontFamily: "var(--font-body)" }}>
                          {service.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </FadeIn>
          ))}
        </div>

        {/* Featured visual */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#132D30]/50 border border-[#B8A882]/10 overflow-hidden"
            >
              <div className="p-10 md:p-14">
                <p className="text-label text-[#B8A882] mb-4">{activeService.number} — {activeService.title}</p>
                <p className="font-display text-2xl md:text-3xl font-light text-[#E9E9DF] leading-snug mb-6">
                  {activeService.short}
                </p>
                <p className="text-[#E9E9DF]/55 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {activeService.body}
                </p>
              </div>
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover object-center opacity-60"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#132D30]/80" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
