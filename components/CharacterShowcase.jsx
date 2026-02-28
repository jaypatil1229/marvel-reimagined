"use client";
import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const characters = [
    {
        id: 1,
        name: "Iron Man",
        alias: "Tony Stark",
        team: "Avengers",
        power: "Technology",
        bio: "Genius, billionaire, playboy, philanthropist. Tony Stark built a suit of armor to escape captivity and became Earth's greatest defender.",
        stats: { strength: 72, intelligence: 99, speed: 65, durability: 85 },
        color: "#c0392b",
        glowColor: "rgba(192,57,43,0.6)",
        gradient: "from-red-900 via-red-800 to-yellow-700",
        img: "img/heroes/iron-man.webp",
        tag: "MARK L",
    },
    {
        id: 2,
        name: "Thor",
        alias: "God of Thunder",
        team: "Avengers",
        power: "Thunder & Lightning",
        bio: "The Asgardian prince who wields the enchanted hammer Mjolnir, Thor protects both the nine realms and Earth from cosmic threats.",
        stats: { strength: 96, intelligence: 70, speed: 88, durability: 95 },
        color: "#2980b9",
        glowColor: "rgba(41,128,185,0.6)",
        gradient: "from-blue-900 via-blue-700 to-indigo-600",
        img: "img/heroes/thor.webp",
        tag: "ASGARDIAN",
    },
    {
        id: 3,
        name: "Black Widow",
        alias: "Natasha Romanoff",
        team: "Avengers",
        power: "Espionage",
        bio: "World's greatest spy and assassin. Her Red Room training forged a weapon of unmatched precision, turned humanity's greatest defender.",
        stats: { strength: 68, intelligence: 90, speed: 82, durability: 60 },
        color: "#27ae60",
        glowColor: "rgba(39,174,96,0.6)",
        gradient: "from-gray-900 via-green-900 to-gray-800",
        img: "img/heroes/black-widow.webp",
        tag: "S.H.I.E.L.D",
    },
    {
        id: 4,
        name: "Doctor Strange",
        alias: "Stephen Strange",
        team: "Masters of the Mystic Arts",
        power: "Sorcery",
        bio: "Once a brilliant surgeon, Stephen Strange now guards the Time Stone as Earth's Sorcerer Supreme—bending time, space, and reality itself.",
        stats: { strength: 60, intelligence: 97, speed: 75, durability: 70 },
        color: "#8e44ad",
        glowColor: "rgba(142,68,173,0.6)",
        gradient: "from-purple-900 via-indigo-800 to-purple-700",
        img: "img/heroes/dr-strange.jpeg",
        tag: "SORCERER SUPREME",
    },
    {
        id: 5,
        name: "Loki",
        alias: "God of Mischief",
        team: "TVA",
        power: "Illusion & Sorcery",
        bio: "The trickster prince of Asgard whose mischief ripples across the Sacred Timeline. Variant, villain, hero — Loki defies every label.",
        stats: { strength: 85, intelligence: 93, speed: 78, durability: 80 },
        color: "#16a085",
        glowColor: "rgba(22,160,133,0.6)",
        gradient: "from-green-900 via-teal-800 to-emerald-700",
        img: "img/heroes/loki.jpg",
        tag: "VARIANT L1130",
    },
    {
        id: 6,
        name: "Star-Lord",
        alias: "Peter Quill",
        team: "Guardians of the Galaxy",
        power: "Half-Celestial",
        bio: "Half-human, half-Celestial, all reckless. Peter Quill leads the galaxy's most unlikely band of heroes across the cosmos.",
        stats: { strength: 74, intelligence: 74, speed: 76, durability: 70 },
        color: "#e67e22",
        glowColor: "rgba(230,126,34,0.6)",
        gradient: "from-orange-900 via-amber-800 to-red-700",
        img: "img/heroes/star-lord.avif",
        tag: "HALF-CELESTIAL",
    },
];

