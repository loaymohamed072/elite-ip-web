import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1E20] border-t border-[#B8A882]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div className="space-y-5">
            <Image
              src="/images/elite-logo-clear.png"
              alt="Elite IP"
              width={100}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="text-sm text-[#E9E9DF]/50 leading-relaxed max-w-xs">
              Intellectual property and corporate legal advisory for premium brands in Dubai and across the Gulf region.
            </p>
            <div className="flex gap-4 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-[#E9E9DF]/40 hover:text-[#B8A882] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <p className="text-label text-[#B8A882]">Services</p>
            <ul className="space-y-3">
              {[
                "Trademark Protection",
                "Copyright Advisory",
                "Patent & Innovation",
                "Brand Protection",
                "IP Enforcement",
                "Corporate Legal",
              ].map((s) => (
                <li key={s}>
                  <span className="text-sm text-[#E9E9DF]/50 hover:text-[#E9E9DF]/80 transition-colors cursor-default">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <p className="text-label text-[#B8A882]">Contact</p>
            <div className="space-y-3">
              <p className="text-sm text-[#E9E9DF]/50">Dubai, United Arab Emirates</p>
              <a
                href="mailto:hello@eliteip.ae"
                className="block text-sm text-[#E9E9DF]/50 hover:text-[#B8A882] transition-colors"
              >
                hello@eliteip.ae
              </a>
              <a
                href="https://wa.me/971000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#E9E9DF]/50 hover:text-[#B8A882] transition-colors"
              >
                +971 00 000 0000
              </a>
            </div>
            <div className="pt-4">
              <p className="text-label text-[#E9E9DF]/30">Response Commitment</p>
              <p className="text-xs text-[#E9E9DF]/40 mt-1.5 leading-relaxed">
                All consultation requests are reviewed within 4 business hours. Urgent matters handled same day.
              </p>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-[#E9E9DF]/25">
            © {year} Elite IP. All rights reserved. Licensed in the UAE.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-[#E9E9DF]/25 cursor-default hover:text-[#E9E9DF]/40 transition-colors">
              Privacy Policy
            </span>
            <span className="text-xs text-[#E9E9DF]/25 cursor-default hover:text-[#E9E9DF]/40 transition-colors">
              Terms of Use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
