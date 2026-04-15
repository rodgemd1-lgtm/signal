# SIGNAL — AGENT ORCHESTRATION PROTOCOL

> "Orchestration is not control. It's creating the conditions
> where every agent can do their best work at the right time,
> with the right context, and the right collaborators."

Version: 1.0 | April 2026 | Rodgers Intelligence Group

---

## 1. ARCHITECTURE

```
                    ┌─────────────┐
                    │    JAKE     │  Strategic direction
                    │  (Director) │  Ambiguity resolution
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   SUSAN     │  Task routing
                    │ (Orchestrator)│  Agent lifecycle
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼───┐  ┌─────▼─────┐  ┌──▼────────┐
     │ ENGINEERING │  │  DESIGN   │  │ EMOTION   │
     │   CORPS     │  │  SQUAD    │  │  TEAM     │
     │             │  │           │  │           │
     │ Atlas       │  │ Canvas    │  │ Haven     │
     │ Nova        │  │ Iris      │  │ Aria     │
     │ Pulse       │  │ Echo      │  │ Beacon   │
     │ Forge       │  │ Prism     │  │ Ember    │
     │ Sentinel    │  │ Lumen     │  │ Solace   │
     │ Anchor      │  │ Thread    │  │          │
     │ Stitch      │  │           │  │          │
     │ Spark       │  │           │  │          │
     │ Matrix      │  │           │  │          │
     └────────┬───┘  └─────┬─────┘  └──┬────────┘
              │            │            │
              └────────────┼────────────┘
                           │
              ┌────────────▼────────────┐
              │       MESSAGE BUS       │
              │  (Agent Communication)   │
              └──────────────────────────┘
```

---

## 2. MESSAGE BUS

Agents communicate through a shared message bus.
Every message is structured, typed, and logged.

### Message Types

| Type | Purpose | Example |
|------|---------|---------|
| TASK | Request work | Atlas→Forge: "Generate scoring endpoint from spec" |
| REVIEW | Request review | Forge→Critic: "Review generated backend code" |
| APPROVE | Approve deliverable | Critic→Sentry: "Code passes all 7 layers" |
| REJECT | Reject with feedback | Sentinel→Forge: "Input validation missing on /v1/users" |
| BROADCAST | Share information | Haven→All: "New hope vocabulary: use 'between chapters' not 'unemployed'" |
| ALERT | Urgent issue | Pulse→Jake: "Port 8080 occupied by fabric--serve" |
| QUERY | Ask question | Nova→Atlas: "What's the API contract for /v1/coaching-tip?" |
| RESULT | Return output | Forge→Critic: "main.go generated (36KB), 17 endpoints" |

### Message Format

```json
{
  "id": "msg_01HZ3ABCDEF",
  "from": "forge",
  "to": "critic",
  "type": "REVIEW",
  "priority": "HIGH",
  "subject": "signal/backend/main.go — 17 endpoints complete",
  "timestamp": "2026-04-14T18:30:00Z",
  "context": {
    "project": "signal",
    "iteration": 3,
    "files": ["main.go", "go.mod"],
    "previous_score": 76.7,
    "blocking": false
  },
  "body": "Generated backend with all 17 endpoints. In-memory storage. UUID. Scoring algorithm wired. Requesting architecture + security + emotional review.",
  "attachments": [
    {"type": "file", "path": "signal/backend/main.go", "size": 36000}
  ]
}
```

### Routing Rules

1. **TASK** messages route to the agent best suited for the work
2. **REVIEW** messages route through the Critic Gate (7-layer)
3. **ALERT** messages always CC Jake and Susan
4. **BROADCAST** messages go to all agents in the relevant team
5. **REJECT** messages always include specific remediation guidance

---

## 3. WORKFLOWS

### Workflow 1: Feature Build (The Standard Path)

