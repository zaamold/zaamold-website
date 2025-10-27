import Image from "next/image";

export default function ZoomingImage({
  src,
  width,
  height,
  alt,
  style = "",
  hoverText = "", // optional overlay text
}) {
  return (
    <div className={`relative overflow-hidden group ${style}`}>
      {/* Image */}
      <Image
        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-125"
        src={src}
        width={width}
        height={height}
        alt={alt}
      />

      {/* Overlay (only appears on hover if hoverText provided) */}
      {hoverText && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-medium text-center px-2">
            {hoverText}
          </span>
        </div>
      )}
    </div>
  );
}
