import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Whalio Technologies | Simple Software. Smarter Business.',
  description:
    'Whalio Technologies builds simple business software and workflow automation solutions that help companies reduce manual work and operate more efficiently.',
  openGraph: {
    title: 'Whalio Technologies | Simple Software. Smarter Business.',
    description:
      'Whalio Technologies builds simple business software and workflow automation solutions that help companies reduce manual work and operate more efficiently.',
    url: 'https://whaliotechnologies.com',
    siteName: 'Whalio Technologies',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-[#f8fafc] text-[#0b132b]">
        {children}
      </body>
    </html>
  );
}
