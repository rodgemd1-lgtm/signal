# SIGNAL — MORNING HANDOFF

> Mike, open Chrome. Signal is live at http://localhost:8081

---

## WHAT YOU'LL SEE

**Chrome is already open** to the Signal landing page. Here's the journey:

### Page 1: Landing (index.html — 85KB)
Dark. Then light emerges. "SIGNAL." with a gradient period. "Your career has a direction. We help you see it."
Five acts of the emotional arc scroll down: Recognition → Discovery → Clarity → Empowerment → Transformation.
CTAs feel like doors opening, not forms closing. "Let's begin" not "Submit."

### Page 2: Assessment (assessment.html — 53KB)
One question at a time. Progress bar fills green as you answer.
"Who are you?" → "What do you bring?" → "What does success look like?" → "Let's see what's out there."
When you finish, gold celebration. Then you land on the dashboard.

### Page 3: Dashboard (probability.html — 39KB)
Your fit score counts up from zero. Pipeline cards show your journey.
"87% — one of your strongest opportunities" not just "87%."
Every number has context. Every gap has a path forward.

### Page 4: Coach (coach.html — 78KB)
Weekly focus with gold border. "Mark as done" checkbox with gold pulse.
5 action items max. Check a box → green flash → progress bar fills.
"Your network is your moat." Specific. Actionable. Hopeful.

### Page 5: Tracker (applications.html — 45KB)
"Your Journey" not "Applications." Color-coded pipeline.
Rejected = "Not a match this time" + recovery tips.
Offer = gold celebration glow.

---

## THE ARCHITECTURE

```
http://localhost:8081/
  ├── /                 → Landing page
  ├── /assessment.html  → Intake form
  ├── /probability.html → Dashboard
  ├── /coach.html       → Coaching
  ├── /applications.html → Pipeline tracker
  ├── /styles.css       → Design system (23KB)
  ├── /app.js           → Shared logic (13KB)
  └── /v1/              → Go API (17 endpoints)
      ├── /health
      ├── /users         → POST (create)
      ├── /users/{id}    → GET, PUT
      ├── /jobs          → GET (list), POST (create)
      ├── /jobs/{id}     → GET, PUT, PATCH (status), DELETE
      ├── /score         → POST (single), /score/bulk (all)
      ├── /applications  → GET (list), POST (create)
      ├── /applications/{id}/status → PATCH
      ├── /dashboard/{id} → GET
      ├── /coaching-tip  → GET
      └── /persona/{id}  → GET
```

**One Go binary** serves everything — frontend HTML/CSS/JS and API.
In-memory storage (no database). 13/13 endpoints validated.

---

## THE AGENT ARMY (40 Agents)

Full roster in: `signal/AGENT_ARMY.md`

Key agents:
- **Jake** — Co-founder, strategic direction
- **Susan** — CEO, orchestrates 40 agents
- **Atlas** — Backend architect (built the Go server)
- **Nova** — Frontend engineer (built the pages)
- **Haven** — Hope architect (every page passes her Hope Gate)
- **Aria** — Content director (wrote the copy that makes people feel)
- **Critic** — Code review specialist (7-layer gate)
- **Ember** — Emotional QA ("Does this feel hopeful?")
- **Solace** — Transition counselor (handles grief-aware design)

---

## WHAT MAKES THIS DIFFERENT

1. **Emotional Design Framework** (`signal/EMOTIONAL_DESIGN.md`)
   - Hope vocabulary: "between chapters" not "unemployed"
   - Every number has context. Every gap has a path.
   - Hope Gate: minimum 8/10 emotional score to ship

2. **Motion Narrative** — Pages don't load, they emerge
   - Dark → dawn gradient on scroll
   - Score counts up from zero (feels earned)
   - Checkboxes flash green (progress is visible)
   - Gold pulse on achievements

3. **7-Layer Engineering** (`signal/APS_ENGINEERING.md`)
   - Style → Architecture → Security → Performance → Accessibility → Emotional → Final Gate
   - One REJECT from any layer blocks the merge

4. **Recovery Paths** — Rejection is never a dead end
   - "Not a match this time. But here's what to adjust."
   - Always shows 3 better-matching alternatives

---

## TO RESTART IF NEEDED

```bash
cd /Users/mikerodgers/Desktop/Startup-Intelligence-OS/signal
lsof -ti :8081 | xargs kill -9 2>/dev/null
PORT=8081 ./backend/server &
open -a "Google Chrome" http://localhost:8081
```

Or just run: `./start.sh 8081`

---

## 8 AM CRON

Job ID: `13f0b00f1eee`
Script: `~/.hermes/scripts/signal_launch.py`
Runs daily at 8:00 AM Mountain Time
Starts server + opens Chrome

---

## NEXT STEPS (when you're ready)

1. **Deploy to Vercel** — Static frontend + Go serverless
2. **Wire Supabase** — Replace in-memory with persistent storage
3. **Add Stripe** — Premium tier ($29/mo coaching, $9/mo scoring)
4. **Real job sources** — LinkedIn API, Indeed API, Greenhouse webhook
5. **User auth** — Email magic link via Supabase Auth
6. **Resume upload** — ATS optimization with keyword analysis

---

Built with hope. For people who need it.
