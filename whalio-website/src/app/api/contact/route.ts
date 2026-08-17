import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, message } = body;

    // Server-side Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Full Name is required.' },
        { status: 400 }
      );
    }

    if (!company || typeof company !== 'string' || company.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Company Name is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!service || typeof service !== 'string' || service.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Please select a service option.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'moazam.ali@whaliotechnologies.com';
    const resendApiKey = process.env.RESEND_API_KEY;
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

    // Provider 1: Resend API
    if (resendApiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Whalio Contact Form <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email,
          subject: `New Lead from ${name} (${company}) - Whalio Website`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone / WhatsApp:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service Needed:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f1f5f9; padding: 12px; border-left: 4px solid #06b6d4;">${message}</blockquote>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json();
        console.error('Resend API Error:', errorData);
        return NextResponse.json(
          { success: false, message: 'Failed to send email via Resend API provider.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you shortly.',
      });
    }

    // Provider 2: Web3Forms API
    if (web3FormsKey) {
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `New Lead: ${name} (${company})`,
          from_name: name,
          to_email: recipientEmail,
          name,
          company,
          email,
          phone: phone || 'N/A',
          service,
          message,
        }),
      });

      const web3Data = await web3Res.json();
      if (!web3Res.ok || !web3Data.success) {
        console.error('Web3Forms Error:', web3Data);
        return NextResponse.json(
          { success: false, message: web3Data.message || 'Failed to send message via Web3Forms.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you shortly.',
      });
    }

    // Custom Webhook URL Provider (e.g. Zapier, Make, Slack)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone: phone || 'N/A',
          service,
          message,
          recipientEmail,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          { success: false, message: 'Failed to dispatch contact webhook.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
      });
    }

    // If no service key is configured, return user-friendly message redirecting to direct email.
    return NextResponse.json(
      {
        success: false,
        message:
          'Unable to submit form at this moment. Please email us directly at moazam.ali@whaliotechnologies.com and we will reply promptly!',
      },
      { status: 503 }
    );
  } catch (err: any) {
    console.error('Contact API Route Error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
