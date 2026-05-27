"use client";

import "./footer.css";
import Link from "next/link";

const Footer = () => {
    const FOOTER_LINKS = {
        Product: [
            { label: "Investor Dashboard", path: "/investor/dashboard" },
            { label: "Startup Search", path: "/search" },
            { label: "Deal Workspace", path: "/workspace" },
            { label: "Portfolio Track", path: "/portfolio" },
            { label: "Team Collaboration", path: "/team" },
        ],
        Company: [
            { label: "About Us", path: "/about" },
            { label: "Blog", path: "/blog" },
            { label: "Careers", path: "/careers" },
            { label: "Press", path: "/press" },
            { label: "Contact", path: "/contact" },
        ],
        Resources: [
            { label: "How It Works", path: "/how-it-works" },
            { label: "Help Center", path: "/help" },
            { label: "Investor Guide", path: "/investor-guide" },
            { label: "Startup Guide", path: "/startup-guide" },
            { label: "FAQ", path: "/faq" },
        ],
        Legal: [
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Service", path: "/terms" },
            { label: "Cookie Policy", path: "/cookies" },
            { label: "Security", path: "/security" },
        ],
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <Link href="/" className="nav-logo">
                        Venture Launcher
                    </Link>
                    <p>
                        AI-powered startup discovery platform helping investors make
                        smarter, faster decisions.
                    </p>
                </div>

                {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                    <div className="footer-col" key={heading}>
                        <h5>{heading}</h5>
                        <ul>
                            {links.map((l) => (
                                <li key={l.label}>
                                    <Link href={l.path}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <hr className="section-divider" />

            <div className="footer-bottom">
                <p>© 2026 Venture Launcher. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
