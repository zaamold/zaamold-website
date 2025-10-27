import Timeline from "@/components/ui/timeline";

export default function PortfolioPage() {
  const careerEvents = [
    {
      title: "Web & Mobile Applications Developer",
      subtitle: "Car Keys Express (Remote)",
      date: "2020 - Present",
      description:
        "Full-stack developer building mobile apps and websites. Supports Ecommerce and internal initiatives for automotive key replacement solutions.",
      technologies: [
        "React Native",
        "Expo",
        "Javascript",
        "Java (Android Studio)",
        "Next.js",
        "React",
        "Tailwind CSS",
        "PHP",
        "Laravel",
        "MySQL",
        "Bootstrap",
        "Vercel",
        "DeployHQ",
        "Basecamp",
        "Jira",
        "GitLab",
        "GitHub"
      ],
      links: [
        {
          name: "Web Store",
          href: "https://store.carkeysexpress.com",
        },
        {
          name: "Company Site",
          href: "https://carkeysexpress.com/",
        },
      ]
    },
    {
      title: "Java Developer Contractor",
      subtitle: "HYTE Technologies (Sherman, TX)",
      date: "Summers of 2018 & 2019",
      description:
        "Summer internships focused on large-scale refactors of code and creating JUnit test suites. Assisted in the evolution of software that is actively being used by Fortune 50 customers.",
      technologies: [
        "Java",
        "GitHub"
      ],
      links: [
        {
          name: "Company Site",
          href: "https://hyte.io/",
        },
      ]
    },
    {
      title: "Bachelor's in Computer Science & Communications",
      subtitle: "Austin College (Sherman, TX)",
      date: "2016 – 2020",
      description:
        "Graduated summa cum laude. Learned CS core fundamentals, data structures, networking, software engineering, video game development, and several programming languages. Tutored CS students for two years. President of the Computer Science & Robotics Club for one year.",
      technologies: [
        "Java",
        "Python",
        "Swift (XCode)",
        "Unity (game engine)",
        "C#",
        "Arduino (C++)",
        "GitHub",
        "SQLite",
        "C",
        "Haskell",
      ],
      links: [
        {
          name: "School Site",
          href: "https://www.austincollege.edu/",
        },
      ]
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-6">My Journey</h2>
        <Timeline events={careerEvents} />
      </section>
    </main>
  );
  
}