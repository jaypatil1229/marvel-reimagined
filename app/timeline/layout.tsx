import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline | Marvel Reimagined",
  description:
    "Travel through cinematic phases, key events, and story arcs across the Marvel Reimagined timeline.",
};

export default function TimelineLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
