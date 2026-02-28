import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Profile | Marvel Reimagined",
  description:
    "View cinematic hero details, powers, stats, and story highlights in the Marvel Reimagined archive.",
};

export default function CharacterDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
