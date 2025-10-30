"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const linkItems = [
    {
      name: "GitHub",
      icon: "/icons/github-icon.png",
      alt: "GitHub Icon",
      href: "https://github.com/zaamold",
    },
    {
      name: "LinkedIn",
      icon: "/icons/linkedin-icon.png",
      alt: "LinkedIn Icon",
      href: "https://www.linkedin.com/in/zachary-aamold/",
    },
    {
      name: "YouTube",
      icon: "/icons/youtube-icon.png",
      alt: "YouTube Icon",
      href: "https://www.youtube.com/@zacharyaamold3633/videos",
    },
    {
      name: "Spotify",
      icon: "/icons/spotify-icon.png",
      alt: "Spotify Icon",
      href: "https://open.spotify.com/artist/5orsFXWTok1Tiz6jnFkKUm?si=k0Dy9CX4TIWYSopTyfsgsw",
    },
    {
      name: "Xbox",
      icon: "/icons/xbox-icon.png",
      alt: "Xbox Icon",
      href: "https://www.xbox.com/en-US/play/user/Zook1050",
    },
  ];

  return (
    <footer className="bottom-0 left-0 w-full bg-purple-100 backdrop-blur-md border-t border-gray-200 shadow-sm z-90">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Site name */}
        <p className="text-xs md:text-sm">Find me around the internet!</p>

        <div className="flex gap-x-1 md:gap-x-4">
          {linkItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              className={`w-10 md:w-12 p-2 rounded-md text-sm font-medium transition-all hover:bg-purple-100 hover:text-purple-700`}
            >
              <Image src={item.icon} width={376} height={376} alt={item.alt} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
