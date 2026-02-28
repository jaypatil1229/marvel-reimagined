"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { characters } from "../../data/characters";
import { TiLocationArrow } from "react-icons/ti";

type Character = typeof characters[number];


const CharacterSelectCard = ({ character, index }: { character: Character; index: number }) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = -((e.clientY - top) / height - 0.5) * 14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer group"
      style={{ animationDelay: `${index * 0.07}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/characters/${character.id}`)}
    >
      <div
        className="relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden border transition-all duration-300"
        style={{
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.04 : 1})`,
          transition: hovered
            ? "transform 0.1s ease-out, box-shadow 0.3s ease"
            : "transform 0.5s ease-out, box-shadow 0.3s ease",
          borderColor: hovered ? character.color + "99" : "rgba(255,255,255,0.08)",
          boxShadow: hovered ? `0 0 40px ${character.glowColor}, 0 20px 60px rgba(0,0,0,0.8)` : "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Background Image */}
        <img
          src={character.img}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Colored tint on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${character.color}33 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)" }}
        />

        {/* Top tag */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
            style={{
              background: character.color + "22",
              border: `1px solid ${character.color}55`,
              color: character.color,
            }}
          >
            {character.tag}
          </span>
        </div>

        {/* Top-right number */}
        <div className="absolute top-4 right-4 font-zentry text-5xl font-black text-white/5 select-none">
          {String(characters.findIndex(c => c.id === character.id) + 1).padStart(2, "0")}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p
            className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1 transition-colors duration-300"
            style={{ color: character.color }}
          >
            {character.team}
          </p>
          <h2 className="font-zentry text-3xl md:text-4xl font-black text-white uppercase leading-none mb-1">
            {character.name}
          </h2>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-5">{character.alias}</p>

          {/* Power tag */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: character.color }} />
            <span className="text-white/50 text-[10px] uppercase tracking-widest">{character.power}</span>
          </div>

          {/* CTA — slides up on hover */}
          <div
            className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 overflow-hidden"
            style={{
              maxHeight: hovered ? "40px" : "0px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px]"
              style={{ background: character.color + "22", border: `1px solid ${character.color}55`, color: character.color }}
            >
              <span>View Story</span>
              <TiLocationArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CharactersPage() {
  const [filter, setFilter] = useState("ALL");
  const teams = ["ALL", ...Array.from(new Set(characters.map((c) => c.team.split(" / ")[0])))];

  const filtered =
    filter === "ALL"
      ? characters
      : characters.filter((c) => c.team.includes(filter));

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero header */}
      <div className="relative pt-32 pb-16 px-6 md:px-16 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
            style={{ background: "radial-gradient(ellipse at center, #e62429 0%, transparent 70%)" }}
          />
        </div>

        {/* Horizontal rule lines */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <p className="text-red-500 text-[9px] uppercase tracking-[0.4em] font-bold">S.H.I.E.L.D. Classified Database</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          </div>

          <h1 className="font-zentry text-6xl md:text-9xl font-black text-white uppercase leading-none mb-4">
            Choose <br />
            <span style={{ WebkitTextStroke: "1px rgba(230,36,41,0.6)", color: "transparent" }}>
              Your Hero
            </span>
          </h1>
          <p className="font-circular-web text-white/40 max-w-xl text-sm leading-relaxed mt-6">
            Select a hero to access their full classified dossier — origin story, combat profile, key missions, and more. All records are restricted to Level 8 clearance.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mt-10">
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setFilter(team)}
                className="px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-200"
                style={{
                  background: filter === team ? "#e62429" : "rgba(255,255,255,0.05)",
                  color: filter === team ? "#fff" : "rgba(255,255,255,0.4)",
                  border: filter === team ? "1px solid #e62429" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {team}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-white/20 text-[10px] uppercase tracking-widest mt-4">
            {filtered.length} record{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Character Grid */}
      <div className="px-6 md:px-16 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((char, i) => (
            <CharacterSelectCard key={char.id} character={char} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
