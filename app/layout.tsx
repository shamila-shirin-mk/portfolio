import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shamila Shirin M K — Data Scientist",
  description:
    "Aspiring Data Scientist skilled in Python, SQL, Machine Learning, and data visualization tools like Power BI and Tableau. Based in Malappuram, Kerala.",
  openGraph: {
    title: "Shamila Shirin M K — Data Scientist",
    description:
      "Aspiring Data Scientist skilled in Python, SQL, Machine Learning, and data visualization tools like Power BI and Tableau. Based in Malappuram, Kerala.",
    url: "https://shamila-shirin.vercel.app",
    siteName: "Shamila Shirin Portfolio",
    images: [
      {
        url: "/me%203.webp",
        width: 1200,
        height: 630,
        alt: "Shamila Shirin M K — Data Scientist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamila Shirin M K — Data Scientist",
    description:
      "Aspiring Data Scientist skilled in Python, SQL, Machine Learning, and data visualization tools like Power BI and Tableau.",
    images: ["/me%203.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-charcoal-dark text-ivory selection:bg-gray-cool selection:text-ivory">
        {children}
      </body>
    </html>
  );
}
