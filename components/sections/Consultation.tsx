"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

type FormState = "idle" | "submitting" | "success" | "error";

const ISSUE_TYPES = [
  "Trademark",
  "Copyright",
  "Patent / Innovation",
  "IP Enforcement",
  "Brand Protection",
  "Corporate Legal Support",
  "Other",
];

const URGENCY_LEVELS = [
  "Immediate",
  "Within 24 hours",
  "This week",
  "General inquiry",
];

type FormData = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  issueType: string;
  urgency: string;
  details: string;
};

const empty: FormData = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  issueType: "",
  urgency: "",
  details: "",
};

export default function Consultation() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<FormState>("idle");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const next: Partial<FormData> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.issueType) next.issueType = "Please select a type";
    if (!form.urgency) next.urgency = "Please select urgency";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(empty);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-[#B8A882]/20 py-3.5 px-0 text-[#E9E9DF] text-sm placeholder-[#E9E9DF]/30 focus:border-[#B8A882] transition-colors duration-300 outline-none";

  const selectBase =
    "w-full bg-[#132D30] border border-[#B8A882]/20 py-3.5 px-4 text-[#E9E9DF] text-sm focus:border-[#B8A882] transition-colors duration-300 outline-none appearance-none cursor-pointer";

  return (
    <section id="consultation" className="relative bg-[#132D30] overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url('/images/ivory-paper.webp')",
          backgroundSize: "cover",
        }}
      />

      <div className="site-container section-pad relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left: copy */}
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <p className="text-label text-[#B8A882]" style={{ marginBottom: "1.5rem" }}>Request a Consultation</p>
              <h2 className="font-display font-light leading-[1.05] text-[#E9E9DF] tracking-[-0.02em]" style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)", marginBottom: "2rem" }}>
                Speak to Elite
                <br />
                <em className="italic">before it becomes urgent.</em>
              </h2>
              <p className="text-[#E9E9DF]/55 text-[1.0625rem] leading-relaxed max-w-md" style={{ fontFamily: "var(--font-body)", marginBottom: "2.5rem" }}>
                Share the basics and we will review your situation within 4 business hours. Urgent matters are handled the same day — no forms, no delays.
              </p>

              {/* Trust signals */}
              <div className="space-y-5">
                {[
                  ["4-hour response", "All inquiries reviewed within 4 business hours."],
                  ["Complete discretion", "Your business details remain strictly confidential."],
                  ["No obligation", "An initial consultation carries no commitment."],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#B8A882] shrink-0 translate-y-[5px]" />
                    <div>
                      <p className="text-sm text-[#E9E9DF] font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        {title}
                      </p>
                      <p className="text-xs text-[#E9E9DF]/40 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "2.5rem" }}>
                <a
                  href="https://wa.me/971000000000?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20legal%20matter%20with%20Elite%20IP."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-label text-[#E9E9DF]/60 hover:text-[#B8A882] transition-colors duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Prefer WhatsApp instead?
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.15}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-[#B8A882]/20 p-12 text-center"
                >
                  <div className="w-14 h-14 border border-[#B8A882]/30 flex items-center justify-center mx-auto mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8A882" strokeWidth="1.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-[#E9E9DF] mb-3">Request Received</h3>
                  <p className="text-sm text-[#E9E9DF]/50 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    Your consultation request has been received. A member of the Elite team will be in touch within 4 business hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-label text-[#B8A882] border-b border-[#B8A882]/30 hover:border-[#B8A882] transition-colors"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-8"
                >
                  {/* Row 1: name + company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={form.fullName}
                        onChange={set("fullName")}
                        className={inputBase}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400/70 mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={form.company}
                        onChange={set("company")}
                        className={inputBase}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                  </div>

                  {/* Row 2: phone + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={set("phone")}
                        className={inputBase}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400/70 mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={set("email")}
                        className={inputBase}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400/70 mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: issue type + urgency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div className="relative">
                      <select
                        value={form.issueType}
                        onChange={set("issueType")}
                        className={selectBase}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="" disabled>Type of Issue *</option>
                        {ISSUE_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B8A882]/50 text-xs">▾</span>
                      {errors.issueType && (
                        <p className="text-xs text-red-400/70 mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                          {errors.issueType}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <select
                        value={form.urgency}
                        onChange={set("urgency")}
                        className={selectBase}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="" disabled>Urgency Level *</option>
                        {URGENCY_LEVELS.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B8A882]/50 text-xs">▾</span>
                      {errors.urgency && (
                        <p className="text-xs text-red-400/70 mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                          {errors.urgency}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <textarea
                      placeholder="Brief description of your matter (optional)"
                      value={form.details}
                      onChange={set("details")}
                      rows={4}
                      className={`${inputBase} resize-none`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-primary"
                      style={status === "submitting" ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                    >
                      {status === "submitting" ? "Sending..." : "Request Consultation"}
                    </button>
                    <p className="text-xs text-[#E9E9DF]/30 max-w-[200px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      Your information is handled with complete confidentiality.
                    </p>
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-400/70"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Something went wrong. Please email us directly at hello@eliteip.ae
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
