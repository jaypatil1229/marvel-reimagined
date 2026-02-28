"use client";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import AnimatedTitle from "../../components/AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.fade-in-section').forEach((section) => {
      gsap.fromTo(section, 
        { autoAlpha: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          duration: 1, 
          autoAlpha: 1, 
          y: 0,
          ease: "power3.out"
        }
      );
    });
  }, []);

  return (
    <div className="relative min-h-screen w-screen bg-black text-white font-general overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-20 fade-in-section">
          <AnimatedTitle 
            title="THE INFINITY<br />UX SAGA"
            containerClass="!text-red-600 !mb-4 text-center"
          />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl font-circular-web">
            A comprehensive UX/UI Strategy & Interactive Plan for building a cinematic Marvel Studios timeline website inspired by Awwwards-winning experiences.
          </p>
        </div>

        <div className="space-y-24">
          
          <section className="fade-in-section border-l-4 border-red-600 pl-6 lg:pl-10">
            <h2 className="text-4xl md:text-5xl font-zentry uppercase mb-6 text-red-600">Top 10 Inspirational Sites To Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <ul className="space-y-4">
                  <li><strong>1. Spotify Wrapped (Yearly):</strong> Data viz, scroll-triggered narrative transitions.</li>
                  <li><strong>2. The Silurians (by Active Theory):</strong> Deep WebGL 3D environments, seamless page transitions.</li>
                  <li><strong>3. Bruno Simon Portfolio:</strong> 3D gamified exploration, physics-based interaction.</li>
                  <li><strong>4. NASA's Perseverance/Mars Sites:</strong> Realistic 3D model rendering, cinematic scroll hijacking for story.</li>
                  <li><strong>5. Gucci Flora:</strong> High-end graphical fidelity, dreamy micro-animations.</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li><strong>6. Into the Spider-Verse Promo Sites:</strong> Halftone patterns, offset glitch typography, comic-to-screen transitions.</li>
                  <li><strong>7. Apple Product Pages (e.g., iPhone Pro):</strong> Hardware revealing via scroll triggers, sticky scroll sections.</li>
                  <li><strong>8. High-End Automotive Configurators (Porsche/Audi):</strong> Depth of field, environment changes reacting to user input.</li>
                  <li><strong>9. Star Wars Zero:</strong> Parallax layered storytelling and multi-axis scrolling.</li>
                  <li><strong>10. Two Robbers Hard Seltzer:</strong> Brutalist yet highly animated, comic-like grid storytelling.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="fade-in-section">
            <h2 className="text-4xl md:text-5xl font-zentry uppercase mb-8 border-b border-gray-800 pb-4">Cinematic UX/UI Strategy</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-red-600 transition-colors duration-500">
                <h3 className="text-2xl font-bold mb-4 text-red-500 font-circular-web">Navigation Patterns</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li><strong>Scroll Timeline:</strong> Moving along a Z-axis (into the screen) or angled isometric line, not just vertical.</li>
                  <li><strong>Multiverse Branching:</strong> Hold interaction or drag to snap to parallel timelines (TVA style).</li>
                  <li><strong>Character Web:</strong> Node-based exploration map instead of standard dropdown menus.</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-red-600 transition-colors duration-500">
                <h3 className="text-2xl font-bold mb-4 text-red-500 font-circular-web">Animation & Motion</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li><strong>Scroll Triggers:</strong> Tie video playback rate and 3D camera position to exact `window.scrollY`.</li>
                  <li><strong>Narrative Reveals:</strong> Dust-away (Thanos snap) or glitch (Spider-Verse) effects on page transitions.</li>
                  <li><strong>Easing:</strong> Use exponential easing `expo.out` to feel weighty and cinematic.</li>
                </ul>
              </div>

            </div>
          </section>

          <section className="fade-in-section">
            <h2 className="text-4xl md:text-5xl font-zentry uppercase mb-8 border-b border-gray-800 pb-4">Components & Interactions</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl text-red-600 font-zentry">01</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Magnetic Custom Cursor</h4>
                  <p className="text-gray-400">Cursor acts as a glowing "Infinity Stone" light source. It snaps to interactive elements (magnetic effect) and casts a subtle WebGL radial glow on the DOM underneath.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl text-red-600 font-zentry">02</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Cinematic Hero</h4>
                  <p className="text-gray-400">Starts with a 3D animated Marvel Studios logo that seamlessly becomes the UI via camera fly-through. Sound design (orchestral swell) triggers on load.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl text-red-600 font-zentry">03</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Multiverse Switcher</h4>
                  <p className="text-gray-400">A slider or toggle that applies post-processing shaders (e.g., retro TVA orange CRT effect vs Quantum Realm purple particles) globally to the entire site.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="fade-in-section bg-red-900/20 p-10 rounded-3xl border border-red-900/50">
            <h2 className="text-4xl md:text-5xl font-zentry uppercase mb-6 text-red-500">Suggested Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-xl font-bold text-white mb-1">React / Next.js</div>
                <div className="text-sm text-gray-400">Server-side rendering & robust routing structure.</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-1">Three.js / R3F</div>
                <div className="text-sm text-gray-400">For 3D elements, shaders, particle systems, and models.</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-1">GSAP</div>
                <div className="text-sm text-gray-400">ScrollTrigger and advanced timeline orchestration.</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-1">Lenis</div>
                <div className="text-sm text-gray-400">Smooth scrolling library to ensure consistent parallax math.</div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
