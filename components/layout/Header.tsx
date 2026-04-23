"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_HEIGHT = 72;

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Sectors", href: "#sectors" },
  { label: "Team", href: "#team" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "/insights", isRoute: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // On inner pages, navigate to home with the hash anchor
      window.location.href = `/${href}`;
    }
  };

  const headerBg = scrolled
    ? "rgba(10,30,32,0.95)"
    : "transparent";
  const headerBorderBottom = scrolled
    ? "1px solid rgba(184,168,130,0.10)"
    : "none";
  const headerBackdrop = scrolled ? "blur(12px)" : "none";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.5s, border-color 0.5s",
          backgroundColor: headerBg,
          backdropFilter: headerBackdrop,
          WebkitBackdropFilter: headerBackdrop,
          borderBottom: headerBorderBottom,
        }}
      >
        <div
          className="site-container"
          style={{
            height: `${NAV_HEIGHT}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo — always navigates to home */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <Image
              src="/images/elite-logo.png"
              alt="Elite IP"
              width={100}
              height={36}
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-label"
                  style={{ color: "rgba(233,233,223,0.6)", transition: "color 0.3s" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#B8A882")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(233,233,223,0.6)")
                  }
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-label"
                  style={{
                    color: "rgba(233,233,223,0.6)",
                    transition: "color 0.3s",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#B8A882")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(233,233,223,0.6)")
                  }
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button onClick={() => handleNav("#consultation")} className="btn-header">
              Request Consultation
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "8px",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "#E9E9DF",
                transition: "transform 0.3s",
                transform: menuOpen
                  ? "rotate(45deg) translate(0px, 7px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "16px",
                height: "1px",
                background: "#E9E9DF",
                transition: "opacity 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "#E9E9DF",
                transition: "transform 0.3s",
                transform: menuOpen
                  ? "rotate(-45deg) translate(0px, -7px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              backgroundColor: "#0A1E20",
              display: "flex",
              flexDirection: "column",
              paddingTop: `${NAV_HEIGHT}px`,
              overflowY: "auto",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2.5rem 1.5rem",
                gap: "2rem",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.08, duration: 0.5 }}
                >
                  {link.isRoute ? (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.5rem",
                        fontWeight: 300,
                        color: "#E9E9DF",
                        textDecoration: "none",
                        display: "block",
                        lineHeight: 1.1,
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNav(link.href)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-display)",
                        fontSize: "2.5rem",
                        fontWeight: 300,
                        color: "#E9E9DF",
                        textAlign: "left",
                        display: "block",
                        padding: 0,
                        lineHeight: 1.1,
                        width: "100%",
                      }}
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{ marginTop: "0.5rem" }}
              >
                <button
                  onClick={() => handleNav("#consultation")}
                  className="btn-header"
                  style={{ padding: "1rem 1.5rem" }}
                >
                  Request Consultation
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}