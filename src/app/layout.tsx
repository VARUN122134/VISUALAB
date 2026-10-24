import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISUALAB — Interactive 3D Machine Learning",
  description:
    "Explore a three-phase induction motor, a synchronous generator and a single-phase transformer through interactive 3D cutaways, guided steps and quizzes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="brand" aria-label="VISUALAB home">
              <span className="brand-mark" aria-hidden="true">
                V
              </span>
              <span className="brand-text">
                <strong>VISUALAB</strong>
                <span>Interactive 3D learning</span>
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
              <strong>VISUALAB</strong> — prototype for the Seva First Innovation Challenge. Models
              are procedural teaching schematics; educational content is draft pending subject
              review.
            </p>
            <p>
              This is a supplementary learning tool. It does not replace laboratory training,
              electrical safety procedures or supervised practical work.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
