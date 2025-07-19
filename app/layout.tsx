import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mawrid Reader - Arabic Dictionary Interface",
  description: "Modern web application for searching and displaying Arabic dictionaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}