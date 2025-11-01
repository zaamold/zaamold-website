import ZoomingImage from "@/components/ui/zooming-image";
import Helper from "@/utils/helper";
import Link from "next/link";
import "../../components/ui/animations.css";

export default function GamesPage() {
  const gameList = [
    {
      name: "Snake Game",
      href: "/games/snake",
      img: {
        style: "transition-all rounded-lg",
        src: "/icons/games/snake.png",
        width: 500,
        height: 500,
        alt: "Snake Game Image",
        hoverText: "Chase the snacks!",
      },
      creators: ["Zachary Aamold"],
    },
  ];

  const tagLines = [
    // "Come on, pick one!", // I'll put this back when there's more than one :)
    "Step right up, step right up",
    "Games games games!",
    "I'll make more of these eventually",
    "oh snap",
    "One-stop shop",
    "What will it do with a really long one? Hwehwehwehwehwehwehwehwe",
    ":)",
    "(^_^)/",
  ];

  const tagLineIndex = Helper.getRandomInt(0, tagLines.length);

  return (
    <div className="min-h-screen max-w-7xl mx-auto mt-10 px-6">
      <h1 className="relative text-4xl text-center font-bold mb-4">
        Games
        <p className="games-splash-text z-10 text-base font-semibold absolute top-1/2 left-[72%] sm:left-[65%] md:left-[60%] lg:left-[58%] -translate-x-1/2 -translate-y-1/2 text-purple-600 whitespace-nowrap">
          {tagLines[tagLineIndex]}
        </p>
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-16 mx-auto my-8 px-4">
        {gameList.map((game) => {
          return (
            <Link href={game.href} key={game.name} className="w-2/3 sm:w-1/5">
              <ZoomingImage
                style={game.img.style}
                src={game.img.src}
                width={game.img.width}
                height={game.img.height}
                alt={game.img.alt}
                hoverText={game.img.hoverText}
              />
              <p className="w-full text-left pt-4 text-3xl font-bold hover:underline">
                {game.name}
              </p>
              {game.creators && (
                <div>
                  <p className="font-semibold">Made by:</p>
                  <ul className="italic text-sm">
                    {game.creators.map((creator) => (
                      <li key={creator}>{creator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
