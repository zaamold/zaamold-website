import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <p>Hello, world!</p>
      <div className="flex justify-center items-center m-10 relative w-64 h-64">
        {/* Main image */}
        <Image
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-64 object-cover rounded-full"
          src="/images/headshot/headshot-01.png"
          width={2002}
          height={2002}
          alt="Zach Aamold Image"
        />

        {/* First outline (slightly larger) */}
        <Image
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 scale-[1.08] w-64 h-64 object-cover rounded-full"
          src="/images/headshot/headshot-02.png"
          width={2150}
          height={2150}
          alt="Headshot Outline 1"
        />

        {/* Second outline (even larger) */}
        <Image
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-[1.15] w-64 h-64 object-cover rounded-full"
          src="/images/headshot/headshot-03.png"
          width={2250}
          height={2250}
          alt="Headshot Outline 2"
        />
      </div>
    </div>
  );
}
