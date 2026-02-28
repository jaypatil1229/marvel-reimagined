"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type TimelineEvent = {
  title: string;
  year: string;
  line: string;
  tone: string;
};

type Phase = {
  id: number;
  title: string;
  subtitle: string;
  accent: string;
  bgFrom: string;
  bgVia: string;
  bgTo: string;
  events: TimelineEvent[];
};

const TIMELINE_POSTERS = [
  "/timeline/image1.jpeg",
  "/timeline/image2.jpg",
  "/timeline/image3.jpg",
  "/timeline/image4.jpg",
  "/timeline/image5.jpg",
  "/timeline/image6.webp",
  "/timeline/image7.jpg",
  "/timeline/image8.jpg",
  "/timeline/image9.jpg",
  "/timeline/image10.jpg",
  "/timeline/image11.jpg",
  "/timeline/image12.jpeg",
  "/timeline/image13.jpeg",
  "/timeline/image14.jpeg",
  "/timeline/image15.jpg",
];

const PHASES: Phase[] = [
  {
    id: 1,
    title: "Origins",
    subtitle: "A universe of lone heroes ignites.",
    accent: "#e62429",
    bgFrom: "from-black",
    bgVia: "via-[#15050a]",
    bgTo: "to-[#0a0f24]",
    events: [
      {
        title: "Iron Man",
        year: "2008",
        line: "A genius forges armor and begins an era.",
        tone: "from-[#351219] to-[#090d1f]",
      },
      {
        title: "The Incredible Hulk",
        year: "2008",
        line: "Power and control collide under pressure.",
        tone: "from-[#172912] to-[#0a1218]",
      },
      {
        title: "Thor",
        year: "2011",
        line: "Myth descends from the stars into Earth.",
        tone: "from-[#201638] to-[#0b1223]",
      },
    ],
  },
  {
    id: 2,
    title: "Expansion",
    subtitle: "Alliances form and rivalries sharpen.",
    accent: "#fb3d4f",
    bgFrom: "from-[#05060d]",
    bgVia: "via-[#1a0a16]",
    bgTo: "to-[#08152a]",
    events: [
      {
        title: "The Avengers",
        year: "2012",
        line: "Earth's mightiest stand together for the first time.",
        tone: "from-[#3f1a20] to-[#0b1730]",
      },
      {
        title: "Captain America: The Winter Soldier",
        year: "2014",
        line: "Trust fractures inside the system.",
        tone: "from-[#252d3f] to-[#12141d]",
      },
      {
        title: "Guardians of the Galaxy",
        year: "2014",
        line: "Cosmic misfits redefine destiny.",
        tone: "from-[#191c4a] to-[#2c0f2f]",
      },
    ],
  },
  {
    id: 3,
    title: "Infinity Saga",
    subtitle: "Every path converges into one final stand.",
    accent: "#ff5969",
    bgFrom: "from-[#07070d]",
    bgVia: "via-[#210914]",
    bgTo: "to-[#0d1d39]",
    events: [
      {
        title: "Avengers: Infinity War",
        year: "2018",
        line: "The universe falls silent in a single moment.",
        tone: "from-[#3a0f17] to-[#11172d]",
      },
      {
        title: "Captain Marvel",
        year: "2019",
        line: "Cosmic fire returns with unstoppable momentum.",
        tone: "from-[#2f0d20] to-[#0a2750]",
      },
      {
        title: "Avengers: Endgame",
        year: "2019",
        line: "Time itself bends for one last chance.",
        tone: "from-[#3f101b] to-[#0a1a31]",
      },
    ],
  },
  {
    id: 4,
    title: "Multiverse Begins",
    subtitle: "Branches split and realities overlap.",
    accent: "#8b5cf6",
    bgFrom: "from-[#05070f]",
    bgVia: "via-[#16113a]",
    bgTo: "to-[#0e2a4a]",
    events: [
      {
        title: "WandaVision",
        year: "2021",
        line: "Grief rewrites reality frame by frame.",
        tone: "from-[#351247] to-[#0b1737]",
      },
      {
        title: "Loki",
        year: "2021",
        line: "The sacred timeline fractures into chaos.",
        tone: "from-[#2a2452] to-[#132330]",
      },
      {
        title: "Spider-Man: No Way Home",
        year: "2021",
        line: "Worlds collide and identities are rewritten.",
        tone: "from-[#40132c] to-[#0d2354]",
      },
    ],
  },
  {
    id: 5,
    title: "Multiverse Chaos",
    subtitle: "Infinite possibilities wage war for one future.",
    accent: "#4f7dff",
    bgFrom: "from-[#050913]",
    bgVia: "via-[#120f42]",
    bgTo: "to-[#1f1b52]",
    events: [
      {
        title: "Doctor Strange in the Multiverse of Madness",
        year: "2022",
        line: "Dimensions tear under impossible choices.",
        tone: "from-[#251156] to-[#111d4b]",
      },
      {
        title: "Ant-Man and the Wasp: Quantumania",
        year: "2023",
        line: "A hidden realm reveals the next threat.",
        tone: "from-[#28164f] to-[#0f2f57]",
      },
      {
        title: "Avengers: Secret Wars",
        year: "TBA",
        line: "Battleworld rises as timelines collide.",
        tone: "from-[#2a1a58] to-[#1b2f67]",
      },
    ],
  },
];

