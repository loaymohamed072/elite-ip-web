import FadeIn from "@/components/ui/FadeIn";

const steps = [
  {
    number: "01",
    title: "Initial Review",
    description:
      "We receive your consultation request and review the matter before we speak. You will not be asked to repeat yourself. Our team arrives informed.",
    duration: "Same day or within 4 hours",
  },
  {
    number: "02",
    title: "Strategic Assessment",
    description:
      "A qualified senior lawyer reviews your IP position, risk exposure, and immediate priorities. No generalist opinions — specific, actionable guidance from the first meeting.",
    duration: "Within 48 hours of engagement",
  },
  {
    number: "03",
    title: "Legal Action Plan",
    description:
      "We deliver a clear, structured plan — what needs to be protected, how, and in what sequence. Timelines, costs, and expected outcomes are laid out plainly.",
    duration: "Tailored to your matter",
  },
  {
    number: "04",
    title: "Ongoing Protection",
    description:
      "Elite remains your active IP partner — monitoring, renewing, enforcing, and advising as your business evolves. Your IP estate is managed proactively, not reactively.",
    duration: "Continuous and retained",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-[#0A1E20]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <FadeIn>
            <p className="text-label text-[#B8A882] mb-5">How We Work</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]">
              Decisive and structured
              <br />
              <em className="italic">from first contact.</em>
            </h2>
          </FadeIn>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.09}>
              <div className="relative group px-0 md:pr-8 lg:pr-10 pb-10 md:pb-0">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-[#B8A882]/15 z-0" />
                )}

                {/* Step number circle */}
                <div className="relative z-10 w-10 h-10 border border-[#B8A882]/25 flex items-center justify-center mb-7 group-hover:border-[#B8A882]/60 transition-colors duration-500">
                  <span className="text-label text-[#B8A882]/60">{step.number}</span>
                </div>

                <h3 className="font-display text-xl text-[#E9E9DF] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[#E9E9DF]/45 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  {step.description}
                </p>
                <p className="text-label text-[#B8A882]/40 text-[0.6rem]" style={{ letterSpacing: "0.14em" }}>
                  {step.duration}
                </p>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="md:hidden mt-8 w-px h-8 bg-[#B8A882]/20 ml-5" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
