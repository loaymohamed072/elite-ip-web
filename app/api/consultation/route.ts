import { NextResponse } from "next/server";
import { sendConsultationEmail } from "@/lib/portal/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, company, phone, email, issueType, urgency, details } = body;

    if (!fullName || !email || !phone || !issueType || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendConsultationEmail({ fullName, company, phone, email, issueType, urgency, details }).catch(
      (err) => console.error("Consultation email error:", err)
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
