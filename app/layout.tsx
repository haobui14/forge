import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StickyNav } from "@/components/nav/StickyNav";
import { Footer } from "@/components/nav/Footer";
import { getUserState } from "@/lib/data";
import { CATALOG } from "@/content/system-design/_catalog";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Forge — learn the systems behind the software",
    template: "%s · Forge",
  },
  description:
    "Roadmap-driven deep dives into system design, frontend, backend, data structures and algorithms. Read deeply, earn XP, keep the streak alive.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserState();
  const done = new Set(user.completedSlugs);
  const current = CATALOG.find((l) => !done.has(l.slug)) ?? CATALOG[CATALOG.length - 1];

  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <StickyNav
          signedIn={user.signedIn}
          streak={user.streak}
          xp={user.xp}
          currentLessonSlug={current.slug}
        />
        <main className="flex-1">{children}</main>
        <Footer signedIn={user.signedIn} />
      </body>
    </html>
  );
}
