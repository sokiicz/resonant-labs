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
      // Internal ID — must match the filename in apps/
      id: 'music-mouse',

      // Display name shown on the card
      name: 'Music Mouse',

      // One-line description shown on the card
      shortDesc: 'An interactive musical canvas inspired by Laurie Spiegel\'s 1986 classic. Move your mouse — make music. No keyboard, no notes, no rules.',

      // Category tags shown on the card
      tags: ['Web App', 'Music', 'Interactive'],

      // Emoji shown when there is no screenshot
      emoji: '🎵',

      // Path to screenshot (from the site root). Set to null if none yet.
      image: 'Media/Music-mouse.png',

      // Card gradient colours
      gradientFrom: '#8b5cf6',
      gradientTo:   '#22d3ee',

      // GitHub repo URL. Set to null if not published yet.
      githubUrl: 'https://github.com/sokiicz/music-mouse',

      // Live / download URL. Set to null if not deployed yet.
      liveUrl: 'https://sokiicz.github.io/Music-Mouse/',

      // Button label when liveUrl is set: 'Open App' or 'Download'
      liveLabel: 'Open App',

      // Path to the detail page (don't change this)
      detailUrl: 'apps/music-mouse.html',

      // Release date shown on the card
      releaseDate: '3 Mar 2026',
    },
    {
      id: 'keepawake-pro',
      name: 'KeepAwake',
      shortDesc: 'Keeps your Windows PC awake when you need it. Smart AFK simulation, system tray, scheduled hours, global hotkeys — invisible until needed.',
      tags: ['Windows', 'Utility', 'Desktop'],
      emoji: '☕',
      image: 'Media/KeepAwake.png',
      gradientFrom: '#f59e0b',
      gradientTo:   '#ef4444',
      githubUrl: 'https://github.com/sokiicz/keepawake-pro',
      liveUrl:   'https://github.com/sokiicz/keepawake-pro',
      liveLabel: 'Download',
      detailUrl: 'apps/keepawake-pro.html',
      releaseDate: '12 Feb 2026',
    },
    {
      id: 'spekplatz',
      name: 'SpekPlatz',
      shortDesc: 'A community map for discovering and sharing hidden spots — rooftops, viewpoints, parks, beaches, and more. Find places worth remembering.',
      tags: ['Web App', 'Community', 'Maps'],
      emoji: '📍',
      image: 'Media/Spekplatz.png',
      gradientFrom: '#10b981',
      gradientTo:   '#3b82f6',
      githubUrl: 'https://github.com/sokiicz/SpekPlatz',
      liveUrl:   'https://spekplatz.app',
      liveLabel: 'Open App',
      detailUrl: 'apps/spekplatz.html',
      releaseDate: '20 Feb 2026',
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
      id: 'building-resonant-labs',
      title: 'Building Resonant Labs: A Portfolio Site with No HTML Written',
      excerpt: 'I had apps without a home. So I built one — dark theme, tag filtering, cookie consent, comments. Every line by AI. Here\'s exactly how it came together.',
      date: '6 Mar 2026',
      readTime: '8 min read',
      tag: 'Process',
      tagClass: 'badge-primary',
      gradientFrom: '#8b5cf6',
      gradientTo:   '#22d3ee',
      url: 'blog/building-resonant-labs.html',
    },
    {
      id: 'i-built-a-cookie-banner',
      title: 'I Needed a Cookie Banner. So I Built One — Free for Everyone.',
      excerpt: 'Refused to pay for a consent tool, so I built ConsentKit — open-source, GDPR-compliant, Google Consent Mode v2, fully featured. Zero cost to use.',
      date: '6 Mar 2026',
      readTime: '6 min read',
      tag: 'Build',
      tagClass: 'badge-cyan',
      gradientFrom: '#10b981',
      gradientTo:   '#06b6d4',
      url: 'blog/i-built-a-cookie-banner.html',
    },
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
