import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { articles } from "@/lib/articles";

export default function Insights() {
  const featured = articles.slice(0, 3);

  return (
    <section style={{ position: "relative", backgroundColor: "#132D30", overflow: "hidden" }}>
      <div className="site-container section-pad">
        {/* Header */}
        <div className="header-gap-lg">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Insights</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <FadeIn delay={0.1}>
              <h2
                className="font-display font-light text-[#E9E9DF]"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                IP intelligence for
                <br />
                <em className="italic">ambitious brands.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/insights"
                className="text-label text-[#B8A882]"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", transition: "color 0.3s", textDecoration: "none" }}
              >
                All articles →
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Card grid */}
        <div style={{ borderTop: "1px solid rgba(184,168,130,0.15)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {featured.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.08}>
                <Link
                  href={`/insights/${article.slug}`}
                  style={{
                    display: "block",
                    padding: "2rem",
                    borderBottom: "1px solid rgba(184,168,130,0.15)",
                    textDecoration: "none",
                    transition: "background 0.3s",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      height: "176px",
                      overflow: "hidden",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center", opacity: 0.5 }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, #132D30, transparent)",
                      }}
                    />
                    <span
                      className="text-label"
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        left: 0,
                        color: "rgba(184,168,130,0.65)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-light text-[#E9E9DF]"
                    style={{
                      fontSize: "1.25rem",
                      lineHeight: 1.35,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "rgba(233,233,223,0.40)",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <span
                    className="text-label"
                    style={{ color: "rgba(184,168,130,0.55)" }}
                  >
                    Read article →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}