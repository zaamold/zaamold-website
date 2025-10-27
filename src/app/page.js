import Link from "next/link";
import Headshot from "../../components/ui/headshot";
import RotatingWords from "../../components/ui/rotating-words";

export default function Home() {
  return (
    <>
    <div className="bg-white">
      <div className="py-20 flex md:flex-row flex-col mx-auto max-w-6xl justify-around items-center">
        <div className="flex flex-col md:w-1/2 w-7/8">
          <p className="text-4xl font-bold">Hey there!</p>
          <p className="py-4">
            Welcome to my website. This is where I keep all the cool stuff I want to share with folks.
            Thanks for stopping by, hope you enjoy. :P</p>
          <p className="text-2xl font-bold">My deal:</p>
          <RotatingWords
          words={[
            "Web Developer",
            "Mobile App Developer",
            "UI/UX Designer",
            "Gamer",
            "Musician",
            "Video Editor",
            "Gym-goer",
            "Happy Husband",
            "Spoiler of dogs",
          ]}
          interval={2500}
          />
        </div>
        <div className="md:mt-0 mt-8">
          <Headshot />
        </div>
      </div>
    </div>
    <div className="bg-purple-50 py-15 flex flex-col max-w-full justify-around items-center">
      <p className="text-3xl md:text-4xl font-bold text-center">Want to know more about my career?</p>
      <div className="flex md:flex-row flex-col w-full justify-center items-center py-8 gap-8">
        <Link
        href="/portfolio"
        className="px-4 py-2 text-center w-48 rounded-full bg-purple-700 text-white font-medium transition-all hover:bg-purple-200 hover:text-purple-700"
        >
          See my portfolio
        </Link>
        <Link
        href="/docs/zaamold-resume-2025.pdf"
        target="_blank"
        className="px-4 py-2 text-center w-48 rounded-full bg-purple-700 text-white font-medium transition-all hover:bg-purple-200 hover:text-purple-700"
        >
          View my resume
        </Link>
      </div>
    </div>
    <div className="bg-white py-20 flex flex-col max-w-full justify-around items-center">
      <p className="text-4xl font-bold text-center">About Me</p>
    </div>
    </>
  );
}
