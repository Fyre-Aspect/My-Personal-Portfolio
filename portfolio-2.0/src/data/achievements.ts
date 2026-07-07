export interface AchievementItem {
  title: string;
  description: string;
  date: string;
  image?: string;
  growthAspect: string;
  link?: string;
  linkLabel?: string;
}

export interface AchievementCategory {
  category: string;
  description: string;
  items: AchievementItem[];
}

export const achievements: AchievementCategory[] = [
  {
    category: 'Competition Wins',
    description: 'Hackathons and engineering competitions where the team placed',
    items: [
      {
        title: 'STEAM ICAC 2026 - Computer Science Showcase',
        description:
          'Presented a saliency-aware video codec at the STEAM Innovation Challenge Annual Conference (May 28-29, University of Toronto). The codec identifies salient regions in surveillance footage using YOLOv8, optical flow, and spectral residual analysis, replacing non-salient pixels with a learned background before H.265 compression. Achieved 81% file size reduction on 1080p CCTV footage with a saliency-weighted PSNR of 34.76 dB.',
        date: '2026',
        image: '/Certificate Steam.png',
        growthAspect: 'CS Research',
      },
      {
        title: 'MechMania - 1st Place (Undefeated)',
        description:
          'Won First Place out of 12 teams at MechMania, an engineering competition building automated puck-shooting mechanisms. Went undefeated through a full ladder tournament. Led the conveyor belt concept and built the controller system from scratch.',
        date: '2026',
        image: '/Mechmania.jpg',
        growthAspect: 'Engineering',
      },
      {
        title: 'HackCanada - Top 7th Overall (General Track)',
        description:
          'Placed Top 7th Overall at HackCanada, a national Canadian hackathon. Built Waypoint - an AI-powered case memory platform for social workers using Next.js, Auth0, Supabase, ElevenLabs, and Google Gemini.',
        date: '2025',
        image:
          'https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png',
        growthAspect: 'Hackathon',
      },
      {
        title: 'Hack the Valley IX - Lyra AI Study Bot',
        description:
          '36-hour hackathon: built an AI Discord bot with voice recognition for group study sessions using Gemini API.',
        date: '2025',
        image: '/Lyra Bot.jpg',
        growthAspect: 'Hackathon',
        link: 'https://www.linkedin.com/feed/update/urn:li:activity:7381078715910479872',
        linkLabel: 'LinkedIn',
      },
      {
        title: 'NeoDev League Hackathon - 3rd Place',
        description:
          'Built Shurplus, an AI-powered logistics platform for food rescue using intelligent automation agents.',
        date: '2025',
        image: '/ShurPlus.png',
        growthAspect: 'Hackathon',
      },
    ],
  },
  {
    category: 'Academic Excellence',
    description: 'Rigorous coursework and competitive academic programs',
    items: [
      {
        title: 'Fermat Mathematics Contest - 101/150',
        description:
          'Scored 101 out of 150 on the Fermat Mathematics Contest, coming very close to the Distinction threshold. Nationally administered by CEMC at the University of Waterloo.',
        date: '2026',
        image: '/Gauss Math.jpg',
        growthAspect: 'Math',
      },
      {
        title: 'IB Programme Candidate',
        description:
          'Enrolled in the International Baccalaureate programme with focus on critical thinking and research.',
        date: '2023-Present',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/IB_LOGO.png',
        growthAspect: 'IB',
      },
      {
        title: 'Gauss Math Competition - Distinction',
        description:
          'Earned distinction in the Gauss Mathematics Competition, administered by CEMC at the University of Waterloo.',
        date: '2023',
        image: '/Gauss Math.jpg',
        growthAspect: 'Distinction',
      },
      {
        title: 'Mathematica Competition 2019',
        description: 'Early participant in prestigious mathematics competition.',
        date: '2019',
        image: '/Mathmatica.jpg',
        growthAspect: 'Math',
      },
    ],
  },
  {
    category: 'Professional & Community',
    description: 'Work experience, research, and volunteer contributions',
    items: [
      {
        title: 'University of Waterloo - Geothermal Research',
        description:
          'Research assistant at UWaterloo\'s geothermal energy lab. Supported soil durability testing for residential geothermal coil systems - evaluating soil compositions for heat conductivity and retention properties used in underground coil designs for house heating and cooling.',
        date: '2024',
        image: '/UW Pic 2.jpg',
        growthAspect: 'Research',
      },
      {
        title: '150+ Volunteer Hours',
        description:
          'Over 150 volunteer hours total across multiple organizations - food banks, animal shelters, and university campuses - not just any single placement.',
        date: '2023-Present',
        image: '/KW Humane.png',
        growthAspect: 'Volunteer',
      },
      {
        title: 'Distro - Food Distribution Volunteer',
        description:
          'Regular volunteer at local food distribution programs, helping sort and distribute food packages to families in need across the Kitchener-Waterloo region.',
        date: '2023-Present',
        image: '/Distro.jpg',
        growthAspect: 'Volunteer',
      },
      {
        title: 'HTML Completion Course',
        description: 'Foundational web development training covering semantic HTML and accessibility.',
        date: '2024',
        image: '/HTML.png',
        growthAspect: 'Certified',
      },
    ],
  },
  {
    category: 'Athletics',
    description: 'Competitive sports and physical development',
    items: [
      {
        title: 'WCCSAA Badminton - 5th Place',
        description: 'Regional competition as school team representative.',
        date: '2025',
        image: '/wcssaa.png',
        growthAspect: 'Badminton',
      },
      {
        title: 'Badminton Falcon Tournament - 4th Place',
        description: 'Tournament-level doubles competition representing Cameron Heights.',
        date: '2024',
        image: '/Falcon Badminton.jpg',
        growthAspect: 'Badminton',
      },
      {
        title: '7th Place - WCSAA Tennis Singles',
        description: 'Regional tournament placement with 2-0 match record in senior boys singles.',
        date: '2025',
        growthAspect: 'Tennis',
      },
      {
        title: 'Swimming Levels + Lifeguard Training',
        description: 'Finished my swim levels and have started lifeguard training. CPR and full lifeguard certification are still in progress.',
        date: '2024',
        image: '/Swimming.jpg',
        growthAspect: 'Swimming',
      },
    ],
  },
];
