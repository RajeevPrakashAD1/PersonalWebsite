// ============================================================
//  Your résumé data, shown on the Player (About) page.
//  Edit freely — it's plain data.
// ============================================================

export const experience = [
  {
    role: 'Software Engineer I',
    company: 'Electronic Arts',
    location: 'Hyderabad, India',
    period: 'May 2024 – Present',
    points: [
      'Maintain and ship live updates for NBA, a live mobile title — triaging and resolving daily bugs across gameplay UI, content, client, and server to keep the live build stable for players.',
      'Drive platform certification compliance — resolving cert/failure reports and delivering release-ready builds across platforms.',
      'Led localization enablement on Madden NFL Arcade, refactoring non-localized builds to support localization for international release; built the Apple Arcade store version with other engineers.',
      'Developed features for an internal C#/.NET (WPF) content-delivery tool — including inline text editing — to streamline content workflows for the team.',
      'Fixed issues across the stack — loading screens, in-game maps, content systems, and server-side logic — debugging across multiple environments (dev/QA/prod).',
      'Earlier in role, built a C#/Unity automation framework for titles including Plants vs. Zombies 3 and Star Wars (swipe gestures, runtime data extraction, tap interactions) to automate gameplay testing.',
      'Partner with the DRE team to keep Jenkins CI pipelines green and with QV/QA to resolve binding, client, and server-side issues across environments.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Electronic Arts',
    location: 'Hyderabad, India',
    period: 'Jan 2024 – May 2024',
    points: [
      'Developed a mini-game for Dash Adventure, adding new features to a large codebase.',
      'Released monthly events through a pipeline system — populating data in the admin panel and implementing the Unity changes to reflect new events in-game.',
      'Worked across software engineering and game development with Unity, Unreal Engine, and proprietary in-house tools.',
    ],
  },
  {
    role: 'Frontend Lead',
    company: 'Powstik',
    location: 'Bengaluru, India',
    period: 'May 2022 – Jul 2022',
    points: [
      'Strengthened React web development skills while leading team management and organizational workflows.',
      'Ensured timely project delivery through effective team management in a collaborative environment.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Aitra Pvt Ltd.',
    location: 'Noida, India',
    period: 'Jul 2021 – Dec 2021',
    points: [
      'Started in React web development and expanded into backend with Node.js, contributing across the stack.',
      'Played a pivotal role creating landing pages and the desktop version of the mudda.in website.',
    ],
  },
]

export const education = [
  { school: 'Vellore Institute of Technology', detail: 'B.Tech, Computer Science', period: '2020 – 2024' },
  { school: 'RamKrishna Dwarika College', detail: 'Intermediate, Science', period: '' },
]

export const skills = {
  Languages: ['C#', '.NET', 'C/C++', 'Python', 'JavaScript', 'HTML/CSS', 'SQL'],
  Frameworks: ['Unity', 'Unreal', 'WPF', 'React', 'Node.js', 'MongoDB'],
  Tools: ['Git', 'Perforce', 'Jenkins', 'GitHub Copilot', 'VS Code', 'Visual Studio', 'JetBrains IDEs'],
}

export const achievements = [
  { title: 'Micron Hackathon', detail: 'Secured 2nd position — pitched an innovative waste-management solution themed on sustainable development.' },
  { title: 'Kavach Hackathon', detail: 'Achieved 7th in the university for a “Fake News Detection System” idea presentation.' },
  { title: 'Microsoft Engage', detail: 'Selected for the Microsoft Engage program; built a project under a mentor’s guidance.' },
]
