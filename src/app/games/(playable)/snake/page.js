"use client";
import { useDisableArrowScroll } from "@/components/hooks/use-disable-arrow-scroll";
import { useDisableSpacebarScroll } from "@/components/hooks/use-disable-spacebar-scroll";
import { useDisableSwipeScroll } from "@/components/hooks/use-disable-swipe-scroll";
import { useVisibilityChange } from "@/components/hooks/use-visibility-change";
import StringHelper from "@/utils/string-helper";
import { useState, useEffect, useRef } from "react";
import "../../../../components/ui/animations.css";
import { Lock } from "lucide-react";

export default function SnakeGame() {
  useDisableArrowScroll();
  useDisableSpacebarScroll();
  const gameRef = useRef(null);
  useDisableSwipeScroll(gameRef);
  const gridSize = 20; // 20x20 cells
  const GameState = Object.freeze({
    START_SCREEN: "START_SCREEN",
    ACTIVE: "ACTIVE",
    PAUSED: "PAUSED",
    ANIMATING_DEATH: "ANIMATING_DEATH",
    GAME_OVER: "GAME_OVER",
  });

  const COLOR_PALETTES = {
    classic: {
      snake: ["#22c55e"], // bright green
      food: "#dc2626", // strong red (natural contrast, classic apple look)
      cost: 0,
    },
    fire: {
      snake: ["#f97316", "#ef4444", "#b91c1c"], // orange → red
      food: "#2563eb", // vivid royal blue, stands out sharply
      cost: 5,
    },
    ocean: {
      snake: ["#3b82f6", "#06b6d4", "#0ea5e9"], // blue tones
      food: "#f43f5e", // pink-red coral, complementary to teal/blue
      cost: 10,
    },
    forest: {
      snake: ["#166534", "#16a34a", "#4ade80"], // deep to light greens
      food: "#e11d48", // vibrant crimson berry red
      cost: 15,
    },
    neon: {
      snake: ["#d946ef", "#a855f7", "#f0abfc"], // purples/pinks
      food: "#00f5a0", // bright neon mint/teal, high-contrast electric look
      cost: 20,
    },
  };

  const PLAYER_DATA_KEY = "game/snake/player_data";

  const DEFAULT_PLAYER_DATA = {
    coins: 0,
    hasGottenACoin: false,
    unlockedPalettes: ["classic"], // default starting palette
    selectedPalette: "classic",
    highScore: 0,
  };

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [playerData, setPlayerData] = useState(DEFAULT_PLAYER_DATA);
  const [food, setFood] = useState();
  const [coin, setCoin] = useState(null);
  // Accumulated coins in a given playthrough
  const [runCoins, setRunCoins] = useState(0);
  const [dir, setDir] = useState("RIGHT");
  const [gameState, setGameState] = useState(GameState.START_SCREEN);
  const gameStateRef = useRef(gameState);

  const directionLocked = useRef(false);
  const touchStart = useRef(null);
  const DEFAULT_CELL_SIZE = 20;
  const DEFAULT_DEATH_SPEED = 100;
  const [cellSize, setCellSize] = useState(DEFAULT_CELL_SIZE);

  const [score, setScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    setPlayerData(loadPlayerData());
  }, []);

  useEffect(() => {
    if (playerData) {
      savePlayerData();
    }
  }, [playerData]);

  const loadPlayerData = () => {
    const data = localStorage.getItem(PLAYER_DATA_KEY);
    return data ? JSON.parse(data) : DEFAULT_PLAYER_DATA;
  };

  const savePlayerData = () => {
    if (!playerData) return;
    localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(playerData));
  };

  const handlePaletteChange = (paletteKey) => {
    setPlayerData({ ...playerData, selectedPalette: paletteKey });
  };

  // Pauses game if document's visibility changes
  useVisibilityChange((isHidden) => {
    if (isHidden && gameState === GameState.ACTIVE) {
      setGameState(GameState.PAUSED);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 640) {
        // Make grid fit 90% of viewport width
        setCellSize((viewportWidth * 0.9) / gridSize);
      } else {
        setCellSize(DEFAULT_CELL_SIZE); // Default desktop size
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gridSize]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Handle controls
  const handleKeyDown = (e) => {
    const currentState = gameStateRef.current;
    // Pause/un-pause
    if (e.key === "Escape") {
      if (currentState === GameState.ACTIVE) {
        setGameState(GameState.PAUSED);
      } else if (currentState === GameState.PAUSED) {
        setGameState(GameState.ACTIVE);
      }
    }

    // Restart
    if (
      e.key.toLowerCase() === "r" &&
      [GameState.GAME_OVER, GameState.PAUSED].includes(currentState)
    ) {
      restart();
    }

    // Player controls
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
    const lowercaseKey = key.toLowerCase();
    switch (lowercaseKey) {
      case "arrowup":
      case "w":
        return dir !== "DOWN" ? "UP" : null;
      case "arrowdown":
      case "s":
        return dir !== "UP" ? "DOWN" : null;
      case "arrowleft":
      case "a":
        return dir !== "RIGHT" ? "LEFT" : null;
      case "arrowright":
      case "d":
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
    if (
      [GameState.START_SCREEN, GameState.GAME_OVER, GameState.PAUSED].includes(
        gameState
      )
    )
      return;

    let gameInterval = null;
    if (gameState === GameState.ANIMATING_DEATH) {
      gameInterval = animateDeath();
    } else {
      gameInterval = move();
    }
    if (!gameInterval) return;
    return () => clearInterval(gameInterval);
  }, [dir, food, gameState]);

  const move = () => {
    return setInterval(() => {
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
          setScore(score + 1);
          generateFood();
        } else if (coin && head.x === coin.x && head.y === coin.y) {
          setCoin();
          setRunCoins(runCoins + 1);
          newSnake.pop();
        } else {
          newSnake.pop();
        }
        // unlock directional input at start of next frame
        directionLocked.current = false;
        return newSnake;
      });
    }, 150);
  };

  const animateDeath = () => {
    let i = 0;
    let deathSpeed = DEFAULT_DEATH_SPEED;
    let interval = setInterval(() => {
      setSnake((prev) => {
        if (prev.length === 0) {
          clearInterval(interval);
          setFood(undefined);
          setCoin(undefined);
          setGameState(GameState.GAME_OVER);

          let playerDataChanged = false;
          const updatedData = { ...playerData };

          // Update high score if needed
          if (score > playerData.highScore) {
            updatedData.highScore = score;
            setIsNewHighScore(true);
            playerDataChanged = true;
          }

          // Add coins earned this run
          if (runCoins > 0) {
            updatedData.coins += runCoins;
            updatedData.hasGottenACoin = true;
            setRunCoins(0);
            playerDataChanged = true;
          }

          // Save updates if anything changed
          if (playerDataChanged) {
            setPlayerData(updatedData);
          }

          return [];
        }
        i++;
        // Speed up the death animation for every 5 snake pieces "disappeared"
        if (i % 5 === 0) {
          deathSpeed = Math.max(10, deathSpeed - 10);
        }
        return prev.slice(0, -1); // remove one tail segment
      });
    }, deathSpeed);
    return interval;
  };

  const generateFood = () => {
    setFood(getRandomUnoccupiedSpace());

    // Random chance of generating a coin, if one does not already exist
    if (!coin && Math.random() < 0.2) {
      setCoin(getRandomUnoccupiedSpace());
    }
  };

  const getRandomUnoccupiedSpace = () => {
    // Creates a collection of all grid spaces occupied by snake
    const occupied = new Set(snake.map((seg) => `${seg.x},${seg.y}`));
    const freeSpots = [];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Adds unoccupied spaces to an array
        if (!occupied.has(`${x},${y}`)) freeSpots.push({ x, y });
      }
    }

    // Picks an unoccupied space to put an object in
    const index = Math.floor(Math.random() * freeSpots.length);
    return freeSpots[index];
  };

  const onGameOver = () => {
    setGameState(GameState.ANIMATING_DEATH);
  };

  // Restart the game
  const restart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setCoin(undefined);
    generateFood();
    setScore(0);
    setDir("RIGHT");
    setIsNewHighScore(false);
    setGameState(GameState.ACTIVE);
  };

  const displayCoinCount = () => {
    return playerData.coins > 0 || playerData.hasGottenACoin;
  };

  // Precompute overlay text value before each render (faster and cleaner than a function call in the DOM)
  let overlayText = "Snake Game";
  if (gameState === GameState.PAUSED) overlayText = "Paused";
  else if (gameState === GameState.GAME_OVER) overlayText = "Game Over!";

  return (
    <div
      ref={gameRef}
      className="flex flex-col items-center mt-20 h-screen bg-gray-900 text-white"
    >
      <div
        className="relative bg-gray-800 w-[90vw] aspect-square sm:w-auto sm:h-auto touch-none select-none"
        style={{
          width: gridSize * cellSize,
          height: gridSize * cellSize,
        }}
      >
        {/* Score */}
        {gameState !== GameState.GAME_OVER && (
          <p className="absolute z-30 top-4 left-1/2 -translate-x-1/2 opacity-50 text-lg text-center">
            {score}
          </p>
        )}

        {/* Snake segments */}
        {snake.map((seg, i) => {
          const colors = COLOR_PALETTES[playerData.selectedPalette].snake;
          const color =
            colors.length === 1 ? colors[0] : colors[i % colors.length]; // cycle through palette colors

          return (
            <div
              key={i}
              className="absolute transition-transform duration-150"
              style={{
                backgroundColor: color,
                width: cellSize,
                height: cellSize,
                transform: `translate(${seg.x * cellSize}px, ${
                  seg.y * cellSize
                }px)`,
                borderRadius: i === 0 ? "4px" : "2px",
              }}
            />
          );
        })}

        {/* Food */}
        {food && (
          <div
            className="absolute rounded-sm"
            style={{
              backgroundColor: COLOR_PALETTES[playerData.selectedPalette].food,
              width: cellSize,
              height: cellSize,
              transform: `translate(${food.x * cellSize}px, ${
                food.y * cellSize
              }px)`,
            }}
          />
        )}

        {/* Coin */}
        {coin && (
          <div
            className="absolute bg-yellow-500 rounded-sm animate-pulse"
            style={{
              width: cellSize,
              height: cellSize,
              transform: `translate(${coin.x * cellSize}px, ${
                coin.y * cellSize
              }px)`,
            }}
          />
        )}

        {/* Menu Overlay */}
        {[
          GameState.START_SCREEN,
          GameState.GAME_OVER,
          GameState.PAUSED,
        ].includes(gameState) && (
          <div className="absolute z-40 inset-0 bg-black opacity-80 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2">
              {displayCoinCount() && (
                <p>
                  Coins:{" "}
                  <span className={"text-yellow-400 animate-pulse"}>
                    {playerData.coins}
                  </span>
                </p>
              )}
              {playerData.highScore > 0 && (
                <p>
                  High Score:{" "}
                  <span
                    className={
                      isNewHighScore ? "text-yellow-400 animate-pulse" : ""
                    }
                  >
                    {playerData.highScore}
                  </span>
                </p>
              )}

              {isNewHighScore && (
                <span className="absolute -bottom-4 -right-6 text-sm text-yellow-400 font-bold flex space-x-[1px]">
                  {["N", "E", "W", "!"].map((char, i) => (
                    <span
                      key={i}
                      className="animate-pulse"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              )}
            </div>

            <h1 className="text-2xl mb-4">{overlayText}</h1>
            {gameState === GameState.PAUSED && (
              <button
                onClick={() => setGameState(GameState.ACTIVE)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
              >
                {"Continue" + StringHelper.desktopControls("esc")}
              </button>
            )}
            {gameState === GameState.GAME_OVER && (
              <div className="text-center text-lg">
                <p>Score:</p>
                <p className="font-bold">{score}</p>
              </div>
            )}
            <button
              onClick={restart}
              className="px-4 py-2 my-4 bg-purple-600 hover:bg-purple-700 rounded"
            >
              {gameState === GameState.START_SCREEN
                ? "Begin"
                : "Restart" + StringHelper.desktopControls("r")}
            </button>

            <p className="mt-6 text-sm italic text-gray-300">Color Palettes</p>
            <div className="flex space-x-2">
              {Object.entries(COLOR_PALETTES).map(([key, colors]) => {
                const unlocked = playerData.unlockedPalettes.includes(key);
                const cost = colors.cost;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (!unlocked && playerData.coins >= cost) {
                        const updated = {
                          ...playerData,
                          coins: playerData.coins - cost,
                          unlockedPalettes: [
                            ...playerData.unlockedPalettes,
                            key,
                          ],
                          selectedPalette: key,
                        };
                        setPlayerData(updated);
                        savePlayerData(updated);
                      } else if (unlocked) {
                        handlePaletteChange(key);
                      }
                    }}
                    className={`relative p-1 rounded border-2 hover:animate-pulse hover:bg-gray-700 transition-all ${
                      playerData.selectedPalette === key
                        ? "border-yellow-400"
                        : "border-transparent"
                    }`}
                  >
                    {!unlocked && (
                      <div className="absolute w-full h-full inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Lock
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          size={24}
                        />
                      </div>
                    )}
                    <p className="text-sm text-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <div className="flex items-center justify-center space-x-[2px]">
                      {colors.snake.map((c, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1">
                      {unlocked ? "" : `${cost} coins`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Pause Button (mobile only) */}
      <div className="sm:hidden mt-4">
        <button
          onClick={() => {
            if (![GameState.ACTIVE, GameState.PAUSED].includes(gameState))
              return;
            setGameState(
              gameState === GameState.ACTIVE
                ? GameState.PAUSED
                : GameState.ACTIVE
            );
          }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          {gameState === GameState.ACTIVE ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}
