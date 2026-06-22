// ============================================================
//  YOUR PROJECTS live here. Add an object per project.
//
//  Fields:
//    title        (required) - project name
//    description  (required) - a sentence or two
//    tags         - array of tech/skills, e.g. ['React', 'Node']
//    video        - OPTIONAL. A YouTube/Vimeo URL, OR a local file
//                   like '/videos/demo.mp4' (put the file in /public/videos).
//    image        - OPTIONAL. Shown if there's no video. '/images/foo.png'
//                   (put the file in /public/images).
//    github       - OPTIONAL link to source code
//    demo         - OPTIONAL link to a live/hosted version
//    goalId       - OPTIONAL. Links this project to a goal in goals.js
//                   (shows it as a "side quest" under that goal).
//
//  Newest projects first looks best. Delete these samples once you add yours.
//  NOTE: these are only a fallback before Supabase is connected.
// ============================================================

export const projects = [
  {
    title: 'TPS Shooter',
    description:
      'An immersive, mobile-friendly third-person shooter built in Unity/C#. Features realistic player animation and movement, intelligent enemy AI with raid battles, terrain building, a mini-map, a local save system, and a full inventory — diverse weapons, grenade mechanics, Cinemachine zoom-aim, and power-ups (speed, health, protection).',
    tags: ['Unity', 'C#', 'Game Dev', 'AI'],
    video: 'https://youtu.be/SJ5KnVpdfXo',
    image: '',
    github: '',
    demo: '',
  },
  {
    title: 'Random Chatting App',
    description:
      'A real-time chat app with group chats and personal direct messaging, built with React, Node.js, and MongoDB. Uses Socket.IO for seamless live interactions and is deployed on AWS for scalable performance.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'AWS'],
    video: '',
    image: '',
    github: '',
    demo: '',
  },
]
