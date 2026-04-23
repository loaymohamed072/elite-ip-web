import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "IP Insights — Intellectual Property Intelligence for UAE Brands",
  description:
    "Expert analysis on trademark registration, copyright law, patent strategy, and IP enforcement in the UAE and Gulf region. Written by Elite IP's legal team.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "IP Insights — Elite IP",
    description:
      "Expert analysis on trademark, copyright, and IP strategy in the UAE and Gulf region.",
    url: "/insights",
    type: "website",
  },
};

export default function InsightsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0A1E20] min-h-screen pt-[72px]">
        {/* Hero */}
        <section className="site-container section-pad border-b border-[#B8A882]/10">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">Insights</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[1.02] text-[#E9E9DF] tracking-[-0.02em] max-w-3xl">
              IP intelligence for
              <br />
              <em className="italic">ambitious brands.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="mt-6 text-[#E9E9DF]/50 text-base leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Practical analysis on trademark registration, copyright law, patent strategy,
              and IP enforcement in the UAE and Gulf region.
            </p>
          </FadeIn>
        </section>

        {/* Article Grid */}
        <section className="site-container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#B8A882]/10">
            {articles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.06}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="group block bg-[#0A1E20] p-8 hover:bg-[#132D30] transition-colors duration-300 h-full"
                >
                  <div className="relative h-48 overflow-hidden mb-6">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover object-center opacity-45 group-hover:opacity-65 transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E20] via-transparent to-transparent" />
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-label text-[#B8A882]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {article.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#B8A882]/30" />
                    <span
                      className="text-label text-[#E9E9DF]/30"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-xl md:text-2xl font-light text-[#E9E9DF] leading-snug mb-3 group-hover:text-[#B8A882] transition-colors duration-300">
                    {article.title}
                  </h2>

                  <p
                    className="text-sm text-[#E9E9DF]/40 leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {article.excerpt}
                  </p>

                  <span className="text-label text-[#B8A882]/50 group-hover:text-[#B8A882] transition-colors duration-300">
                    Read article →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}