"use client";
import React from "react";
import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const links = [
    { href: "https://discord.com", icon: <FaDiscord /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://github.com", icon: <FaGithub /> },
    { href: "https://twitch.com", icon: <FaTwitch /> },
  ];

  return (
    <footer className="relative w-screen overflow-hidden border-t border-white/10 bg-black py-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-red-300/70 to-transparent" />
        <div className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-red-300/10 blur-3xl" />
        <div className="absolute -right-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-violet-300/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
        <div>
          <p className="font-circular-web text-xs uppercase tracking-[0.25em] text-white/55">Cinematic Universe Archive</p>
          <p className="mt-2 text-sm text-white/75">&copy; 2026 Marvel Reimagined. All rights reserved.</p>
        </div>

        <div className="flex justify-center gap-3 md:justify-start">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-all duration-500 ease-in-out hover:border-red-300/70 hover:text-red-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-xs uppercase tracking-[0.2em] text-white/65 transition-colors duration-300 hover:text-red-300"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
