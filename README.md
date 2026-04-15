# SIGNAL

> Career Intelligence Platform -- AI-powered job search intelligence for executives.

Built with hope. For people who need it.

## Live

**Production:** Deploy via Vercel (see below)

## Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | index.html | Landing page -- 5-act emotional arc |
| `/assessment` | assessment.html | Intake form -- one question at a time |
| `/dashboard` | probability.html | Fit scores, pipeline, bento grid |
| `/coach` | coach.html | Weekly coaching tips + action items |
| `/tracker` | applications.html | Application pipeline tracker |

## Architecture

```
signal/
  frontend/          -- Static HTML/CSS/JS (Vercel deploy target)
    index.html       -- Landing (self-contained, 124KB)
    assessment.html  -- Assessment form
    probability.html -- Dashboard
    coach.html       -- Coaching
    applications.html-- Pipeline tracker
    styles.css       -- V20 design system (48KB)
    app.js           -- Shared logic + cursor + scroll engine (59KB)
  backend/           -- Go API server (localhost:8081)
    main.go          -- 17 endpoints, in-memory storage
    go.mod / go.sum  -- Go dependencies
  docs/              -- Specs and design documents
  governance/        -- Agent governance rules
  scenarios/         -- API test scenarios
  scripts/           -- Automation scripts
  vercel.json        -- Vercel deployment config
```

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (no frameworks, no GSAP, no React)
- Backend: Go (in-memory MVP, Supabase planned)
- Design: V20 design system -- glassmorphism, gradient mesh, kinetic typography
- Fonts: Inter + JetBrains Mono (Google Fonts)

## Design Documents

- `docs/V20_SPEC.md` -- 20 upgrades spec (from functional to unforgettable)
- `docs/EMOTIONAL_DESIGN.md` -- 5-act emotional arc, hope vocabulary
- `docs/SPEC.md` -- Product specification (API, data model, scoring)
- `docs/APS_ENGINEERING.md` -- 7-layer engineering quality gates
- `docs/AGENT_ARMY.md` -- 40-agent specialist roster
- `docs/ORCHESTRATION.md` -- Agent orchestration flow

## Local Development

```bash
# Start the Go API + open browser
./start.sh 8081

# Or just serve the frontend
cd frontend && python3 -m http.server 3000
```

## Deploy to Vercel

```bash
cd signal
npx vercel --prod
```

## Scoring Algorithm

Weighted fit score (0-100):
- Skill match: 35%
- Salary fit: 20%
- Location fit: 15%
- Seniority fit: 15%
- Industry fit: 15%

## Emotional Design

Every page follows the Hope Vocabulary:
- "between chapters" not "unemployed"
- "not a match" not "rejected"
- "fit score" not "match percentage"
- "send it forward" not "submit"

See `docs/EMOTIONAL_DESIGN.md` for the full framework.

---

Rodgers Intelligence Group (RIG)
