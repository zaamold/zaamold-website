"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Header from "./ui/header";
import Footer from "./ui/footer";

export default function LayoutWrapper({ children }) {
  const segments = useSelectedLayoutSegments();

  // segments example:
  // [] → home page
  // ["games"] → /games
  // ["games", "snake"] → /games/snake

  // We want to disable header/footer for any route under /games/(playable)
  const isPlayable = segments.includes("snake");
  // ↑ or check generically for deeper routes:
  // const isPlayable = segments[0] === "games" && segments.length > 1;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {!isPlayable && <Header />}

      {/* Main content area */}
      <main className="flex-grow">{children}</main>

      {/* Footer is always pinned to bottom */}
      {!isPlayable && <Footer />}
    </div>
  );
}
