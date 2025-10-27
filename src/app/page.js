import Headshot from "../../components/ui/headshot";
import RotatingWords from "../../components/ui/rotating-words";

export default function Home() {
  return (
    <div className="">
      <div className="py-20 flex md:flex-row flex-col max-w-6xl justify-around items-center">
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
            "Musician",
            "Happy Husband",
            "Gamer",
            "Dog Spoiler",
          ]}
          interval={2500}
          />
        </div>
        <div className="md:mt-0 mt-8">
          <Headshot />
        </div>
      </div>
    </div>
  );
}
