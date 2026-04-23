"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const faqs = [
  {
    q: "What is the first step to protect my brand in the UAE?",
    a: "The first step is a trademark clearance search across UAE and GCC databases. Before filing, you need to confirm your brand name and logo are available — filing on a conflicting mark wastes time and money. Elite conducts clearance searches as part of every engagement so you know exactly where you stand before committing.",
  },
  {
    q: "How long does trademark registration take in the UAE?",
    a: "Standard UAE trademark registration typically takes 12 to 18 months from filing to certificate, assuming no oppositions. The Ministry of Economy publishes accepted marks in the Official Gazette for a 30-day opposition window. Elite manages the entire timeline — nothing slips.",
  },
  {
    q: "Does a UAE trademark protect me across the GCC?",
    a: "No. A UAE trademark is territorial and only covers the UAE. To protect your brand in Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman, you need separate national filings or, for some categories, a GCC regional trademark application. Elite builds multi-jurisdiction strategies for brands operating across the Gulf.",
  },
  {
    q: "What is the difference between trademark and copyright protection?",
    a: "A trademark protects your brand identity — name, logo, and trade dress — and must be actively registered. Copyright protects original creative works — campaigns, photography, design systems, content — and exists automatically upon creation. Most businesses need both: trademarks for brand protection, copyright for creative assets.",
  },
  {
    q: "Can I file a trademark before my company is officially registered?",
    a: "Yes. In the UAE, trademark applications can be filed by individuals as well as registered companies. Filing early — before your commercial licence is complete — can be strategically important in fast-moving markets where names are taken quickly.",
  },
  {
    q: "What should I do if someone is copying my brand or logo?",
    a: "Act immediately and document everything. Gather screenshots, purchase records, and evidence of the infringement. Do not contact the infringer directly without legal advice — premature contact can compromise your position. Elite issues cease and desist letters, files customs recordals to block imports, and pursues court action when warranted.",
  },
  {
    q: "How does Elite handle counterfeit products?",
    a: "Elite pursues enforcement through multiple channels simultaneously: UAE courts for injunctive relief and damages, Dubai Customs for border recordal to intercept imports, Ministry of Economy raids on retail locations, and digital platform takedowns on Amazon, Noon, and social media. The goal is elimination, not just a single takedown.",
  },
  {
    q: "Do I need a patent or a trademark for my product?",
    a: "It depends on what you're protecting. A trademark protects your product's name and branding. A patent protects the technical invention itself — the formula, mechanism, or process that makes it unique. If your product has a novel technical innovation, patent protection is essential before you go to market. Public disclosure without filing forfeits your patent rights.",
  },
  {
    q: "How much does trademark registration in the UAE cost?",
    a: "Official filing fees are set by the UAE Ministry of Economy and vary by class. Add professional search, filing, and monitoring fees. Elite is transparent about total costs from the outset — no hidden charges. The more relevant question is what it costs your brand to operate without protection.",
  },
  {
    q: "Can Elite represent my business in UAE courts?",
    a: "Yes. Elite handles civil IP disputes, criminal infringement prosecution, and enforcement proceedings across UAE federal and local courts. We work with licensed local advocates where court appearances require it and manage the full litigation strategy end to end.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const BORDER = "1px solid rgba(184,168,130,0.15)";
const BORDER_BTN = "1px solid rgba(184,168,130,0.30)";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#132D30",
        overflow: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="site-container section-pad">
        {/* Header */}
        <div className="header-gap-lg">
          <FadeIn>
            <p className="text-label" style={{ color: "#B8A882", marginBottom: "1.25rem" }}>
              Common Questions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#E9E9DF",
              }}
            >
              What clients ask
              <br />
              <em className="italic">before they engage us.</em>
            </h2>
          </FadeIn>
        </div>

        {/* FAQ list */}
        <div style={{ borderTop: BORDER }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isHovered = hovered === i;

            return (
              <FadeIn key={i} delay={i * 0.04}>
                <div style={{ borderBottom: BORDER }}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      paddingTop: "1.5rem",
                      paddingBottom: "1.5rem",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <span
                      className="font-display font-light"
                      style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                        lineHeight: 1.4,
                        color: isHovered ? "#B8A882" : "#E9E9DF",
                        transition: "color 0.3s",
                      }}
                    >
                      {faq.q}
                    </span>

                    {/* + / × indicator */}
                    <span
                      style={{
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: BORDER_BTN,
                        color: "#B8A882",
                        fontSize: "0.875rem",
                        marginTop: "2px",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            paddingBottom: "1.5rem",
                            fontSize: "0.875rem",
                            color: "rgba(233,233,223,0.60)",
                            lineHeight: 1.75,
                            maxWidth: "48rem",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}