```
Marcus (PM) ──TASK──→ Atlas (Architect)
  Atlas ──SPEC──→ Forge (Generator)
    Forge ──RESULT──→ Mason/Weaver (Builders)
      Mason ──REVIEW──→ Inspector (Style)
      Mason ──REVIEW──→ Atlas (Architecture)
      Mason ──REVIEW──→ Sentinel (Security)
      Weaver ──REVIEW──→ Iris (Accessibility)
      Weaver ──REVIEW──→ Haven (Emotional)
    Inspector ──APPROVE──→ Critic
    Atlas ──APPROVE──→ Critic
    Sentinel ──APPROVE──→ Critic
    Iris ──APPROVE──→ Critic
    Haven ──APPROVE──→ Critic
  Critic ──APPROVE──→ Harness (Tests)
    Harness ──RESULT──→ Sentry (CI/CD)
  Sentry ──APPROVE──→ Pulse (Deploy)
Pulse ──RESULT──→ Bridge (Notify teams)
```

**Timeline target**: Feature spec → Production in <= 48 hours

### Workflow 2: Hotfix (The Emergency Path)

```
Pulse ──ALERT──→ Jake (Director)
Jake ──TASK──→ Atlas + Sentinel (Fast response)
Atlas ──FIX──→ Inspector (Expedited review, 3 layers only)
  Inspector ──APPROVE──→ Sentry (Skip full gate)
Sentry ──DEPLOY──→ Pulse (Canary)
Pulse ──RESULT──→ Coroner (Post-mortem within 24h)
```

**Timeline target**: Alert → Fix deployed in <= 4 hours

### Workflow 3: Emotional Review (The Haven Path)

```
Haven ──REVIEW──→ Aria (Copy emotional alignment)
Haven ──REVIEW──→ Solace (Transition safety check)
Haven ──REVIEW──→ Lumen (Color psychology check)
Haven ──REVIEW──→ Ember (Emotional QA)
  Aria ──RESULT──→ Haven
  Solace ──RESULT──→ Haven
  Lumen ──RESULT──→ Haven
  Ember ──RESULT──→ Haven
Haven ──APPROVE/REJECT──→ Critic (Final gate)
```

**Timeline target**: Emotional review in <= 30 minutes

### Workflow 4: APS Attractor Loop (The Build System)

```
Jake ──TASK──→ Susan (Initialize)
Susan ──TASK──→ Forge (Generate code from spec)
  Forge ──RESULT──→ Mason (Write code)
    Mason ──RESULT──→ Sentry (Build)
      Sentry ──RESULT──→ Pulse (Smoke test)
        Pulse ──RESULT──→ Harness (Validate)
          Harness ──RESULT──→ Gauge (Score)
            Gauge ──RESULT──→ Susan (Convergence check)
              IF CONVERGED: Susan ──RESULT──→ Jake (Complete)
              IF NOT: Susan ──TASK──→ Tinker (Recovery guidance) → Forge (Regenerate)
```

**Timeline target**: Full attractor loop in <= 2 hours (10 iterations max)

---

## 4. TEAM ASSEMBLY BY TASK TYPE

| Task Type | Lead | Team | Reviewers |
|-----------|------|------|-----------|
| New API endpoint | Atlas | Mason, Matrix, Harness | Sentinel, Inspector, Critic |
| Frontend page | Nova | Canvas, Spark, Prism, Aria | Iris, Haven, Ember |
| Scoring algorithm | Mira | Atlas, Matrix | Critic, Anchor, Gauge |
| Copy/Content | Aria | Haven, Beacon, Solace | Thread, Ember |
| Bug fix | Atlas | Mason or Weaver | Inspector, Sentinel, Coroner |
| Performance issue | Anchor | Atlas, Pulse | Gauge, Critic |
| Security issue | Sentinel | Atlas, Pulse | Shield, Critic |
| Accessibility issue | Iris | Nova, Canvas | Ember, Haven |
| Emotional design | Haven | Aria, Lumen, Thread, Solace | Ember, Beacon |
| Deployment | Pulse | Sentry, Anchor | Critic, Shield |

---

## 5. AGENT LIFECYCLE

### States
```
IDLE ──→ ASSIGNED ──→ WORKING ──→ REVIEWING ──→ APPROVED ──→ DEPLOYED
  │                                  │
  │                                  └─→ REJECTED ──→ WORKING (fix)
  │
  └─→ BLOCKED ──→ (waiting on dependency)
```

