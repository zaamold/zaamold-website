export default function Timeline({ events }) {
    return (
      <div className="relative w-full max-w-3xl mx-auto py-12">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-purple-500" />
  
        <div className="space-y-16">
          {events.map((event, i) => (
            <div
              key={i}
              className={`relative flex items-center w-full ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Timeline dot */}
              <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-700 rounded-full border-4 border-purple-200 z-10" />
  
              {/* Card */}
              <div
                className={`sm:w-[calc(50%-2rem)] w-full sm:text-left text-center w-[calc(50%-2rem)] bg-gray-100 p-4 rounded-xl shadow-md transition-all hover:scale-[1.02] ${
                  i % 2 === 0 ? "text-left" : "text-left sm:text-right"
                }`}
              >
                <h3 className="text-xl font-semibold text-purple-700">
                  {event.title}
                </h3>
                {event.subtitle && (
                  <h4 className="text-sm">
                    {event.subtitle}
                  </h4>
                )}
                {event.date && (
                  <p className="text-xs mt-1">{event.date}</p>
                )}
                {event.description && (
                  <p className="mt-2 leading-snug text-sm md:text-base">
                    {event.description}
                  </p>
                )}
                {event.technologies && (
                    <div>
                        <p className="mt-2 font-semibold">Technologies Used:</p>
                        <ul>
                        {event.technologies.map(tech => (
                            <li className="text-sm">{tech}</li>
                        ))}
                        </ul>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  