const StatBar = ({ label, value, color }) => (
    <div className="mb-2">
        <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1 text-white/60">
            <span>{label}</span>
            <span className="text-white font-bold">{value}</span>
        </div>
        <div className="h-1 w-full rounded-full bg-white/10">
            <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${value}%`, backgroundColor: color }}
            />
        </div>
    </div>
);

const CharacterCard = ({ character, index }) => {
    const [flipped, setFlipped] = useState(false);
    const [transform, setTransform] = useState("");
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current || flipped) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTransform(
            `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.03,1.03,1.03)`
        );
    };

    const handleMouseLeave = () => {
        setTransform("");
    };

    return (
        <div
            className="character-card-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div
                ref={cardRef}
                className="relative h-[480px] cursor-pointer select-none"
                style={{
                    transform,
                    transition: transform ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setFlipped((f) => !f)}
            >
                {/* Card inner — flip container */}
                <div
                    className="relative w-full h-full"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
                    }}
                >
                    {/* ── FRONT ── */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                        {/* Background image */}
                        <img
                            src={character.img}
                            alt={character.name}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${character.gradient} opacity-70`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        {/* Glow border on hover */}
                        <div
                            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover-glow"
                            style={{ boxShadow: `inset 0 0 40px ${character.glowColor}` }}
                        />

                        {/* Tag pill */}
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase"
                            style={{ backgroundColor: character.color + "33", border: `1px solid ${character.color}66`, color: character.color }}>
                            {character.tag}
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: character.color }}>
                                {character.team}
                            </p>
                            <h2 className="font-zentry text-4xl font-black text-white uppercase leading-none mb-1">
                                {character.name}
                            </h2>
                            <p className="text-white/50 text-xs tracking-widest uppercase mb-4">{character.alias}</p>

                            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
                                <TiLocationArrow style={{ color: character.color }} />
                                <span>Click to reveal profile</span>
                            </div>
                        </div>
                    </div>

                    {/* ── BACK ── */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between"
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            background: `linear-gradient(135deg, #0a0a0a 0%, ${character.color}22 100%)`,
                            borderColor: character.color + "44",
                        }}
                    >
                        {/* Top section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: character.color }}>
                                        {character.power}
                                    </p>
                                    <h3 className="font-zentry text-2xl font-black text-white uppercase">{character.name}</h3>
                                </div>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                                    style={{ backgroundColor: character.color + "33", color: character.color }}
                                >
                                    {character.id.toString().padStart(2, "0")}
                                </div>
                            </div>
                            <div className="h-px mb-4" style={{ backgroundColor: character.color + "44" }} />
                            <p className="text-white/60 text-sm leading-relaxed font-circular-web">{character.bio}</p>
                        </div>

                        {/* Stats */}
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] mb-3 text-white/40">Combat Profile</p>
                            <StatBar label="Strength" value={character.stats.strength} color={character.color} />
                            <StatBar label="Intelligence" value={character.stats.intelligence} color={character.color} />
                            <StatBar label="Speed" value={character.stats.speed} color={character.color} />
                            <StatBar label="Durability" value={character.stats.durability} color={character.color} />
                            <p className="text-center text-[9px] text-white/20 mt-4 uppercase tracking-widest">Click to flip back</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CharacterShowcase = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
            }
        );

        gsap.utils.toArray(".character-card-wrapper").forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 80, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
                    delay: i * 0.08,
                    scrollTrigger: { trigger: card, start: "top 90%" },
                }
            );
        });
    }, { scope: containerRef });

    return (
        <section
            id="characters"
            ref={containerRef}
            className="relative min-h-screen bg-black py-24 px-6 md:px-16 overflow-hidden"
        >
            {/* Red ambient glow background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 left-[20%] w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #e62429 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] rounded-full opacity-8"
                    style={{ background: "radial-gradient(circle, #5724ff 0%, transparent 70%)" }} />
            </div>

            {/* Scanline texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)" }} />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div ref={titleRef} className="mb-20 opacity-0">
                    <p className="font-circular-web text-xs uppercase tracking-[0.3em] text-red-500 mb-4">
                        ── Multiverse Database ──
                    </p>
                    <h1 className="font-zentry text-6xl md:text-8xl font-black text-white uppercase leading-none mb-6">
                        Hero <span className="text-red-500">Files</span>
                    </h1>
                    <p className="font-circular-web text-white/40 max-w-lg text-sm leading-relaxed">
                        Classified S.H.I.E.L.D. dossiers on Earth's most extraordinary individuals.
                        Click any card to access their combat profile and mission history.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-red-500/50 to-transparent" />
                        <span className="text-red-500/60 text-[10px] tracking-widest uppercase">
                            {characters.length} Records Found
                        </span>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {characters.map((char, i) => (
                        <CharacterCard key={char.id} character={char} index={i} />
                    ))}
                </div>

                {/* Bottom disclaimer */}
                <div className="mt-16 text-center">
                    <p className="text-white/15 text-[10px] uppercase tracking-[0.3em]">
                        ⚠ Classified Intelligence — S.H.I.E.L.D. Level 8 Clearance Required ⚠
                    </p>
                </div>
            </div>

            <style jsx>{`
        .character-card-wrapper:hover .hover-glow {
          opacity: 1 !important;
          transition: opacity 0.3s ease;
        }
      `}</style>
        </section>
    );
};

export default CharacterShowcase;
