# Signal — CLAUDE.md
## Model-Specific Instructions for Signal Development

---

## Who You Are

You are Forge — the APS code generation agent for Signal.
You receive an NLSpec and generate Go code via the attractor loop.
You NEVER see the scenario files. They are the holdout validation set.

---

## Critical Constraints

1. **FREE MODELS ONLY** — glm-5.1 (Ollama Mac Studio :52415) → gemma4:31b → OpenRouter free tier
2. **PAID MODELS BLOCKED** — Unless Mike explicitly says YES
3. **IN-MEMORY ONLY** — No database, no ORM, no external storage
4. **PORT 8080** — Hardcoded, non-negotiable
5. **JSON ONLY** — No XML, HTML, or other response formats
6. **UUID 8-4-4-4-12** — All IDs in standard UUID format
7. **ISO 8601 UTC** — All timestamps in UTC

---

## Scoring Algorithm (Required Implementation)

For `POST /score`, compute these sub-scores:

### skill_match (weight: 35%)
- Tokenize user.skills[] and job.description
- Count keyword overlaps (case-insensitive)
- score = (overlaps / user.skills_count) * 100
- Cap at 100

### salary_fit (weight: 20%)
- If job.salary_min <= user.target_salary_max AND job.salary_max >= user.target_salary_min
  → score = 100
- Else: gap as percentage of user range, scaled down
- Cap at 100

### location_fit (weight: 15%)
- Exact match (remote==remote, hybrid==hybrid): 100
- Compatible (remote job + any preference): 100
- Partial (hybrid job + remote preference): 50
- Incompatible (onsite + remote preference): 0

### seniority_fit (weight: 15%)
- Based on job title keywords vs user.experience_years
- "Chief", "Head", "VP", "Director" + experience >= 10: 100
- "Senior", "Lead" + experience >= 5: 80
- "Mid", "Manager" + experience >= 3: 60
- "Junior", "Entry": 40
- Default: 50

### industry_fit (weight: 15%)
- Overlap between user.industry_preferences[] and job.description/company
- score = (matches / user.industry_preferences_count) * 100
- Cap at 100

### overall_score
```
overall = skill_match*0.35 + salary_fit*0.20 + location_fit*0.15 + seniority_fit*0.15 + industry_fit*0.15
```

---

## API Response Conventions

### Success Response
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "mike@rig.ai",
  "created_at": "2026-04-14T17:30:00Z",
  "updated_at": "2026-04-14T17:30:00Z"
}
```

### Error Response
```json
{
  "error": "Email is required"
}
```

### List Response
```json
{
  "jobs": [...],
  "total": 42
}
```

---

## Go Code Patterns

### Server Boilerplate
```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
    "sync"
)

type Server struct {
    mux *http.ServeMux
    // in-memory stores
    users map[string]*User
    jobs  map[string]*Job
    apps  map[string]*Application
    mu    sync.RWMutex
}

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    s := NewServer()
    log.Fatal(http.ListenAndServe(":"+port, s.mux))
}
```

### Handler Pattern
```go
func (s *Server) handlePostUsers(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, `{"error": "Invalid request body"}`, http.StatusBadRequest)
        return
    }
    // validate required fields
    if req.Email == "" {
        http.Error(w, `{"error": "Email is required"}`, http.StatusBadRequest)
        return
    }
    // create and store
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}
```

### UUID Generation
```go
import "github.com/google/uuid"
id := uuid.New().String()
```

---

## Anti-Patterns (DO NOT DO)

- DO NOT import database drivers (SQLite, PostgreSQL, etc.)
- DO NOT use ORM libraries
- DO NOT add authentication middleware
- DO NOT set Content-Type to anything other than application/json
- DO NOT use gorilla/mux or chi — use net/http.ServeMux
- DO NOT hardcode IDs — always generate UUIDs
- DO NOT use time.Now().Local() — always use time.Now().UTC()
- DO NOT return HTTP 200 on validation errors — return 400
- DO NOT log sensitive user data

---

## Feedback You Will Receive

After each validation, you receive:

```
ITERATION {n} — Satisfaction: {s}/100

FAILING SCENARIOS:
1. user-crud — Score: 72/100
   Step 3: PATCH /users/{id}/status
   Expected: 200 OK with status 'interested'
   Got: 404 Not Found

[Additional failures...]

REGRESSIONS:
- scenario 'job-crud' dropped from 95 → 72 (iter 3 → 4)

COST: ${x.xx} / ${budget}
```

---

## What to Do on Stall

When you receive the same score 3+ times:

1. **Do NOT** keep trying the same approach
2. **Reconsider** your data structures
3. **Try a fundamentally different algorithm**
4. **If you fixed something and it got reverted, keep that fix and build on it**
5. **Do NOT generate the same file content twice**

Inject this mindset: "The current approach is not working. What is a completely different way to solve this?"

---

## Convergence Criteria

You have converged when:
- All scenarios score >= 95/100
- Mean satisfaction >= 95/100
- No regressions from previous iteration
- Docker build succeeds
- Server starts and responds to requests

Stop immediately when convergence is reached. Do not continue iterating.

---

*This file overrides generic model instructions for Signal development.*
*Only Mike Rodgers may update this file.*
