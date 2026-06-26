# Resonant-studio — resonantlabs.online portfolio site

Owner narrative: started as fun open-source apps; now also running serious paid private apps (e.g. wildround). The site should communicate that arc — small fun apps as the origin story, serious products as the evolution. **Don't rewrite this narrative without checking with the user.**

## Layout
```
index.html              — landing
apps.html               — apps listing (replaces #apps anchor)
blog.html               — blog listing
blog-post.html          — blog post template
app-detail.html         — app page template
apps/                   — daylog · consentkit · music-mouse · keepawake-pro (hidden) · spekplatz · resonant-labs · bitcoin-100k · rps-battle · qr-clock · vagoshit · shithead · wildround · otocsvet · gochords
css/style.css           — full design system + responsive + chatbot + newsletter
js/main.js              — render fns, nav, tabs, Cusdis, newsletter, ticker, changelog
js/site-data.js         — SOURCE OF TRUTH for app + blog content
js/chatbot.js           — floating idea-collection chatbot widget
manual-apps.json        — manual entries for apps with no local folder (e.g. Music Mouse)
Media/                  — KeepAwake.png, Music-mouse.png, Spekplatz.png, ResonantLabs.png
```

## WIP tracker (run after any app-meta.json change)
`D:/ai/Apps/wip-tracker/` — `tracker.bat` or `python tracker.py`. Scans `app-meta.json` files, merges with `manual-apps.json`, writes `js/site-data.js`, commits + pushes.

**Critical bug fixed:** missing comma after apps array → invalid JS → no apps rendered. Fixed in `tracker.py` (`"  ],"` not `"  ]"`). If site renders 0 apps, check that first.

Run trigger: any change to status, URLs, tags, or `updates[]` entries.

## Tag system (simplified — all apps are Open Source)
Valid: `Web App`, `Desktop`, `Developer Tool`, `Productivity`, `Music`, `Maps`, `Open Source`. Filter buttons on `apps.html` auto-generated from APPS tags.

## Update entry format (in both `site-data.js` and `app-meta.json`)
```json
{ "date": "2026-03-10", "note": "Long description for changelog sidebar", "label": "Short ticker label" }
```
- `label` → activity ticker (short: "v1 released")
- `note` → app detail page changelog sidebar

## Cards / status
- `status: live` → main grid; `wip` → WIP section; `hidden`/`archived` → excluded
- `liveLabel: 'Download'` → download icon; `'Open App'` → external link icon
- Cards stretched: whole card clickable, action buttons at `z-index: 2`

## Known bugs already fixed (don't re-introduce)
- Unescaped apostrophe in single-quoted JS string broke ALL JS — use `\'` or template literals
- `var(--border)` undefined — use `var(--border-1)` or `var(--border-2)`
- Fade-in invisible without `.js-ready .fade-in` pattern + inline `<script>` in `<head>`
- Cusdis guard: `if (!appId) return;` (not a literal sed-replaced string)
- `data-app-id` collides with Cusdis — use `data-changelog-id` for changelog cards

## CSS variables (quick reference)
- `--purple: #8b5cf6`, `--cyan: #22d3ee`, `--amber: #fbbf24`
- `--bg-1: #0a0a20`, `--bg-card: #13132e`
- `--text-1: #f8fafc`, `--text-2: #e2e8f0`, `--text-3: #b0bec8`, `--text-4: #6b7a99`
- `--border-1: rgba(255,255,255,0.06)`, `--border-2: rgba(255,255,255,0.1)`
- `--grad-primary: linear-gradient(135deg, #8b5cf6, #22d3ee)`

## Pending
- **Mobile responsiveness audit** — some pages overflow on narrow viewports (flagged 2026-04-22). Check `css/` + every HTML page.
- **Article re-writes** — `why-ai-not-code.html`, `art-of-prompting.html`, `open-source-and-ai.html` need a more personal voice (DayLog gift story would suit `open-source-and-ai`).
- **"Workspace article"** (planned) — deep piece about full automation setup (wip-tracker, app-meta.json pipeline, Claude Code workflows). Don't mention internal tooling publicly until this article frames it.

## Future ideas (don't ship without asking)
- DayLog origin story post — friend, beer, coffee-spill idea — conversational vs the technical app page
- "Year in review" once 10+ apps shipped — arc of the collection
- "How I work" / "Process" page — permanent, evergreen, AI + human workflow

## Domain & contact
- Domain: `resonantlabs.online`
- Email: `contactme@resonantlabs.online`
