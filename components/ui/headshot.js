import Image from "next/image";
import "./animations.css";

export default function Headshot() {
    return (
        <div className="flex justify-center items-center relative w-64 h-64">
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
            className="absolute px-1 py-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 scale-[1.18] w-64 h-64 object-cover rounded-full animate-rotate-slow"
            src="/images/headshot/headshot-02-askew.png"
            width={2150}
            height={2175}
            alt="Headshot Outline 1"
            />

            {/* Second outline (even larger) */}
            <Image
            className="absolute px-1 py-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-[1.2] w-64 h-64 object-cover rounded-full animate-rotate-slow-reverse"
            src="/images/headshot/headshot-03.png"
            width={2250}
            height={2250}
            alt="Headshot Outline 2"
            />
        </div>
    )
}