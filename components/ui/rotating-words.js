"use client";
import { useState, useEffect } from "react";

export default function RotatingWords({
  words = [],
  interval = 2000, // how often to rotate (ms)
  style = "",
}) {
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 300); // matches flip duration
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div
      className={`relative inline-block perspective-1000 w-64 ${style}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`transition-transform duration-300 transform-gpu ${
          isFlipping ? "rotate-x-90" : "rotate-x-0"
        }`}
      >
        <span className="block text-left text-purple-700 text-2xl font-semibold">
          {words[index]}
        </span>
      </div>
    </div>
  );
}
