import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, company, phone, email, issueType, urgency, details } = body;

    if (!fullName || !email || !phone || !issueType || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Wire to Resend or preferred email provider
    // Example with Resend (install: npm i resend):
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Elite IP <noreply@eliteip.ae>",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[${urgency}] Consultation Request — ${issueType}`,
    //   html: `
    //     <h2>New Consultation Request</h2>
    //     <p><strong>Name:</strong> ${fullName}</p>
    //     <p><strong>Company:</strong> ${company || "N/A"}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Issue:</strong> ${issueType}</p>
    //     <p><strong>Urgency:</strong> ${urgency}</p>
    //     <p><strong>Details:</strong> ${details || "None provided"}</p>
    //   `,
    // });

    console.log("Consultation request received:", { fullName, company, phone, email, issueType, urgency, details });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
