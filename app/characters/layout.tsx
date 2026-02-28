import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heroes | Marvel Reimagined",
  description:
    "Browse hero dossiers and enter detailed profiles from the Marvel Reimagined universe.",
};

export default function CharactersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
