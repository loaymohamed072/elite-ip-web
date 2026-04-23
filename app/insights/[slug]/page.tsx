import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { articles, getArticleBySlug, getAllSlugs } from "@/lib/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/insights/${slug}`,
      type: "article",
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Elite IP",
    },
    publisher: {
      "@type": "Organization",
      name: "Elite IP",
    },
    image: `https://eliteip.ae${article.image}`,
    url: `https://eliteip.ae/insights/${article.slug}`,
  };

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main style={{ backgroundColor: "#0A1E20", minHeight: "100vh", paddingTop: "72px" }}>
        {/* Article header */}
        <section className="site-container pt-16 md:pt-24 pb-12 md:pb-16 border-b border-[#B8A882]/10">
          <FadeIn>
            <Link
              href="/insights"
              className="text-label text-[#B8A882]/50 hover:text-[#B8A882] transition-colors duration-300 flex items-center gap-2 mb-8"
            >
              ← All insights
            </Link>
          </FadeIn>

          <div className="flex items-center gap-4 mb-6">
            <FadeIn delay={0.05}>
              <span
                className="text-label text-[#B8A882]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {article.category}
              </span>
            </FadeIn>
            <span className="w-1 h-1 rounded-full bg-[#B8A882]/30" />
            <FadeIn delay={0.05}>
              <span
                className="text-label text-[#E9E9DF]/30"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {article.readTime}
              </span>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em] max-w-4xl">
              {article.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="mt-6 text-[#E9E9DF]/50 text-base leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {article.excerpt}
            </p>
          </FadeIn>
        </section>

        {/* Hero image */}
        <FadeIn>
          <div className="relative h-64 md:h-96 w-full overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-center opacity-40"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E20]/50 to-[#0A1E20]" />
          </div>
        </FadeIn>

        {/* Article body */}
        <section className="site-container py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div
                className="prose-elite"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {article.content.split("\n\n").map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="font-display text-2xl md:text-3xl font-light text-[#E9E9DF] leading-snug mt-12 mb-5"
                      >
                        {block.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (block.startsWith("**") && block.endsWith("**")) {
                    return (
                      <p
                        key={i}
                        className="text-base text-[#B8A882] font-medium leading-relaxed mb-4"
                      >
                        {block.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (block.startsWith("- ")) {
                    const items = block
                      .split("\n")
                      .filter((l) => l.startsWith("- "))
                      .map((l) => l.replace(/^- /, ""));
                    return (
                      <ul key={i} className="mb-5 space-y-2">
                        {items.map((item, j) => {
                          const parts = item.split(/\*\*(.*?)\*\*/);
                          return (
                            <li
                              key={j}
                              className="flex gap-3 text-sm text-[#E9E9DF]/60 leading-relaxed"
                            >
                              <span className="text-[#B8A882] flex-shrink-0 mt-0.5">—</span>
                              <span>
                                {parts.map((p, k) =>
                                  k % 2 === 1 ? (
                                    <strong key={k} className="text-[#E9E9DF]/80 font-medium">
                                      {p}
                                    </strong>
                                  ) : (
                                    p
                                  )
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  const parts = block.split(/\*\*(.*?)\*\*/);
                  return (
                    <p
                      key={i}
                      className="text-base text-[#E9E9DF]/60 leading-[1.8] mb-5"
                    >
                      {parts.map((p, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="text-[#E9E9DF]/85 font-medium">
                            {p}
                          </strong>
                        ) : (
                          p
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#B8A882]/10">
          <div className="site-container py-16 md:py-24">
            <FadeIn>
              <div className="bg-[#132D30] p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <p className="text-label text-[#B8A882] mb-3">Ready to protect your brand?</p>
                  <h2 className="font-display text-2xl md:text-3xl font-light text-[#E9E9DF] leading-snug max-w-md">
                    Speak with Elite IP about your intellectual property strategy.
                  </h2>
                </div>
                <a
                  href="/#consultation"
                  className="btn-header flex-shrink-0"
                >
                  Request Consultation
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* More articles */}
        {otherArticles.length > 0 && (
          <section className="border-t border-[#B8A882]/10">
            <div className="site-container py-16 md:py-24">
              <FadeIn>
                <p className="text-label text-[#B8A882] mb-10">More insights</p>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#B8A882]/10">
                {otherArticles.map((a, i) => (
                  <FadeIn key={a.slug} delay={i * 0.06}>
                    <Link
                      href={`/insights/${a.slug}`}
                      className="group block bg-[#0A1E20] p-8 hover:bg-[#132D30] transition-colors duration-300"
                    >
                      <span
                        className="text-label text-[#B8A882] block mb-3"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {a.category}
                      </span>
                      <h3 className="font-display text-lg font-light text-[#E9E9DF] leading-snug mb-3 group-hover:text-[#B8A882] transition-colors duration-300">
                        {a.title}
                      </h3>
                      <span className="text-label text-[#B8A882]/50 group-hover:text-[#B8A882] transition-colors duration-300">
                        Read →
                      </span>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}