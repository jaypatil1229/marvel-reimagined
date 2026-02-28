"use client";
import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Story from "../components/Story";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CharacterShowcase from "../components/CharacterShowcase";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <CharacterShowcase />
      <Story />
      <Contact />
      <Footer />
    </div>
  );
}
