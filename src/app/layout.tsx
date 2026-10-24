import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAMSEE | समझना. सीखना. — Samajhna. Seekhna.",
  description:
    "SAMSEE — An interactive 3D learning and simulation platform by 5 IDIOTS. Understand. Learn. Future expansion: AI tools, virtual laboratories, scientific simulations, and educational software across all fields.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="brand" aria-label="SAMSEE home">
              <span className="brand-mark" aria-hidden="true">
                S
              </span>
              <span className="brand-text">
                <strong>SAMSEE</strong>
                <span>समझना. सीखना. — Understand. Learn.</span>
              </span>
            </Link>
            <nav className="site-nav" aria-label="Primary">
              <Link href="/#machines" className="nav-link">
                Machines
              </Link>
              <Link href="/#how" className="nav-link">
                How it works
              </Link>
              <span className="nav-badge">Local-first prototype</span>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="site-footer__inner">
            <p>
              <strong>SAMSEE</strong> — By <strong>5 IDIOTS</strong>. समझना. सीखना. | Understand. Learn. An interactive 3D learning and simulation platform. Models are procedural teaching schematics; educational content is draft pending subject review.
            </p>
            <p>
              Future expansion: AI tools, virtual laboratories, scientific simulations, and educational software across all fields. This is a supplementary learning tool. It does not replace laboratory training, electrical safety procedures or supervised practical work.
            </p>
            <p>© 2026 5 IDIOTS | SAMSEE — समझना. सीखना. | Understand. Learn.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
