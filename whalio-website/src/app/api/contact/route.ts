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
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    const errorsLog: string[] = [];

    // Try Web3Forms API first if provided (since Web3Forms handles any recipient email without domain restrictions)
    if (web3FormsKey) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Lead from ${name} (${company}) - Whalio Website`,
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
        if (web3Res.ok && web3Data.success) {
          return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you shortly.',
          });
        }
        errorsLog.push(`Web3Forms: ${web3Data.message || 'Submission failed'}`);
      } catch (err: any) {
        errorsLog.push(`Web3Forms network error: ${err.message}`);
      }
    }

    // Try Resend API
    if (resendApiKey) {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Whalio Contact Form <onboarding@resend.dev>';

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
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

        const resendData = await resendRes.json().catch(() => ({}));
        if (resendRes.ok) {
          return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you shortly.',
          });
        }
        errorsLog.push(`Resend: ${resendData.message || resendData.error || 'Resend delivery failed'}`);
      } catch (err: any) {
        errorsLog.push(`Resend network error: ${err.message}`);
      }
    }

    // Try Custom Webhook Provider
    if (webhookUrl) {
      try {
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

        if (webhookRes.ok) {
          return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully!',
          });
        }
        errorsLog.push('Webhook dispatch failed');
      } catch (err: any) {
        errorsLog.push(`Webhook network error: ${err.message}`);
      }
    }

    // If any errors were logged from providers, return detailed user-friendly response
    if (errorsLog.length > 0) {
      console.error('Contact Form Provider Errors:', errorsLog);
      return NextResponse.json(
        {
          success: false,
          message: `Unable to submit form via email provider (${errorsLog.join('; ')}). Please email moazam.ali@whaliotechnologies.com directly!`,
        },
        { status: 502 }
      );
    }

    // If no service key is configured at all
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
