/* ============================================================
   RESONANT LABS — Site Data
   ============================================================

   This is the only file you need to edit for content changes:
     • Add or update a GitHub / live URL for an app
     • Change a release date or description
     • Add a new app or blog post

   After saving, upload only this file to go live.
   ============================================================ */

window.SITE_DATA = {

  /* ----------------------------------------------------------
     APPS
     ----------------------------------------------------------
     To update an existing app (e.g. add a GitHub URL):
       Find the app block below and fill in the value.

     To add a new app:
       Copy one of the blocks below, paste it at the top of
       the list, and fill in all the fields.
  ---------------------------------------------------------- */
  apps: [
    {
      id: 'consentkit',
      name: 'ConsentKit',
      shortDesc: 'Free, open-source GDPR cookie consent widget. Drop one JS file into any site — full consent management, Google Consent Mode v2, four categories. No subscription.',
      tags: ['Developer Tool', 'Open Source'],
      emoji: '🍪',
      status: 'live',
      image: 'Media/Consentkit.png',
      gradientFrom: '#10b981',
      gradientTo: '#06b6d4',
      githubUrl: 'https://github.com/sokiicz/consentkit',
      liveUrl: 'https://github.com/sokiicz/consentkit',
      liveLabel: 'Download',
      detailUrl: 'apps/consentkit.html',
      releaseDate: '6 Mar 2026',
      updates: [
        { date: '2026-03-06', note: 'Initial release — FTP static version, GCM v2, shadow DOM isolation', label: 'v1 released' },
      ],
    },
    {
      id: 'music-mouse',
      name: 'Music Mouse',
      shortDesc: 'An interactive musical canvas inspired by Laurie Spiegel\'s 1986 classic. Move your mouse — make music. No keyboard, no notes, no rules.',
      tags: ['Music', 'Web App', 'Open Source'],
      emoji: '🎵',
      status: 'live',
      image: 'Media/Music-mouse.png',
      gradientFrom: '#8b5cf6',
      gradientTo: '#22d3ee',
      githubUrl: 'https://github.com/sokiicz/music-mouse',
      liveUrl: 'https://sokiicz.github.io/Music-Mouse/',
      liveLabel: 'Open App',
      detailUrl: 'apps/music-mouse.html',
      releaseDate: '3 Mar 2026',
      updates: [
        { date: '2026-03-03', note: 'Initial release — interactive canvas, Web Audio API, Laurie Spiegel-inspired', label: 'v1 released' },
      ],
    },
    {
      id: 'vagoshit',
      name: 'VagoshIt',
      shortDesc: 'Collaborative group activity planner — vote on ideas, share availability, and actually get things done together.',
      tags: ['Social', 'Planning', 'Groups', 'Next.js', 'Supabase'],
      emoji: '🗓️',
      status: 'live',
      image: 'Media/Vagoshit.png',
      gradientFrom: '#6366f1',
      gradientTo: '#8b5cf6',
      githubUrl: 'https://github.com/sokiicz/vagoshit',
      liveUrl: 'https://vagoshit.com',
      liveLabel: 'Open App',
      detailUrl: 'apps/vagoshit.html',
      releaseDate: '13 Mar 2026',
      updates: [
        { date: '2026-03-13', note: 'Initial scaffold — Next.js 15 + Supabase. Auth, groups, activities, voting, availability grid, calendar, friends, notifications. Build passing.', label: 'Scaffold' },
        { date: '2026-03-15', note: 'Launched live at vagoshit.com. Added avatar upload, recurring events (weekly/biweekly/monthly/yearly), saved places, recurring calendar occurrences, group channels with archiving, friend system with email search + invite links, user profile pages, activity co-organizers, \'Plan again\' duplicate feature, auto-complete based on scheduled date, \'Happening now\' banners.', label: 'Live' },
      ],
    },
    {
      id: 'spekplatz',
      name: 'SpekPlatz',
      shortDesc: 'A community map for discovering and sharing hidden spots — rooftops, viewpoints, parks, beaches, and more. Find places worth remembering.',
      tags: ['Maps', 'Web App', 'Open Source'],
      emoji: '📍',
      status: 'live',
      image: 'Media/Spekplatz.png',
      gradientFrom: '#10b981',
      gradientTo: '#3b82f6',
      githubUrl: 'https://github.com/sokiicz/SpekPlatz',
      liveUrl: 'https://spekplatz.app',
      liveLabel: 'Open App',
      detailUrl: 'apps/spekplatz.html',
      releaseDate: '20 Feb 2026',
      updates: [
        { date: '2026-02-20', note: 'Initial release — community map, spot submission, Firebase backend', label: 'v1 released' },
      ],
    },
    {
      id: 'rps-battle',
      name: 'RPS Battle',
      shortDesc: 'Real-time multiplayer Rock Paper Scissors battle game with virtual coins. No real money — a reminder that the thrill of betting never needs to cost you anything.',
      tags: ['Game', 'Multiplayer', 'Real-time', 'WebSockets'],
      emoji: '⚔️',
      status: 'live',
      image: 'Media/RPS-Battle.png',
      gradientFrom: '#6366f1',
      gradientTo: '#f43f5e',
      githubUrl: null,
      liveUrl: 'https://rps-battle-5486e.web.app',
      liveLabel: 'Play Now',
      detailUrl: 'apps/rps-battle.html',
      releaseDate: '12 Mar 2026',
      updates: [
        { date: '2026-03-11', note: 'Initial development — full-stack multiplayer game with auth, betting, real-time battles', label: 'v0.1' },
        { date: '2026-03-12', note: 'Polished and ready for deployment. Source kept private — built to demonstrate fun betting without real money. Gambling is harmful; this game is a safe alternative.', label: 'v1.0' },
      ],
    },
    {
      id: 'keepawake-pro',
      name: 'KeepAwake',
      shortDesc: 'Keeps your Windows PC awake when you need it. Smart AFK simulation, system tray, scheduled hours, global hotkeys — invisible until needed.',
      tags: ['Desktop', 'Open Source'],
      emoji: '☕',
      status: 'hidden',
      image: 'Media/KeepAwake.png',
      gradientFrom: '#f59e0b',
      gradientTo: '#ef4444',
      githubUrl: 'https://github.com/sokiicz/keepawake-pro',
      liveUrl: 'https://github.com/sokiicz/keepawake-pro',
      liveLabel: 'Download',
      detailUrl: 'apps/keepawake-pro.html',
      releaseDate: '12 Feb 2026',
      updates: [
        { date: '2026-02-12', note: 'Initial release — system tray, scheduled hours, global hotkeys', label: 'v1 released' },
      ],
    },
    {
      id: 'daylog',
      name: 'DayLog',
      shortDesc: 'A personal daily life tracker — log habits, metrics, events and moods. Joy Index tracks what percentage of your days include something genuinely fun. No accounts, no cloud, everything on your device.',
      tags: ['Productivity', 'Web App', 'Open Source'],
      emoji: '◉',
      status: 'live',
      image: 'Media/DayLog.png',
      gradientFrom: '#6366f1',
      gradientTo: '#a855f7',
      githubUrl: 'https://github.com/sokiicz/daylog',
      liveUrl: 'https://sokiicz.github.io/daylog/',
      liveLabel: 'Open App',
      detailUrl: 'apps/daylog.html',
      releaseDate: '10 Mar 2026',
      updates: [
        { date: '2026-03-09', note: 'Development started — React 19 + Vite + IndexedDB, routing in place', label: 'Started development' },
        { date: '2026-03-10', note: 'v2 released — habits, metrics, events, mood tracking, Joy Index, stats, export/import', label: 'v2 released' },
      ],
    },
    {
      id: 'resonant-labs',
      name: 'Resonant Labs',
      shortDesc: 'This very website — a full portfolio site with dark space theme, animated background, tag filtering, cookie consent, comments, and newsletter. Built entirely with Claude Code.',
      tags: ['Web App', 'Open Source'],
      emoji: '🌊',
      status: 'live',
      image: 'Media/ResonantLabs.png',
      gradientFrom: '#8b5cf6',
      gradientTo: '#22d3ee',
      githubUrl: 'https://github.com/sokiicz/resonant-labs',
      liveUrl: 'https://resonantlabs.online',
      liveLabel: 'Home',
      detailUrl: 'apps/resonant-labs.html',
      releaseDate: '1 Mar 2026',
      updates: [
        { date: '2026-03-01', note: 'Initial launch — dark space theme, app gallery, blog, newsletter', label: 'Site launched' },
        { date: '2026-03-06', note: 'ConsentKit integrated, screenshots added, WIP tracker added', label: 'New features added' },
        { date: '2026-03-10', note: 'Activity ticker, app changelogs, dedicated apps page added', label: 'New features added' },
      ],
    },
    {
      id: 'wildround',
      name: 'Wildround',
      shortDesc: 'Real-time multiplayer party game. Complete wild tasks, earn points, outlast your friends.',
      tags: ['Game', 'Party', 'Real-time', 'Multiplayer'],
      emoji: '🎲',
      status: 'wip',
      image: null,
      gradientFrom: '#7c3aed',
      gradientTo: '#4f46e5',
      githubUrl: null,
      liveUrl: null,
      liveLabel: 'Play now',
      detailUrl: null,
      releaseDate: null,
      updates: [
        { date: '2026-03-14', note: 'Initial scaffold: lobby, QR join, real-time tasks, scoreboard', label: 'MVP scaffold' },
      ],
    },
    {
      id: 'timeinvoice',
      name: 'TimeInvoice',
      shortDesc: 'Self-hosted time tracking and invoicing for freelancers. Log hours, manage clients and projects, generate PDF invoices with QR payment codes. Supports CZK, EUR and SEPA.',
      tags: ['Productivity', 'Web App', 'Open Source'],
      emoji: '⏱',
      status: 'wip',
      image: null,
      gradientFrom: '#0ea5e9',
      gradientTo: '#2563eb',
      githubUrl: null,
      liveUrl: null,
      liveLabel: 'Open App',
      detailUrl: null,
      releaseDate: null,
      updates: [
        { date: '2026-03-09', note: 'Core invoicing working — PDF generation, QR payment codes (SPAYD + EPC), 29 tests passing', label: 'Development started' },
      ],
    },
  ],

  /* ----------------------------------------------------------
     BLOG POSTS
     ----------------------------------------------------------
     To add a new post:
       Copy one of the blocks below, paste it at the top,
       and fill in the fields. Make sure the url points to
       the actual blog post file you created.
  ---------------------------------------------------------- */
  posts: [
    {
      id: 'art-of-prompting',
      title: 'The Art of Prompting: How I Describe My Vision to Claude',
      excerpt: 'Talking to an AI is a skill in itself. Here\'s how I\'ve learned to communicate ideas clearly enough to get exactly what I imagine.',
      date: '22 Feb 2026',
      readTime: '7 min read',

      // Tag label and style. Styles: badge-primary (purple), badge-amber, badge-cyan
      tag: 'Process',
      tagClass: 'badge-amber',

      // Card gradient colours
      gradientFrom: '#f59e0b',
      gradientTo:   '#ef4444',

      // Path to the blog post file
      url: 'blog/art-of-prompting.html',
    },
    {
      id: 'why-ai-not-code',
      title: 'Why I\'m Building Apps with AI Instead of Learning to Code',
      excerpt: 'I\'ve always had ideas. What I lacked was the technical ability to bring them to life — until Claude Code changed everything.',
      date: '15 Feb 2026',
      readTime: '5 min read',
      tag: 'Thoughts',
      tagClass: 'badge-primary',
      gradientFrom: '#8b5cf6',
      gradientTo:   '#22d3ee',
      url: 'blog/why-ai-not-code.html',
    },
    {
      id: 'open-source-and-ai',
      title: 'Open Source and AI: A New Model for Sharing Software',
      excerpt: 'If an AI wrote every line, should I charge for it? The answer felt obvious — give it all away, and let ideas multiply.',
      date: '28 Jan 2026',
      readTime: '4 min read',
      tag: 'Philosophy',
      tagClass: 'badge-cyan',
      gradientFrom: '#10b981',
      gradientTo:   '#3b82f6',
      url: 'blog/open-source-and-ai.html',
    },
  ],

};
