"use client";

import "./scrollToTop.css";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY && currentScrollY > 100) {
                setVisible(true);
            } else {
                setVisible(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            className={`scroll-top ${visible ? "visible" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            ↑
        </button>
    );
};

export default ScrollToTop;
