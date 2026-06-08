'use client';
import styles from './ExperienceTimeline.module.css';
import { TimelineCard } from './TimelineCard';

export interface TimelineEntry {
  date: string;
  title: string;
  org: string;
  hours: string;
  description: string;
  tags: string[];
  color: 'orange' | 'gold';
  side: 'left' | 'right';
}

const rawData = [
  { date: 'May 2026', title: 'STEAM ICAC 2026 - CS Showcase', org: 'University of Toronto', hours: '80+ hrs', description: 'Presented a saliency-aware video codec at the STEAM Innovation Challenge Annual Conference (May 28-29, University of Toronto) in the Computer Science Showcase. The codec exploits the stationary nature of surveillance cameras, replacing non-salient pixels with a learned background and compressing with H.265, achieving 81% file size reduction on 1080p footage (33.9 MB to 6.5 MB) while maintaining 34.76 dB PSNR on salient content. Built with YOLOv8 for object detection, optical flow for motion saliency, libx265 for encoding, and PyTorch for the autoencoder baseline.', tags: ['Python', 'YOLOv8', 'H.265', 'OpenCV', 'PyTorch', 'Computer Vision'], color: 'gold' },
  { date: 'Apr 2026 - May 2026', title: 'MechMania - Engineering Competition', org: 'MechMania', hours: '40+ hrs', description: 'Competed in MechMania, a mechanical engineering competition where teams design and build automated systems to shoot pucks into goals. Led the initial planning session that pivoted the team toward the conveyor belt mechanism concept. Fully built the controller system from scratch alongside peers. At the final competition, went undefeated through a full ladder tournament format, defeating all 11 opposing teams to claim First Place out of 12 teams total.', tags: ['Engineering', 'Controllers', 'Teamwork'], color: 'gold' },
  { date: 'Mar 2026 - May 2026', title: 'Volunteer Advisor', org: 'Global Heart Sync', hours: '10+ hrs', description: "Served as a Volunteer Advisor at Global Heart Sync.org from March to May 2026, contributing advisory support and strategic guidance to the organization's initiatives.", tags: ['Volunteering', 'Advisory', 'Strategy'], color: 'orange' },
  { date: '2026', title: 'EurekaHacks - Hackathon Participant', org: 'EurekaHacks', hours: '24+ hrs', description: 'Competed at EurekaHacks where the team built LangLua - a Chrome extension and React web app that turns passive web browsing into language immersion by replacing words on any page with real-time translations, AI-powered definitions (Gemini), and ElevenLabs pronunciation. Gamified with a credit and streak system across 10 supported languages.', tags: ['Chrome Extension', 'React', 'Gemini', 'ElevenLabs'], color: 'orange' },
  { date: 'Feb 2025', title: 'HackCanada - Hackathon Participant', org: 'HackCanada', hours: '36+ hrs', description: "Competed at HackCanada, one of Canada's national hackathons. Built Waypoint - an AI-powered case memory platform for social workers using Next.js, Auth0, Supabase, ElevenLabs, and Google Gemini. Placed Top 7th Overall in the General Track out of all competing teams.", tags: ['Next.js', 'Auth0', 'Supabase', 'Gemini'], color: 'orange' },
  { date: 'Dec 2025 - Apr 2026', title: 'Math Circles Participant', org: 'Math Circles (University Program)', hours: '40+ hrs', description: 'Participated in Math Circles, an advanced mathematics enrichment program, from December 2025 through April 2026. Engaged with challenging problem sets across number theory, combinatorics, and proof-based mathematics.', tags: ['Number Theory', 'Combinatorics', 'Proofs'], color: 'gold' },
  { date: 'Oct 2025', title: 'Hack the Valley - Hackathon Participant', org: 'Hack the Valley', hours: '36+ hrs', description: 'Competed at Hack the Valley 2025. Built Lyra Tutor AI - a Discord-integrated teaching assistant powered by real-time AI APIs. Focused on backend API integration and interactive AI functionality.', tags: ['Discord API', 'TypeScript', 'AI APIs'], color: 'orange' },
  { date: '2024 - Present', title: 'Developer', org: 'Tidal Tasks AI', hours: '200+ hrs', description: 'Building systems and features for an AI-powered task management startup.', tags: ['React', 'TypeScript', 'Firebase', 'Gemini API'], color: 'orange' },
  { date: '2024', title: 'Geothermal Research Assistant', org: 'University of Waterloo', hours: '100+ hrs', description: 'Assisted at the University of Waterloo geothermal energy lab. Supported soil durability testing for residential geothermal coil systems - evaluating how different soil compositions conduct and retain heat when coils are buried underground for house heating and cooling. Conducted sample collection, lab analysis, and documentation of results that inform geothermal system design.', tags: ['MATLAB', 'Soil Testing', 'Data Analysis', 'Lab Research'], color: 'orange' },
  { date: '2024', title: 'MLU File Organizer', org: 'Martin Luther University', hours: '50+ hrs', description: 'Document organization and administrative support in a university office environment.', tags: ['Admin', 'Workflow', 'Documentation'], color: 'orange' },
  { date: '2024', title: 'Distro Volunteer', org: 'Wilfrid Laurier University', hours: '20+ hrs', description: 'Inventory management, package handling, and logistics coordination for campus distribution.', tags: ['Logistics', 'Inventory', 'Supply Chain'], color: 'orange' },
  { date: '2023 - 2024', title: 'Volunteer', org: 'KW Humane Society', hours: '15+ hrs', description: 'Animal care, facility maintenance, and community outreach support at the local humane society.', tags: ['Animal Care', 'Community', 'Outreach'], color: 'orange' },
  { date: '2023 - Present', title: 'Tennis Team', org: 'School Athletics - 7th WCSAA', hours: '80+ hrs', description: 'Competitive school tennis with tournament experience including 7th place WCSAA finish.', tags: ['Strategy', 'Competition', 'Conditioning'], color: 'gold' },
  { date: '2022 - Present', title: 'Badminton Team', org: 'School Athletics - 4th Falcon Tournament', hours: '150+ hrs', description: 'School team badminton with tournament placements including 4th at Falcon Tournament.', tags: ['Precision', 'Teamwork', 'Tournaments'], color: 'gold' },
  { date: '2022 - 2023', title: 'Flute - Jr. Band', org: 'School Music Program', hours: '30+ hrs', description: 'Ensemble performance and musical development through school band program.', tags: ['Ensemble', 'Performance', 'Music'], color: 'gold' },
  { date: '2022', title: 'Lifeguard Lessons', org: 'Swimming Certification', hours: '80+ hrs', description: 'Complete swimming certification including lifeguard training, CPR, and first aid.', tags: ['CPR', 'First Aid', 'Water Safety'], color: 'gold' }
];

// Compute left/right side derived from index
const timelineData: TimelineEntry[] = rawData.map((item, index) => ({
  ...item,
  color: item.color as 'orange' | 'gold',
  side: index % 2 === 0 ? 'left' : 'right'
}));

export default function ExperienceTimeline() {
  return (
    <section className={styles.timelineWrapper}>
      <div className={styles.spine}></div>
      {timelineData.map((entry, index) => (
        <TimelineCard key={index} entry={entry} index={index} />
      ))}
    </section>
  );
}