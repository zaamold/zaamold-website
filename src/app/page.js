import Headshot from "../../components/ui/headshot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <p>Hello, world!</p>
      <div className="py-30 flex w-full justify-center items-center">
      <Headshot />
      </div>
    </div>
  );
}
