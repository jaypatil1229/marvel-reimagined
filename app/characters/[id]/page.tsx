"use client";
import React, { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { characters, getCharacterById } from "../../../data/characters";
import { TiLocationArrow } from "react-icons/ti";

const StatBar = ({ label, value, color, animate }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs uppercase tracking-widest mb-2">
      <span className="text-white/50">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
    <div className="h-0.5 w-full rounded-full bg-white/10">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: animate ? `${value}%` : "0%", backgroundColor: color }}
      />
    </div>
  </div>
);

export default function CharacterDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const character = getCharacterById(id);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!character) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-zentry text-6xl text-white/20 mb-4">404</p>
          <p className="text-white/40 font-circular-web mb-8">Character not found in database.</p>
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
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen overflow-hidden">
        {/* Parallax image */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform" style={{ top: "-15%" }}>
          <img
            src={character.coverImg}
            alt={character.name}
            className="w-full h-full object-cover object-top"
            style={{ height: "130%" }}
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)" }}
        />

        {/* Colored side glow */}
        <div
          className="absolute left-0 top-0 w-1 h-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${character.color}, transparent)` }}
        />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-20 max-w-4xl">
          {/* Team / tag */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
              style={{ background: character.color + "22", border: `1px solid ${character.color}55`, color: character.color }}
            >
              {character.tag}
            </span>
            <div className="h-px w-12" style={{ backgroundColor: character.color + "66" }} />
            <span className="text-white/30 text-[10px] uppercase tracking-widest">{character.team}</span>
          </div>

          {/* Name */}
          <h1
            className="font-zentry text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase leading-none mb-2"
            style={{ textShadow: `0 0 80px ${character.glowColor}` }}
          >
            {character.name}
          </h1>
          <p className="text-white/40 font-circular-web text-base md:text-lg tracking-widest uppercase">{character.alias}</p>
          <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mt-2">{character.power}</p>

          {/* Scroll indicator */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex flex-col gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-4 h-px transition-all duration-300"
                  style={{ backgroundColor: i === 1 ? character.color : "rgba(255,255,255,0.2)", width: i === 1 ? "24px" : "16px" }}
                />
              ))}
            </div>
            <span className="text-white/30 text-[10px] uppercase tracking-widest">Scroll to explore</span>
          </div>
        </div>

        {/* Number watermark */}
        <div className="absolute right-8 bottom-8 font-zentry text-[12rem] font-black select-none pointer-events-none leading-none text-white/[0.03]">
          {String(currentIndex + 1).padStart(2, "0")}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="relative py-24 px-8 md:px-20 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${character.color}11 0%, #000 50%, ${character.color}08 100%)` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${character.glowColor} 0%, transparent 60%)`, opacity: 0.15 }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-zentry text-[6rem] font-black leading-none select-none pointer-events-none text-white/5 absolute -top-6 -left-4">"</p>
          <blockquote className="font-zentry text-3xl md:text-5xl font-black text-white leading-tight relative z-10">
            "{character.quote}"
          </blockquote>
          <cite className="block mt-6 text-[10px] uppercase tracking-[0.3em] not-italic" style={{ color: character.color }}>
            — {character.quoteSource}
          </cite>
        </div>
      </section>

      {/* ── ORIGIN ── */}
      <section className="py-24 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: character.color }}>Origin Story</p>
            <h2 className="font-zentry text-4xl md:text-5xl font-black text-white uppercase leading-none mb-8">
              The Beginning
            </h2>
            <p className="font-circular-web text-white/50 text-sm md:text-base leading-relaxed">
              {character.bio}
            </p>
            <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${character.color}66, transparent)` }} />
            <p className="font-circular-web text-white/35 text-sm leading-relaxed mt-6">
              {character.origin}
            </p>
          </div>

          {/* Stats panel */}
          <div
            ref={statsRef}
            className="rounded-2xl p-8 border"
            style={{
              background: character.cardGradient,
              borderColor: character.color + "33",
              boxShadow: `0 0 60px ${character.glowColor}`,
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: character.color }}>
              Combat Profile
            </p>
            <StatBar label="Strength" value={character.stats.strength} color={character.color} animate={statsVisible} />
            <StatBar label="Intelligence" value={character.stats.intelligence} color={character.color} animate={statsVisible} />
            <StatBar label="Speed" value={character.stats.speed} color={character.color} animate={statsVisible} />
            <StatBar label="Durability" value={character.stats.durability} color={character.color} animate={statsVisible} />
            <StatBar label="Energy" value={character.stats.energy} color={character.color} animate={statsVisible} />

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-white/20 text-[9px] uppercase tracking-widest text-center">
                S.H.I.E.L.D. Assessment — Threat Level: OMEGA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── POWERS ── */}
      <section className="py-24 px-8 md:px-20 border-t border-white/5 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-center" style={{ color: character.color }}>Abilities</p>
          <h2 className="font-zentry text-4xl md:text-5xl font-black text-white uppercase leading-none mb-16 text-center">
            Powers &amp; Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {character.powers.map((power, i) => (
              <div
                key={i}
                className="group relative rounded-xl p-6 border transition-all duration-300 cursor-default hover:-translate-y-2"
                style={{
                  background: character.color + "08",
                  borderColor: character.color + "22",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = character.color + "66";
                  e.currentTarget.style.boxShadow = `0 0 30px ${character.glowColor}`;
                  e.currentTarget.style.background = character.color + "15";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = character.color + "22";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = character.color + "08";
                }}
              >
                <div className="text-3xl mb-4">{power.icon}</div>
                <h3 className="font-zentry text-sm font-black text-white uppercase mb-2">{power.name}</h3>
                <p className="text-white/40 text-xs leading-relaxed font-circular-web">{power.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: character.color }}>Mission Log</p>
          <h2 className="font-zentry text-4xl md:text-5xl font-black text-white uppercase leading-none mb-16">
            The Sacred <br /> Timeline
          </h2>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(to bottom, ${character.color}, transparent)` }}
            />

            {character.timeline.map((item, i) => (
              <div key={i} className="relative flex gap-8 mb-12 pl-12">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black"
                  style={{ background: character.color + "22", border: `2px solid ${character.color}66`, color: character.color }}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded"
                      style={{ background: character.color + "22", color: character.color }}
                    >
                      {item.year}
                    </span>
                    <span className="text-white/20 text-[10px] uppercase tracking-widest">——</span>
                  </div>
                  <h3 className="font-zentry text-xl font-black text-white uppercase mb-2">{item.event}</h3>
                  <p className="text-white/40 text-sm font-circular-web leading-relaxed">{item.desc}</p>
                  {i < character.timeline.length - 1 && (
                    <div className="h-px mt-8" style={{ background: `linear-gradient(to right, ${character.color}22, transparent)` }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION ── */}
      <section className="py-16 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push("/characters")}
            className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-widest mb-12 hover:text-white transition-colors font-bold"
          >
            <span>←</span> Back to all heroes
          </button>

          <div className="grid grid-cols-2 gap-6">
            {/* Prev */}
            <div
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300"
              onClick={() => router.push(`/characters/${prevChar.id}`)}
            >
              <img src={prevChar.img} alt={prevChar.name} className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 flex items-center p-6">
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">← Previous</p>
                  <p className="font-zentry text-lg font-black text-white uppercase">{prevChar.name}</p>
                </div>
              </div>
            </div>

            {/* Next */}
            <div
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300"
              onClick={() => router.push(`/characters/${nextChar.id}`)}
            >
              <img src={nextChar.img} alt={nextChar.name} className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-end p-6">
                <div className="text-right">
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Next →</p>
                  <p className="font-zentry text-lg font-black text-white uppercase">{nextChar.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
