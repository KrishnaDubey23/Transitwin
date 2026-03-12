"use client";

import Link from "next/link";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
];

const companyLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Team" },
  { href: "#", label: "Contact" },
];

const resourceLinks = [
  { href: "#", label: "Documentation" },
  { href: "#", label: "API" },
  { href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-white py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h4 className="font-semibold text-[#111111] mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#111111] mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#111111] mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E5E5E5] text-center text-[#6B6B6B] text-sm">
          © 2026 TransitWin
          <br />
          <span className="mt-1 block">Built for the future of smart cities</span>
        </div>
      </div>
    </footer>
  );
}
