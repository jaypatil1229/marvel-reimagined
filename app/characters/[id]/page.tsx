"use client";
import React, { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { characters, getCharacterById } from "../../../data/characters";

/* ─────────────────────────────────────────────────────────
   SVG BRUSH STROKE — animated draw-on-scroll
   ───────────────────────────────────────────────────────── */
const BrushStroke = ({ color = "#e62429", className = "" }) => (
  <svg
    className={`brush-stroke ${className}`}
    viewBox="0 0 520 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 58 C 60 18, 130 72, 210 44 S 340 10, 420 52 S 488 78, 510 42"
      stroke={color}
      strokeWidth="28"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="brush-path"
    />
    <path
      d="M8 46 C 50 28, 120 62, 200 36 S 330 18, 410 48 S 480 70, 512 38"
      stroke={color}
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.35"
      className="brush-path-2"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   SVG UNDERLINE BRUSH — for inline emphasis
   ───────────────────────────────────────────────────────── */
const BrushUnderline = ({ color = "#e62429" }) => (
  <svg
    viewBox="0 0 200 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-3 mt-1 brush-underline"
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <path
      d="M4 10 C 40 4, 80 14, 120 8 S 170 3, 196 10"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      className="brush-u-path"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   STAT COUNTER — big animated number
   ───────────────────────────────────────────────────────── */
const StatCounter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 1400;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-zentry text-[10rem] md:text-[16rem] font-black leading-none text-cream select-none">
        {count}
      </div>
      <p className="font-zentry text-2xl md:text-4xl font-black uppercase text-cream tracking-widest -mt-4">
        {label}
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────── */
export default function CharacterDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const character = getCharacterById(id);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle hero image parallax on mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    setMousePos({ x, y });
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-zentry text-6xl text-cream/20 mb-4">404</p>
          <p className="text-cream/40 mb-8">Character not found in database.</p>
          <button
            onClick={() => router.push("/characters")}
            className="px-6 py-3 rounded-full bg-red-600 text-white text-sm uppercase tracking-widest"
          >
            Return to Database
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = characters.findIndex((c) => c.id === id);
  const prevChar = characters[currentIndex - 1] || characters[characters.length - 1];
  const nextChar = characters[currentIndex + 1] || characters[0];

  return (
    <div className="relative w-screen overflow-x-hidden bg-black text-cream">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO — Full viewport, massive name, brushstroke, image
         ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen overflow-hidden bg-black"
        onMouseMove={handleMouseMove}
      >
        {/* Giant character name — FILLS screen */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h1
            className="font-zentry font-black uppercase text-cream leading-none text-center"
            style={{
              fontSize: "clamp(4rem, 16vw, 18rem)",
              opacity: 0.06,
              letterSpacing: "-0.02em",
            }}
          >
            {character.name}
          </h1>
        </div>

        {/* Photo — center, large, parallax */}
        <div className="absolute inset-0 flex items-end justify-center z-10">
          <img
            ref={heroImgRef}
            src={character.coverImg}
            alt={character.name}
            className="h-[90vh] w-auto object-cover object-top max-w-none"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: "transform 0.3s ease-out",
              filter: "contrast(1.05) brightness(0.9)",
            }}
          />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
          {/* Side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* BRUSH STROKE over image */}
        <div className="absolute left-0 right-0 z-20 pointer-events-none"
          style={{ top: "clamp(60px, 12vh, 140px)" }}>
          <BrushStroke color={character.color} className="w-full max-w-3xl mx-auto" />
        </div>

        {/* Top-left: alias badge */}
        <div className="absolute top-24 left-8 md:left-16 z-30">
          <span
            className="font-circular-web text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full font-bold"
            style={{
              backgroundColor: character.color + "22",
              border: `1px solid ${character.color}55`,
              color: character.color,
            }}
          >
            {character.tag}
          </span>
        </div>

        {/* Bottom-left: name block (Lando-style) */}
        <div className="absolute bottom-12 left-0 z-30 px-8 md:px-16">
          <p
            className="font-circular-web text-[10px] uppercase tracking-[0.3em] mb-1"
            style={{ color: character.color }}
          >
            {character.team}
          </p>
          <div className="relative inline-block">
            <h2 className="font-zentry font-black uppercase text-cream leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              {character.name}
            </h2>
            <BrushUnderline color={character.color} />
          </div>
          <p className="font-circular-web text-cream/40 uppercase tracking-[0.2em] text-sm mt-2">
            {character.alias}
          </p>
        </div>

        {/* Bottom-right: quick meta */}
        <div className="absolute bottom-12 right-8 md:right-16 z-30 text-right">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-circular-web text-[9px] uppercase tracking-[0.2em] text-cream/30 mb-1">Power</p>
              <p className="font-zentry font-black text-cream text-sm uppercase">{character.power}</p>
            </div>
            <div>
              <p className="font-circular-web text-[9px] uppercase tracking-[0.2em] text-cream/30 mb-1">Classification</p>
              <p className="font-zentry font-black text-sm uppercase" style={{ color: character.color }}>OMEGA-LEVEL</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-cream/30" />
          <span className="font-circular-web text-[9px] uppercase tracking-[0.3em] text-cream/20">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION HEADER — "ON MISSION" (Lando ON TRACK style)
         ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-0 bg-black">
        <div className="relative">
          {/* Huge bled text */}
          <div
            className="font-zentry font-black uppercase leading-none whitespace-nowrap text-cream select-none"
            style={{
              fontSize: "clamp(5rem, 20vw, 22rem)",
              lineHeight: 0.85,
              WebkitTextStroke: "2px rgba(245,240,232,0.15)",
              color: "transparent",
            }}
          >
            ON MISSION
          </div>

          {/* Brush stroke diagonal over text */}
          <div className="absolute inset-0 pointer-events-none flex items-center">
            <BrushStroke color={character.color} className="w-full opacity-80" />
          </div>
        </div>

        {/* Split: Image + Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          {/* Left — Character image panel */}
          <div className="relative overflow-hidden bg-[#0a0a0a]">
            <img
              src={character.img}
              alt={character.name}
              className="w-full h-full object-cover object-top"
              style={{ minHeight: "60vh" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
          </div>

          {/* Right — Content */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-20 bg-black">
            <p
              className="font-circular-web text-[9px] uppercase tracking-[0.3em] mb-6"
              style={{ color: character.color }}
            >
              — Classified Brief
            </p>

            <p className="font-circular-web text-xl md:text-2xl text-cream leading-relaxed mb-4">
              {character.bio.split(" ").slice(0, 12).join(" ")}{" "}
              <span className="relative inline-block">
                <em
                  className="not-italic font-black"
                  style={{ color: character.color }}
                >
                  {character.bio.split(" ").slice(12, 16).join(" ")}
                </em>
              </span>{" "}
              {character.bio.split(" ").slice(16).join(" ")}
            </p>

            <div className="h-px mt-6 mb-8" style={{ background: `linear-gradient(to right, ${character.color}55, transparent)` }} />

            <p className="font-circular-web text-cream/45 text-sm leading-relaxed">{character.origin}</p>

            {/* Quote block */}
            <blockquote className="mt-10 border-l-2 pl-6" style={{ borderColor: character.color }}>
              <p className="font-zentry text-2xl md:text-3xl font-black text-cream leading-tight">
                "{character.quote}"
              </p>
              <cite
                className="block mt-3 font-circular-web text-[9px] uppercase tracking-[0.25em] not-italic"
                style={{ color: character.color }}
              >
                — {character.quoteSource}
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          POWERS — dark section, cards
         ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#050505] py-24 px-8 md:px-16 overflow-hidden">
        {/* Topographic background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {[...Array(8)].map((_, i) => (
              <ellipse
                key={i}
                cx="50%"
                cy="100%"
                rx={`${20 + i * 10}%`}
                ry={`${10 + i * 8}%`}
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with brush */}
          <div className="mb-16 relative inline-block">
            <p className="font-circular-web text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-3">
              Abilities & Powers
            </p>
            <h2
              className="font-zentry font-black uppercase text-cream leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              COMBAT PROFILE
            </h2>
            <div className="absolute -bottom-6 left-0 right-0 pointer-events-none">
              <BrushStroke color={character.color} className="w-full opacity-60" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-12" style={{ background: "rgba(255,255,255,0.05)" }}>
            {character.powers.map((power, i) => (
              <div
                key={i}
                className="bg-[#050505] p-8 group cursor-default hover:bg-[#0d0d0d] transition-colors duration-300"
              >
                <div className="text-3xl mb-6">{power.icon}</div>
                <div className="h-px mb-6" style={{ background: `linear-gradient(to right, ${character.color}88, transparent)` }} />
                <h3 className="font-zentry text-base font-black uppercase text-cream mb-3 leading-tight">
                  {power.name}
                </h3>
                <p className="font-circular-web text-cream/40 text-xs leading-relaxed">
                  {power.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — Giant numbers (Lando-style)
         ══════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-0 overflow-hidden">
        {/* "STRENGTH" header — bleeds off edge */}
        <div
          className="font-zentry font-black uppercase text-cream/[0.07] leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(5rem, 22vw, 24rem)" }}
        >
          POWER
        </div>

        <div className="px-8 md:px-16 pb-24 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/5 divide-x divide-y divide-white/5">
            {[
              { value: character.stats.strength, label: "STRENGTH" },
              { value: character.stats.intelligence, label: "INTELLECT" },
              { value: character.stats.speed, label: "SPEED" },
              { value: character.stats.durability, label: "DURABILITY" },
              { value: character.stats.energy, label: "ENERGY" },
              { value: Math.round((Object.values(character.stats).reduce((a, b) => a + b, 0) / Object.values(character.stats).length)), label: "OVERALL" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="relative flex flex-col items-center justify-center p-6 md:p-10 group hover:bg-white/[0.02] transition-colors"
              >
                <StatCounter value={value} label={label} />
                {/* Accent dot */}
                <div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: character.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TIMELINE — "OFF TRACK" section header style
         ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#030303] overflow-hidden">
        {/* Big section title */}
        <div className="relative overflow-hidden">
          <div
            className="font-zentry font-black uppercase text-cream/[0.08] leading-none whitespace-nowrap select-none"
            style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
          >
            THE TIMELINE
          </div>
          <div className="absolute inset-0 pointer-events-none flex items-center">
            <BrushStroke color={character.color} className="w-3/4 opacity-70" />
          </div>
        </div>

        {/* Timeline entries */}
        <div className="px-8 md:px-16 pb-32 max-w-5xl mx-auto">
          <div className="space-y-0">
            {character.timeline.map((item, i) => (
              <div
                key={i}
                className="group relative grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-8 md:gap-16 py-10 border-b border-white/5 hover:bg-white/[0.01] transition-colors"
              >
                {/* Year */}
                <div className="flex flex-col">
                  <span
                    className="font-zentry font-black text-3xl md:text-4xl leading-none"
                    style={{ color: character.color + "99" }}
                  >
                    {item.year}
                  </span>
                  <div className="mt-2 w-6 h-px" style={{ backgroundColor: character.color }} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-zentry text-xl md:text-2xl font-black text-cream uppercase mb-3">
                    {item.event}
                  </h3>
                  <p className="font-circular-web text-cream/40 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Hover number */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-zentry text-6xl font-black pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: character.color + "15" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NAVIGATION — prev / next characters
         ══════════════════════════════════════════════════════ */}
      <section className="bg-black border-t border-white/5">
        <button
          onClick={() => router.push("/characters")}
          className="flex items-center gap-3 w-full px-8 md:px-16 py-6 text-cream/20 hover:text-cream/60 transition-colors font-circular-web text-[10px] uppercase tracking-[0.3em] border-b border-white/5"
        >
          <span className="text-base">←</span>
          <span>All Heroes</span>
        </button>

        <div className="grid grid-cols-2">
          {/* Previous */}
          <div
            className="group relative overflow-hidden cursor-pointer px-8 md:px-16 py-12 border-r border-white/5 hover:bg-white/[0.02] transition-colors"
            onClick={() => router.push(`/characters/${prevChar.id}`)}
          >
            <p className="font-circular-web text-[9px] uppercase tracking-[0.3em] text-cream/25 mb-4">← Previous</p>
            <div className="flex items-end gap-6">
              <img src={prevChar.img} alt={prevChar.name} className="w-16 h-20 object-cover object-top rounded opacity-60 group-hover:opacity-100 transition-opacity" />
              <div>
                <p className="font-circular-web text-[9px] uppercase tracking-widest text-cream/30 mb-1">{prevChar.alias}</p>
                <p className="font-zentry font-black text-2xl text-cream uppercase">{prevChar.name}</p>
              </div>
            </div>
          </div>

          {/* Next */}
          <div
            className="group relative overflow-hidden cursor-pointer px-8 md:px-16 py-12 hover:bg-white/[0.02] transition-colors text-right"
            onClick={() => router.push(`/characters/${nextChar.id}`)}
          >
            <p className="font-circular-web text-[9px] uppercase tracking-[0.3em] text-cream/25 mb-4">Next →</p>
            <div className="flex items-end justify-end gap-6">
              <div>
                <p className="font-circular-web text-[9px] uppercase tracking-widest text-cream/30 mb-1">{nextChar.alias}</p>
                <p className="font-zentry font-black text-2xl text-cream uppercase">{nextChar.name}</p>
              </div>
              <img src={nextChar.img} alt={nextChar.name} className="w-16 h-20 object-cover object-top rounded opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Global styles ── */}
      <style jsx global>{`
        :root {
          --cream: #f5f0e8;
        }
        .text-cream { color: #f5f0e8; }
        .bg-cream { background-color: #f5f0e8; }

        /* Brush stroke SVG animation */
        .brush-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: brushDraw 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.3s;
        }
        .brush-path-2 {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: brushDraw 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.5s;
        }
        .brush-u-path {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          animation: brushDraw 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.6s;
        }
        @keyframes brushDraw {
          to { stroke-dashoffset: 0; }
        }

        /* Grain texture overlay */
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px;
        }
      `}</style>
    </div>
  );
}
