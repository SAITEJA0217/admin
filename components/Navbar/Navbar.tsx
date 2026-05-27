"use client";

import "./navbar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "../auth/authentication" ;

// Inside navbar JSX


const Navbar = () => {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Founder", path: "/founder" },
        { label: "Investor", path: "/investor" },
        { label: "Manufacturer", path: "/manufacturer" },
        { label: "Community", path: "/community" },
        { label: "About Us", path: "/about" },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                {/* Logo */}
                <Link href="/" className="nav-logo">
                    Venture Launcher
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.path}
                                className={pathname === item.path ? "active" : ""}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="nav-actions">
                    <AuthButton />
                </div>

                {/* Hamburger */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.path}
                                className={pathname === item.path ? "active" : ""}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mobile-menu-actions">
                    <AuthButton />
                </div>
                       
                
            </div>
        </>
    );
};

export default Navbar;
