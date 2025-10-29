"use client";
import { useDisableArrowScroll } from "@/components/hooks/use-disable-arrow-scroll";
import { useState, useEffect, useRef } from "react";

export default function SnakeGame() {
  useDisableArrowScroll();
  const gridSize = 20; // 20x20 cells
  const cellSize = 20; // pixels per cell

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  const directionLocked = useRef(false);

  // Handle key presses
  const handleKeyDown = (e) => {
    if (directionLocked.current) return;
    const newDirection = (() => {
      switch (e.key) {
        case "ArrowUp":
          return dir !== "DOWN" ? "UP" : dir;
        case "ArrowDown":
          return dir !== "UP" ? "DOWN" : dir;
        case "ArrowLeft":
          return dir !== "RIGHT" ? "LEFT" : dir;
        case "ArrowRight":
          return dir !== "LEFT" ? "RIGHT" : dir;
        default:
          return dir;
      }
    })();

    if (newDirection !== dir) {
      setDir(newDirection);
      directionLocked.current = true; // prevent further changes this frame
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        // Collision detection
        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          prev.some((p) => p.x === head.x && p.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
        } else {
          newSnake.pop();
        }
        // unlock directional input at start of next frame
        directionLocked.current = false;
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  // Restart the game
  const restart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDir("RIGHT");
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">🐍 Smooth Snake Game</h1>
      {gameOver ? (
        <button
          onClick={restart}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          Restart
        </button>
      ) : (
        <div
          className="relative bg-gray-800"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize,
          }}
        >
          {/* Snake segments */}
          {snake.map((seg, i) => (
            <div
              key={i}
              className="absolute bg-green-500 transition-transform duration-150"
              style={{
                width: cellSize,
                height: cellSize,
                transform: `translate(${seg.x * cellSize}px, ${
                  seg.y * cellSize
                }px)`,
                borderRadius: i === 0 ? "4px" : "2px",
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-red-500 rounded-sm"
            style={{
              width: cellSize,
              height: cellSize,
              transform: `translate(${food.x * cellSize}px, ${
                food.y * cellSize
              }px)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
