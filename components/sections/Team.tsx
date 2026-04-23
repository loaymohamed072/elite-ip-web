import FadeIn from "@/components/ui/FadeIn";

const team = [
  {
    name: "Amira Khaled",
    title: "Founder & Managing Partner",
    bio: "Amira brings over fifteen years of IP and corporate legal experience across the UAE and GCC. She founded Elite on the principle that premium brands deserve strategic legal counsel — not reactive paperwork. Her practice focuses on complex trademark portfolios, enforcement strategy, and high-value brand protection for luxury and lifestyle clients.",
    initials: "AK",
    specialty: "Trademark · Brand Strategy · GCC Enforcement",
  },
  {
    name: "Karim El Sayed",
    title: "Senior IP Counsel",
    bio: "Karim specialises in intellectual property litigation, patent advisory, and technology-related IP matters. With a background spanning private practice and in-house advisory for regional conglomerates, he brings both commercial acuity and litigation experience to every matter.",
    initials: "KE",
    specialty: "Patent · IP Litigation · Technology IP",
  },
  {
    name: "Layla Mourad",
    title: "Corporate Legal Advisor",
    bio: "Layla leads Elite's corporate legal practice, advising clients on commercial structuring, contracts, licensing, and regulatory matters. She works closely with founders and executive teams to build legal infrastructure that protects the business from the inside out.",
    initials: "LM",
    specialty: "Corporate Law · Licensing · Commercial Contracts",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-[#132D30] overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8A882]/20 to-transparent" />

      <div className="site-container section-pad">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">The Team</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
                Senior counsel.
                <br />
                <em className="italic">Every engagement.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#E9E9DF]/40 text-sm max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                You will always work directly with a qualified senior lawyer — not a junior associate or a paralegal.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <div className="group border border-[#B8A882]/10 hover:border-[#B8A882]/30 transition-all duration-500 bg-[#0A1E20]/20 hover:bg-[#0A1E20]/40">
                {/* Portrait placeholder */}
                <div className="relative h-72 bg-[#0A1E20]/60 overflow-hidden flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-[#B8A882]/20 flex items-center justify-center">
                    <span className="font-display text-3xl font-light text-[#B8A882]/60">
                      {member.initials}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E20]/60 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-8">
                  <p className="text-label text-[#B8A882]/50 mb-3">{member.specialty}</p>
                  <h3 className="font-display text-2xl font-light text-[#E9E9DF] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#B8A882] mb-5" style={{ fontFamily: "var(--font-body)" }}>
                    {member.title}
                  </p>
                  <p className="text-xs text-[#E9E9DF]/40 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-14 text-center">
            <p className="text-sm text-[#E9E9DF]/30" style={{ fontFamily: "var(--font-body)" }}>
              Profiles updated with full biographies and photography prior to launch.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
