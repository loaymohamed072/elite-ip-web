import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { articles } from "@/lib/articles";

export default function Insights() {
  const featured = articles.slice(0, 3);

  return (
    <section className="relative bg-[#0A1E20] overflow-hidden">
      <div className="site-container section-pad">
        <div className="header-gap-lg">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Insights</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
                IP intelligence for
                <br />
                <em className="italic">ambitious brands.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/insights"
                className="text-label text-[#B8A882] hover:text-[#E9E9DF] transition-colors duration-300 flex items-center gap-2"
              >
                All articles
                <span className="text-xs">→</span>
              </Link>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#B8A882]/15">
          {featured.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 0.08}>
              <Link
                href={`/insights/${article.slug}`}
                className="group block border-b md:border-b-0 md:border-r border-[#B8A882]/15 last:border-r-0 p-8 hover:bg-[#132D30]/50 transition-colors duration-300"
              >
                <div className="relative h-44 overflow-hidden mb-6">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover object-center opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E20] to-transparent" />
                  <span
                    className="absolute bottom-3 left-0 text-label text-[#B8A882]/60"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {article.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-light text-[#E9E9DF] leading-snug mb-3 group-hover:text-[#B8A882] transition-colors duration-300">
                  {article.title}
                </h3>

                <p
                  className="text-sm text-[#E9E9DF]/40 leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {article.excerpt}
                </p>

                <span
                  className="text-label text-[#B8A882]/50 group-hover:text-[#B8A882] transition-colors duration-300"
                >
                  Read article →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}