### State Transitions
1. **IDLE → ASSIGNED**: Susan routes a TASK to the agent
2. **ASSIGNED → WORKING**: Agent begins work (acknowledges within 5 min)
3. **WORKING → REVIEWING**: Agent completes work and requests review
4. **REVIEWING → APPROVED**: All reviewers pass
5. **REVIEWING → REJECTED**: Any reviewer blocks
6. **REJECTED → WORKING**: Agent addresses feedback and resubmits
7. **APPROVED → DEPLOYED**: Sentry runs CI/CD, Pulse deploys
8. **IDLE → BLOCKED**: Agent can't start (waiting on another agent)
9. **BLOCKED → ASSIGNED**: Dependency resolved

---

## 6. CONFLICT RESOLUTION

When agents disagree:

1. **Technical disagreement** (e.g., Atlas vs. Sentinel on architecture):
   - Both write 1-paragraph position statements
   - Critic evaluates both positions
   - Jake breaks ties if needed

2. **Emotional disagreement** (e.g., Haven vs. Marcus on feature priority):
   - Haven advocates for user emotional impact
   - Marcus advocates for business value
   - Thread maps the emotional journey impact
   - Jake decides based on mission alignment

3. **Quality disagreement** (e.g., Inspector vs. Forge on code style):
   - The process document is the source of truth
   - If undefined, Critic sets precedent
   - Ledger records the decision as ADR

---

## 7. DAILY STANDUP (AUTOMATED)

Every day at 0800 MT, Susan generates a standup report:

```markdown
## Signal Standup — 2026-04-15

### Active Work
- [Atlas] /v1/score optimization (p99 340ms → target <50ms)
- [Nova] Applications page redesign (dark mode, emotional arc)
- [Aria] Landing page copy revision (hope vocabulary pass)
- [Haven] Emotional review of assessment flow

### Blocked
- [Stitch] Waiting on API contract from Atlas for /v1/applications

### Completed Yesterday
- [Mason] Fixed email uniqueness bug in /v1/users
- [Harness] Unit test coverage: 91% (up from 84%)
- [Ember] Emotional QA on coach.html — Hope score: 9/10

### Metrics
- Build pipeline: GREEN (all 7 stages passing)
- Test coverage: 91%
- Open issues: 3 (1 P2, 2 P3)
- Hope gate pass rate: 87% (target: 100%)
```

---

## 8. SPRINT RHYTHM

### Weekly Sprint (Monday → Friday)

**Monday**: Planning
- Marcus prioritizes backlog
- Susan assigns agents to tasks
- Bridge identifies cross-team dependencies

**Tuesday-Thursday**: Build
- Engineering Corps builds features
- Design Squad builds experiences
- Emotion Team reviews every change

**Friday**: Ship + Review
- Sentry deploys approved changes
- Coroner reviews any incidents
- Gauge runs performance baselines
- Ember runs emotional QA on all shipped features
- Susan generates sprint report

### Sprint Ceremony Sequence
```
Mon 0900: Sprint Planning (Marcus + Susan + Jake)
Wed 1400: Emotional Review Checkpoint (Haven + Aria + Solace)
Fri 1100: Sprint Review (All teams — 30 min max)
Fri 1400: Retrospective (Critic + Coroner + Jake)
```

---

## 9. KNOWLEDGE BASE

Every agent writes to the shared knowledge base.

### Document Types
- **ADR** (Architecture Decision Record): Ledger maintains
- **PRD** (Product Requirements): Marcus writes, Jake approves
- **SPEC** (Technical Specification): Atlas writes, Critic reviews
- **EMO** (Emotional Design Decision): Haven writes, Solace reviews
- **PIT** (Pitfall/Incident): Coroner writes after every incident

### Knowledge Base Structure
```
signal/
  docs/
    adr/           — Architecture decisions
    prd/           — Product requirements
    specs/         — Technical specifications
    emo/           — Emotional design decisions
    incidents/     — Post-mortems
    vocabulary/    — Hope vocabulary (Aria maintains)
    patterns/     — Code patterns (Inspector maintains)
```

---

## 10. THE GOLDEN RULE

No agent works alone. Every piece of code, every design decision,
every word of copy passes through at least two other agents before
it reaches the user.

The engineer doesn't ship without the reviewer.
The designer doesn't ship without the emotional architect.
The writer doesn't ship without the hope specialist.

Because Signal is not a product. It is a promise.
And promises are kept by teams, not individuals.
