"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TechGrid() {
  const techList = [
    {
      name: "React",
      description: "A JavaScript library for building user interfaces.",
      link: "https://react.dev/",
      icon: "/icons/react-icon.png",
    },
    {
      name: "Next.js",
      description: "A React framework for building full-stack web apps.",
      link: "https://nextjs.org/docs",
      icon: "/icons/nextjs-icon.png",
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapid UI development.",
      link: "https://tailwindcss.com/docs",
      icon: "/icons/tailwind-css-icon.png",
    },
    {
      name: "GitHub",
      description:
        "A platform for hosting, collaborating on, and reviewing code.",
      link: "https://docs.github.com/en/get-started/start-your-journey/about-github-and-git",
      icon: "/icons/github-icon-purple.png",
    },
    {
      name: "Vercel",
      description: "A platform for deploying and hosting modern web projects.",
      link: "https://vercel.com/docs",
      icon: "/icons/vercel-icon.png",
    },
  ];

  const [flipped, setFlipped] = useState({});

  const toggleFlip = (name) => {
    setFlipped((prev) => ({ [name]: !prev[name] }));
  };

  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold text-center mb-12">
        This website is powered by:
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto px-4">
        {techList.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            onClick={() => toggleFlip(tech.name)}
            className="group [perspective:1000px] w-full h-56 cursor-pointer select-none"
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                flipped[tech.name]
                  ? "[transform:rotateY(180deg)]"
                  : "group-hover:[transform:rotateY(180deg)]"
              }`}
            >
              {/* Front side */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 [backface-visibility:hidden]">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold">{tech.name}</h3>
              </div>

              {/* Back side */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-700 text-white rounded-2xl px-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <p className="text-sm mb-3">{tech.description}</p>
                <a
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-purple-200 transition-colors"
                  onClick={(e) => e.stopPropagation()} // prevents card from flipping back when link clicked
                >
                  View Docs →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
