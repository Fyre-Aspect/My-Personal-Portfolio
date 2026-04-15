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
  { date: '2024 - Present', title: 'Admin Developer', org: 'Tidal Tasks AI', hours: '30+ hrs', description: 'Building admin systems and features for an AI-powered task management startup.', tags: ['React', 'TypeScript', 'Firebase', 'Gemini API'], color: 'orange' },
  { date: '2024', title: 'Soil Testing Intern', org: 'University of Waterloo', hours: '50+ hrs', description: 'Research experience in soil analysis, stress-strain plotting, and MATLAB data visualization.', tags: ['MATLAB', 'Data Analysis', 'Research'], color: 'orange' },
  { date: '2024', title: 'MLU File Organizer', org: 'Martin Luther University', hours: '50+ hrs', description: 'Document organization and administrative support in a university office environment.', tags: ['Admin', 'Workflow', 'Documentation'], color: 'orange' },
  { date: '2024', title: 'Distro Volunteer', org: 'Wilfrid Laurier University', hours: '20+ hrs', description: 'Inventory management, package handling, and logistics coordination for campus distribution.', tags: ['Logistics', 'Inventory', 'Supply Chain'], color: 'orange' },
  { date: '2023 - 2024', title: 'Volunteer', org: 'KW Humane Society', hours: '15+ hrs', description: 'Animal care, facility maintenance, and community outreach support at the local humane society.', tags: ['Animal Care', 'Community', 'Outreach'], color: 'orange' },
  { date: '2023 - Present', title: 'Tennis Team', org: 'School Athletics - 7th WCSAA', hours: '80+ hrs', description: 'Competitive school tennis with tournament experience including 7th place WCSAA finish.', tags: ['Strategy', 'Competition', 'Conditioning'], color: 'gold' },
  { date: '2022 - Present', title: 'Badminton Team', org: 'School Athletics - 4th Falcon Tournament', hours: '150+ hrs', description: 'School team badminton with tournament placements including 4th at Falcon Tournament.', tags: ['Precision', 'Teamwork', 'Tournaments'], color: 'gold' },
  { date: '2022 - 2023', title: 'Flute — Jr. Band', org: 'School Music Program', hours: '30+ hrs', description: 'Ensemble performance and musical development through school band program.', tags: ['Ensemble', 'Performance', 'Music'], color: 'gold' },
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