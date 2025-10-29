import Link from "next/link";
import "../../globals.css";

export const metadata = {
  title: "Zachary Aamold",
  description: "A portfolio website",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function PlayableGamesLayout({ children }) {
  return (
    <div
      className={`bg-gray-900 text-white min-h-screen`}
      data-layout="playable"
    >
      <header className="flex items-center p-4 bg-gray-800">
        <Link
          href="/games"
          className="text-purple-400 hover:text-purple-300 font-semibold"
        >
          ← Back to Games
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
