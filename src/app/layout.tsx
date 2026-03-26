import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Comeback Engine",
  description:
    "Get back to work with confidence. Generate gap explanations, resume rewrites, interview scripts, and a 30-day comeback plan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <a href="/" className="text-lg font-bold text-primary-700">
              Career Comeback Engine
            </a>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