export default function Timeline() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const phaseRefs = useRef<(HTMLElement | null)[]>([]);
  const [activePhase, setActivePhase] = useState(1);

  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${(index * 29) % 100}%`,
        delay: `${(index % 9) * 0.35}s`,
        duration: `${4 + (index % 6)}s`,
      })),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".timeline-event-card").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 48, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".phase-parallax-layer").forEach((layer) => {
        gsap.to(layer, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: layer,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      phaseRefs.current.forEach((phaseElement, index) => {
        if (!phaseElement) return;
        ScrollTrigger.create({
          trigger: phaseElement,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              setActivePhase(index + 1);
              document.documentElement.style.setProperty(
                "--timeline-accent",
                PHASES[index].accent
              );
            }
          },
        });
      });

      gsap.fromTo(
        ".story-link",
        { strokeDashoffset: 240 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          stagger: 0.18,
          scrollTrigger: {
            trigger: ".story-web",
            start: "top 78%",
          },
        }
      );

      gsap.to(".energy-pulse", {
        scale: 1.45,
        opacity: 0,
        duration: 1.9,
        repeat: -1,
        ease: "sine.out",
        stagger: 0.25,
      });

      gsap.fromTo(
        ".hero-copy",
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out" }
      );
    });

    return () => {
      ctx.revert();
      document.documentElement.style.removeProperty("--timeline-accent");
    };
  }, []);

  const activeMeta = PHASES[activePhase - 1] ?? PHASES[0];

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-gradient-to-b ${activeMeta.bgFrom} ${activeMeta.bgVia} ${activeMeta.bgTo} text-white transition-all duration-1000`}
    >
      <style jsx global>{`
        :root {
          --timeline-accent: #e62429;
        }
        .timeline-beam {
          box-shadow: 0 0 24px color-mix(in srgb, var(--timeline-accent) 65%, #6638ff 35%);
        }
        .phase-node {
          box-shadow: 0 0 18px color-mix(in srgb, var(--timeline-accent) 70%, #5f6fff 30%);
        }
      `}</style>

      <Navbar />

      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="phase-parallax-layer absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#e62429]/15 blur-3xl" />
        <div className="phase-parallax-layer absolute right-[-120px] top-[22%] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="phase-parallax-layer absolute left-[35%] top-[60%] h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:px-12">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute h-1 w-1 rounded-full bg-white/60"
            style={{
              left: star.left,
              top: star.top,
              animation: `starPulse ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}

        <div className="hero-copy relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-5 font-circular-web text-xs uppercase tracking-[0.42em] text-white/60 md:text-sm">
            Cinematic Timeline Experience
          </p>
          <h1 className="font-zentry text-6xl uppercase leading-[0.86] text-white md:text-8xl lg:text-[9rem]">
            THE STORY SO FAR
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-circular-web text-sm text-white/75 md:text-lg">
            Enter a universe shaped by sacrifice, legacy, and multiversal conflict. Scroll to travel through phases, pivotal events, and the arcs that bind them.
          </p>
          <div className="mt-14 flex flex-col items-center gap-2 text-white/60">
            <span className="font-circular-web text-xs uppercase tracking-[0.3em] md:text-sm">
              Scroll to begin
            </span>
            <span className="h-10 w-[1px] bg-gradient-to-b from-white/80 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto flex w-full max-w-7xl gap-8 px-4 pb-24 md:px-10 lg:px-14">
        <aside className="sticky top-16 hidden h-fit w-56 self-start rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md md:block">
          <p className="font-circular-web text-xs uppercase tracking-[0.25em] text-white/50">
            Current Phase
          </p>
          <h2 className="mt-2 text-3xl font-zentry uppercase" style={{ color: "var(--timeline-accent)" }}>
            {activeMeta.title}
          </h2>
          <p className="mt-3 text-sm text-white/65">{activeMeta.subtitle}</p>

          <div className="mt-6 space-y-3">
            {PHASES.map((phase) => (
              <div key={phase.id} className="flex items-center gap-3">
                <span
                  className={`phase-node h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    activePhase === phase.id ? "scale-125" : "opacity-45"
                  }`}
                  style={{ backgroundColor: phase.accent }}
                />
                <span
                  className={`font-circular-web text-xs uppercase tracking-[0.18em] transition-all duration-500 ${
                    activePhase === phase.id ? "text-white" : "text-white/40"
                  }`}
                >
                  Phase {phase.id}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className="relative w-full">
          <div className="timeline-beam absolute left-4 top-0 hidden h-full w-[2px] bg-gradient-to-b from-white/30 via-white/90 to-white/20 md:block" />

          <div className="space-y-24">
            {PHASES.map((phase, phaseIndex) => (
              <article
                key={phase.id}
                ref={(element) => {
                  sectionRefs.current[phaseIndex] = element;
                  phaseRefs.current[phaseIndex] = element;
                }}
                className="relative rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm md:p-8"
              >
                <div className="mb-8 flex items-center gap-5">
                  <div className="phase-node h-4 w-4 rounded-full" style={{ backgroundColor: phase.accent }} />
                  <div>
                    <p className="font-circular-web text-xs uppercase tracking-[0.22em] text-white/55">
                      Phase {phase.id}
                    </p>
                    <h3 className="font-zentry text-4xl uppercase md:text-5xl">{phase.title}</h3>
                  </div>
                </div>

                <p className="mb-10 max-w-3xl font-circular-web text-sm text-white/70 md:text-base">
                  {phase.subtitle}
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {phase.events.map((eventItem, eventIndex) => (
                    <div
                      key={eventItem.title}
                      className="timeline-event-card group relative overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-4 transition-all duration-700 hover:border-white/35"
                    >
                      <div
                        className={`relative mb-4 h-56 overflow-hidden rounded-xl bg-gradient-to-br ${eventItem.tone}`}
                      >
                        <Image
                          src={TIMELINE_POSTERS[phaseIndex * 3 + eventIndex]}
                          alt={`${eventItem.title} timeline poster`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
                        <div className="absolute inset-0 bg-black/20" />
                        {/* <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.3em] text-white/85">
                          Poster Placeholder
                        </div> */}
                      </div>

                      <div className="flex items-center justify-between">
                        <h4 className="font-zentry text-3xl uppercase leading-[0.9]">{eventItem.title}</h4>
                        <span
                          className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em]"
                          style={{ color: phase.accent }}
                        >
                          {eventItem.year}
                        </span>
                      </div>

                      <p className="mt-4 font-circular-web text-sm text-white/70">{eventItem.line}</p>

                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        <div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            boxShadow: `inset 0 0 45px color-mix(in srgb, ${phase.accent} 35%, #6b7dff 65%)`,
                          }}
                        />
                      </div>

                      <span
                        className="absolute right-4 top-4 h-2 w-2 rounded-full"
                        style={{ backgroundColor: phase.accent }}
                      />
                      {eventIndex < phase.events.length - 1 && (
                        <span className="absolute -bottom-3 left-1/2 hidden h-10 w-[1px] -translate-x-1/2 bg-gradient-to-b from-white/70 to-transparent lg:block" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              </article>
            ))}
          </div>
        </div>
      </section>

     

      <style jsx global>{`
        @keyframes starPulse {
          0%,
          100% {
            opacity: 0.18;
            transform: translateY(0px) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
