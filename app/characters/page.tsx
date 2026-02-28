"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import CharacterShowcase from "../../components/CharacterShowcase";
import Footer from "../../components/Footer";

export default function CharactersPage() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <div className="pt-16">
        <CharacterShowcase />
      </div>
      <Footer />
    </div>
  );
}
