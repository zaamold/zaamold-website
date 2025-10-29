"use client";
import { useDisableArrowScroll } from "@/components/hooks/use-disable-arrow-scroll";
import { useDisableSwipeScroll } from "@/components/hooks/use-disable-swipe-scroll";
import { useState, useEffect, useRef } from "react";

export default function SnakeGame() {
  useDisableArrowScroll();
  const gameRef = useRef(null);
  useDisableSwipeScroll(gameRef);
  const gridSize = 20; // 20x20 cells
  const cellSize = 20; // pixels per cell

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  const directionLocked = useRef(false);
  const touchStart = useRef(null);

  // Handle arrow keys
  const handleKeyDown = (e) => {
    if (directionLocked.current) return;

    const newDirection = getNewDirection(e.key);
    if (newDirection) {
      setDir(newDirection);
      directionLocked.current = true;
    }
  };

  // Handle swipe start
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  // Handle swipe end
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      // horizontal swipe
      if (dx > 30) changeDirection("RIGHT");
      else if (dx < -30) changeDirection("LEFT");
    } else {
      // vertical swipe
      if (dy > 30) changeDirection("DOWN");
      else if (dy < -30) changeDirection("UP");
    }

    touchStart.current = null;
  };

  const changeDirection = (newDir) => {
    if (directionLocked.current) return;
    if (isOpposite(dir, newDir)) return;
    setDir(newDir);
    directionLocked.current = true;
  };

  const getNewDirection = (key) => {
    switch (key) {
      case "ArrowUp":
        return dir !== "DOWN" ? "UP" : null;
      case "ArrowDown":
        return dir !== "UP" ? "DOWN" : null;
      case "ArrowLeft":
        return dir !== "RIGHT" ? "LEFT" : null;
      case "ArrowRight":
        return dir !== "LEFT" ? "RIGHT" : null;
      default:
        return null;
    }
  };

  const isOpposite = (a, b) =>
    (a === "UP" && b === "DOWN") ||
    (a === "DOWN" && b === "UP") ||
    (a === "LEFT" && b === "RIGHT") ||
    (a === "RIGHT" && b === "LEFT");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
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
          onGameOver();
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

  const onGameOver = () => {
    setGameOver(true);
    // Returns the snake to its original state -
    // prevents player from lerping on restart
    setSnake([{ x: 10, y: 10 }]);
  };

  // Restart the game
  const restart = () => {
    setFood({ x: 5, y: 5 });
    setDir("RIGHT");
    setGameOver(false);
  };

  return (
    <div
      ref={gameRef}
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white touch-none select-none"
    >
      <h1 className="text-2xl mb-4">Snake Game</h1>

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

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-semibold">Game Over!</p>
            <button
              onClick={restart}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
