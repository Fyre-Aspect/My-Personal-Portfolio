export interface Project {
  title: string;
  description: string;
  role: string;
  technologies: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  videoUrl?: string | null;
  image: string | null;
  status?: string | null;
  demoLabel?: string;
}

export const projects: Project[] = [
  {
    title: "STEAM ICAC 2026 — Saliency-Aware Video Codec",
    description:
      "Saliency-aware video codec for stationary surveillance cameras, presented at the STEAM Innovation Challenge Annual Conference 2026 (University of Toronto). Exploits fixed camera viewpoints by replacing non-salient pixels with a learned background, then compresses with H.265 — inter-frame prediction collapses static regions to near-zero bits. Achieved 81% file size reduction on 1080p footage (33.9 MB → 6.5 MB) and 34.76 dB PSNR on salient content. Output is fully standards-compliant H.265 mp4, compatible with any decoder.",
    role: "Computer Science Researcher",
    technologies: ["Python", "YOLOv8", "H.265 / libx265", "OpenCV", "PyTorch", "Optical Flow", "NumPy"],
    liveUrl: null,
    githubUrl: "https://github.com/SaiAmartya/steam-icac-2026",
    image: "/Medal.png",
    status: "STEAM ICAC 2026 — CS Showcase",
  },
  {
    title: "MechMania — Robot Controller",
    description:
      "Researched ESP32 wireless comms from scratch, wrote connection firmware, then built the handheld controller hardware end-to-end. Went undefeated through a 12-team ladder tournament.",
    role: "Controller Engineer",
    technologies: ["ESP32", "C++", "Embedded Systems", "Wireless Comms", "Circuit Wiring"],
    liveUrl: null,
    githubUrl: null,
    image: "/Mechmania.jpg",
    status: "1st Place — 12 Teams",
  },
  {
    title: "Waypoint",
    description:
      "AI case memory platform for social workers built at HackCanada. Voice ingestion turns field memos into structured notes, thread-scoped RAG isolates each client's data, and audio recaps brief workers between visits.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Auth0", "Supabase", "ElevenLabs", "Gemini", "Backboard.io"],
    liveUrl: "https://waypoint-taupe.vercel.app",
    githubUrl: "https://github.com/waypoint9404-ops/hackcanada",
    videoUrl: "https://www.youtube.com/watch?v=b7HLdGY1vIY&t=1s",
    image:
      "https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png",
    status: "HackCanada — Top 7th Overall",
  },
  {
    title: "LangLua",
    description:
      "Chrome extension + React dashboard built at EurekaHacks. Replaces words on any page with translations — hover for ElevenLabs audio and Gemini-powered quizzes. Streak and LinguaCoins gamification across 10 languages.",
    role: "Full-Stack Developer",
    technologies: ["Chrome Extension MV3", "TypeScript", "React", "Gemini", "ElevenLabs", "Vite"],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/LangLUI",
    image: "/Langlua.png",
    status: "EurekaHacks",
  },
  {
    title: "Tidal Tasks",
    description:
      "AI task management platform with real-time collaboration, project analytics, and automated workflows. I handle admin development and ongoing feature implementation.",
    role: "Admin Developer",
    technologies: ["React", "TypeScript", "Firebase", "Gemini API", "Tailwind CSS"],
    liveUrl: "https://tidaltasks.app",
    githubUrl: null,
    image: "/Tidal Tasks.png",
    status: null,
  },
  {
    title: "Lyra Tutor AI",
    description:
      "AI teaching assistant built into Discord voice calls. Joins study sessions and answers questions in real time via dynamic API integration. Built in 36 hours at Hack the Valley 2025.",
    role: "Full-Stack Developer & Team Lead",
    technologies: ["TypeScript", "Discord API", "Next.js", "AI APIs"],
    liveUrl: "https://drive.google.com/file/d/13ddMZT3ef86wQq0UwaW_hvPqQTuHNiIc/view?usp=sharing",
    githubUrl: "https://github.com/Fyre-Aspect/LyraTutorAI",
    image: "/Tutor Bot.png",
    status: null,
    demoLabel: "Watch Demo",
  },
  {
    title: "Shurplus",
    description:
      "Food rescue logistics platform connecting donors, volunteers, and food banks. AI agents handle inventory management, route optimization, and barcode-based expiry tracking. 3rd place at NeoDev Hackathon.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "AI Agents", "Computer Vision", "Barcode Scanning"],
    liveUrl: "https://shurplus.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/ShurPlus-AI",
    videoUrl: "https://drive.google.com/file/d/1FZ8oS6N8X4uBfk2XLDgoTzGiVSs1T8UM/view",
    image: "/ShurPlus.png",
    status: "3rd Place — NeoDev",
    demoLabel: "View Demo",
  },
  {
    title: "CatBot",
    description:
      "AI tutor chatbot that explains hard concepts in plain language and surfaces relevant video links. Powered by Gemini API with a Next.js + Firebase backend.",
    role: "Full-Stack Developer",
    technologies: ["Gemini API", "Next.js", "Firebase", "TypeScript"],
    liveUrl: "https://catgpt-nine.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/CatBot",
    image: "/CatBot.png",
    status: null,
  },
  {
    title: "Personal Portfolio",
    description:
      "This site — built from scratch with Next.js and custom CSS. Smooth animations, dark fire theme, and an integrated AI chat assistant.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "CSS", "Gemini API"],
    liveUrl: "https://aamirtinwalapersonal-portfolio.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/My-Personal-Portfolio",
    image: "/Website.png",
    status: null,
  },
  {
    title: "Arduino Tetris",
    description:
      "Classic Tetris on Arduino controlled by joystick, with real-time score tracking and LED matrix display.",
    role: "Embedded Developer",
    technologies: ["Arduino", "C++", "LED Matrix"],
    liveUrl: "https://arduino-tetris-game.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/Arduino-Tetris-Game",
    image: "/Tetris_logo.png",
    status: null,
  },
  {
    title: "Temperature Humidity Logger",
    description:
      "Arduino environmental monitor that tracks temperature and humidity in real time via DHT sensor with serial data output.",
    role: "IoT Developer",
    technologies: ["Arduino", "C++", "DHT Sensor", "Data Logging"],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Temperature-Humidity-Sensor",
    image: "/tempsensor.png",
    status: null,
  },
];
