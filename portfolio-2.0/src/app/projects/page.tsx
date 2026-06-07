import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ProjectsPage() {
const projects = [
  {
    title: "STEAM ICAC 2026 — Saliency-Aware Video Codec",
    description: "Saliency-aware video codec for stationary surveillance cameras, presented at the STEAM Innovation Challenge Annual Conference 2026 (University of Toronto). Exploits fixed camera viewpoints by replacing non-salient pixels with a learned background, then compresses with H.265 — inter-frame prediction collapses static regions to near-zero bits. Achieved 81% file size reduction on 1080p footage (33.9 MB → 6.5 MB) and 34.76 dB PSNR on salient content. Output is fully standards-compliant H.265 mp4, compatible with any decoder.",
    role: "Computer Science Researcher",
    technologies: ["Python", "YOLOv8", "H.265 / libx265", "OpenCV", "PyTorch", "Optical Flow", "NumPy"],
    liveUrl: null,
    githubUrl: "https://github.com/SaiAmartya/steam-icac-2026",
    image: "/Medal.png",
    status: "STEAM ICAC 2026 — CS Showcase"
  },
  {
    title: "MechMania — Robot Controller",
    description: "Researched ESP32 wireless comms from scratch, wrote connection firmware, then built the handheld controller hardware end-to-end. Went undefeated through a 12-team ladder tournament.",
    role: "Controller Engineer",
    technologies: ["ESP32", "C++", "Embedded Systems", "Wireless Comms", "Circuit Wiring"],
    liveUrl: null,
    githubUrl: null,
    image: "/Mechmania.jpg",
    status: "1st Place — 12 Teams"
  },
  {
    title: "Waypoint",
    description: "AI case memory platform for social workers built at HackCanada. Voice ingestion turns field memos into structured notes, thread-scoped RAG isolates each client's data, and audio recaps brief workers between visits.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Auth0", "Supabase", "ElevenLabs", "Gemini", "Backboard.io"],
    liveUrl: "https://waypoint-taupe.vercel.app",
    githubUrl: "https://github.com/waypoint9404-ops/hackcanada",
    videoUrl: "https://www.youtube.com/watch?v=b7HLdGY1vIY&t=1s",
    image: "https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png",
    status: "HackCanada — Top 7th Overall"
  },
  {
    title: "LangLua",
    description: "Chrome extension + React dashboard built at EurekaHacks. Replaces words on any page with translations — hover for ElevenLabs audio and Gemini-powered quizzes. Streak and LinguaCoins gamification across 10 languages.",
    role: "Full-Stack Developer",
    technologies: ["Chrome Extension MV3", "TypeScript", "React", "Gemini", "ElevenLabs", "Vite"],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/LangLUI",
    image: "/Langlua.png",
    status: "EurekaHacks"
  },
  {
    title: "Tidal Tasks",
    description: "AI task management platform with real-time collaboration, project analytics, and automated workflows. I handle admin development and ongoing feature implementation.",
    role: "Admin Developer",
    technologies: ["React", "TypeScript", "Firebase", "Gemini API", "Tailwind CSS"],
    liveUrl: "https://tidaltasks.app",
    githubUrl: null,
    image: "/Tidal Tasks.png",
    status: null
  },
  {
    title: "Lyra Tutor AI",
    description: "AI teaching assistant built into Discord voice calls. Joins study sessions and answers questions in real time via dynamic API integration. Built in 36 hours at Hack the Valley 2025.",
    role: "Full-Stack Developer & Team Lead",
    technologies: ["TypeScript", "Discord API", "Next.js", "AI APIs"],
    liveUrl: "https://drive.google.com/file/d/13ddMZT3ef86wQq0UwaW_hvPqQTuHNiIc/view?usp=sharing",
    githubUrl: "https://github.com/Fyre-Aspect/LyraTutorAI",
    image: "/Tutor Bot.png",
    status: null,
    demoLabel: "Watch Demo"
  },
  {
    title: "Shurplus",
    description: "Food rescue logistics platform connecting donors, volunteers, and food banks. AI agents handle inventory management, route optimization, and barcode-based expiry tracking. 3rd place at NeoDev Hackathon.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "AI Agents", "Computer Vision", "Barcode Scanning"],
    liveUrl: "https://shurplus.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/ShurPlus-AI",
    videoUrl: "https://drive.google.com/file/d/1FZ8oS6N8X4uBfk2XLDgoTzGiVSs1T8UM/view",
    image: "/ShurPlus.png",
    status: "3rd Place — NeoDev",
    demoLabel: "View Demo"
  },
  {
    title: "CatBot",
    description: "AI tutor chatbot that explains hard concepts in plain language and surfaces relevant video links. Powered by Gemini API with a Next.js + Firebase backend.",
    role: "Full-Stack Developer",
    technologies: ["Gemini API", "Next.js", "Firebase", "TypeScript"],
    liveUrl: "https://catgpt-nine.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/CatBot",
    image: "/CatBot.png",
    status: null
  },
  {
    title: "Personal Portfolio",
    description: "This site — built from scratch with Next.js and custom CSS. Smooth animations, dark fire theme, and an integrated AI chat assistant.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "CSS", "Gemini API"],
    liveUrl: "https://aamirtinwalapersonal-portfolio.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/My-Personal-Portfolio",
    image: "/Website.png",
    status: null
  },
  {
    title: "Spell Chess with Stockfish",
    description: "Custom chess app built with Next.js and React where pieces cast spells instead of just moving. Stockfish AI handles the engine, CSS Modules handle the styling — fully playable in the browser.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "React", "TypeScript", "Stockfish AI", "CSS Modules"],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Spell-Chess-With-Stockfish",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
    status: null
  },
  {
    title: "Job Search Automation",
    description: "Python tool that scrapes entry-level dev jobs from Indeed, RemoteOK, and The Muse daily, then emails new matches automatically via GitHub Actions. No more manually refreshing job boards.",
    role: "Automation Developer",
    technologies: ["Python", "GitHub Actions", "SMTP", "RSS", "RemoteOK API", "The Muse API"],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Job-Search-Automation-Tool",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/400px-Python-logo-notext.svg.png",
    status: null
  },
  {
    title: "Arduino Tetris",
    description: "Classic Tetris on Arduino controlled by joystick, with real-time score tracking and LED matrix display.",
    role: "Embedded Developer",
    technologies: ["Arduino", "C++", "LED Matrix"],
    liveUrl: "https://arduino-tetris-game.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/Arduino-Tetris-Game",
    image: "/Tetris_logo.png",
    status: null
  },
  {
    title: "Temperature Humidity Logger",
    description: "Arduino environmental monitor that tracks temperature and humidity in real time via DHT sensor with serial data output.",
    role: "IoT Developer",
    technologies: ["Arduino", "C++", "DHT Sensor", "Data Logging"],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Temperature-Humidity-Sensor",
    image: "/tempsensor.png",
    status: null
  }
];

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="projects-page-section">
          <div className="container">
            <div className="projects-hero fade-in-up">
              <h1 className="page-title">My Projects</h1>
              <p className="page-subtitle">
                From AI platforms to embedded systems — hover any card to learn more
              </p>
            </div>

            <div className="proj-grid">
              {projects.map((project, index) => (
                <div
                  key={index}
                  id={project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                  className="proj-card"
                >
                  {project.image && (
                    <div className="proj-thumb">
                      <img src={project.image} alt={project.title} />
                    </div>
                  )}

                  <div className="proj-info">
                    <div className="proj-top">
                      <h3 className="proj-title">{project.title}</h3>
                      {project.role && <span className="proj-role">{project.role}</span>}
                    </div>

                    {project.status && (
                      <span className="proj-badge">{project.status}</span>
                    )}

                    <div className="proj-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="proj-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="proj-hover-body">
                      <p className="proj-desc">{project.description}</p>
                      {(project.liveUrl || project.githubUrl || (project as any).videoUrl) && (
                        <div className="proj-links">
                          {project.liveUrl && (
                            <a href={project.liveUrl} className="proj-link primary" target="_blank" rel="noopener noreferrer">
                              {(project as any).demoLabel || 'Live Demo'} →
                            </a>
                          )}
                          {(project as any).videoUrl && (
                            <a href={(project as any).videoUrl} className="proj-link secondary" target="_blank" rel="noopener noreferrer">
                              Watch Video →
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} className="proj-link secondary" target="_blank" rel="noopener noreferrer">
                              View Code →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="github-cta-card fade-in-up">
              <div className="github-cta-content">
                <div className="github-cta-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 0 .192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="github-cta-text">
                  <h3>Want to see more?</h3>
                  <p>Check out my GitHub for additional projects, experiments, and open-source contributions.</p>
                </div>
                <a href="https://github.com/Fyre-Aspect" target="_blank" rel="noopener noreferrer" className="github-cta-button">
                  View More on GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
