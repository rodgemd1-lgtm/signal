# SIGNAL — APS WORLD-CLASS ENGINEERING PROCESS

> "The process is not bureaucracy. The process is how we guarantee
> that every line of code we ship is worthy of someone's hope."

Version: 1.0 | April 2026 | Rodgers Intelligence Group

---

## 1. THE BUILD PIPELINE

Every commit flows through a 7-stage gate. No exceptions.

```
COMMIT
  │
  ├─→ [1] FORMAT    ── gofmt, prettier ──→ PASS/FAIL
  ├─→ [2] LINT      ── golangci-lint, eslint ──→ PASS/FAIL
  ├─→ [3] UNIT TEST ── go test ./... ──→ PASS/FAIL (coverage >= 90%)
  ├─→ [4] INTEGRATION ── API contract tests ──→ PASS/FAIL
  ├─→ [5] SECURITY  ── gosec, dependency audit ──→ PASS/FAIL
  ├─→ [6] BUILD     ── go build -o server ──→ PASS/FAIL
  └─→ [7] REVIEW    ── Critic Gate (7-layer) ──→ APPROVE/REJECT
       │
       └─→ MERGE ──→ DEPLOY (canary) ──→ MONITOR
```

**Rule**: If any stage fails, the commit is BLOCKED. No force-merges.
No "I'll fix it later." Fix it now or don't commit.

---

## 2. TESTING PYRAMID

```
              ╱  E2E  ╲                10% — User journeys
            ╱          ╲               (critical paths only)
          ╱  Integration ╲            20% — API contracts
        ╱                  ╲          (endpoint → response validation)
      ╱      Unit Tests      ╲       70% — Functions, edge cases
    ╱                          ╲     (pure logic, no I/O)
  ╱──────────────────────────────╲
```

### Unit Tests (70%)
- Every function gets at least one test
- Every error path gets a test
- Every boundary value gets a test
- Pure functions only — no HTTP, no file I/O, no external calls
- Mock dependencies via interfaces
- Target: >= 90% coverage, >= 95% for scoring algorithms

```go
func TestComputeSkillMatch(t *testing.T) {
    tests := []struct{
        name     string
        user     *User
        job      *Job
        expected float64
    }{
        {"exact match", &User{Skills: []string{"AI"}}, &Job{Description: "AI role"}, 100.0},
        {"no match", &User{Skills: []string{"Sales"}}, &Job{Description: "AI role"}, 0.0},
        {"partial match", &User{Skills: []string{"AI", "Python", "Leadership"}}, &Job{Description: "AI and Python required"}, 66.7},
        {"empty skills", &User{Skills: []string{}}, &Job{Description: "AI role"}, 50.0},
        {"empty description", &User{Skills: []string{"AI"}}, &Job{Description: ""}, 50.0},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := server.computeSkillMatch(tt.user, tt.job)
            if math.Abs(result - tt.expected) > 1.0 {
                t.Errorf("expected %.1f, got %.1f", tt.expected, result)
            }
        })
    }
}
```

### Integration Tests (20%)
- Every API endpoint gets a contract test
- Request → Response schema validation
- Error code + error message validation
- State mutation verification (POST creates, PUT updates, DELETE removes)

```go
func TestCreateUserAPI(t *testing.T) {
    srv := NewServer()
    ts := httptest.NewServer(srv)
    defer ts.Close()

    body := `{"email":"test@rig.ai","name":"Test"}`
    resp, err := http.Post(ts.URL+"/v1/users", "application/json", strings.NewReader(body))
    require.NoError(t, err)
    assert.Equal(t, 201, resp.StatusCode)

    var user User
    json.NewDecoder(resp.Body).Decode(&user)
    assert.NotEmpty(t, user.ID)
    assert.Equal(t, "test@rig.ai", user.Email)
    assert.NotEmpty(t, user.CreatedAt)
}
```

### E2E Tests (10%)
- Critical user journey: Create user → Create job → Score → View dashboard
- Coaching tip loads
- Persona classification works
- Application flow: Create → Update status → Verify pipeline

---

## 3. CODE REVIEW PROCESS (THE CRITIC GATE)

### Review Layers

| # | Layer | Agent | Time Limit | Blocking? |
|---|-------|-------|------------|-----------|
| 1 | Style & Patterns | Inspector | 5 min | YES |
| 2 | Architecture | Atlas | 15 min | YES |
| 3 | Security | Sentinel | 10 min | YES |
| 4 | Performance | Anchor | 10 min | YES |
| 5 | Accessibility | Iris | 10 min | YES |
| 6 | Emotional Impact | Haven | 10 min | YES |
| 7 | Final Gate | Critic | 15 min | YES |

**Total review time: <= 75 minutes per change.**
**One REJECT from any layer = change is BLOCKED.**

### Review Checklist (Every Layer Must Pass)

**Layer 1: Style & Patterns (Inspector)**
- [ ] Code follows Go style guide (gofmt, go vet)
- [ ] Consistent naming conventions
- [ ] No dead code or TODO placeholders
- [ ] Error messages are lowercase, no punctuation
- [ ] JSON tags match field names (snake_case)

**Layer 2: Architecture (Atlas)**
- [ ] No circular dependencies
- [ ] Proper separation of concerns
- [ ] Data flow is clear and documented
- [ ] No god objects (handler > 100 lines = refactor)
- [ ] In-memory map usage is correct (no DB)

**Layer 3: Security (Sentinel)**
- [ ] All inputs validated before use
- [ ] No SQL/JSON injection vectors
- [ ] CORS configured correctly
- [ ] No sensitive data in logs
- [ ] Rate limiting on mutation endpoints

**Layer 4: Performance (Anchor)**
- [ ] No unbounded maps (consider max size limits)
- [ ] Mutex scopes are minimal (no lock across HTTP calls)
- [ ] No goroutine leaks
- [ ] JSON encoding is streaming (no full buffer)
- [ ] O(n) operations documented for large inputs

**Layer 5: Accessibility (Iris)**
- [ ] Semantic HTML elements used
- [ ] ARIA labels on interactive elements
- [ ] Color contrast >= 4.5:1 (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Screen reader tested on critical flows

**Layer 6: Emotional Impact (Haven)**
- [ ] Every page has a hope signal (word, color, animation)
- [ ] No despair triggers (cold numbers without context)
- [ ] Failure states are kind (rejection → "What to adjust")
- [ ] Progress is visible and celebrated
- [ ] Language is empowering, not clinical

**Layer 7: Final Gate (Critic)**
- [ ] All 6 previous layers passed
- [ ] No blocking issues remain
- [ ] Tests cover the change
- [ ] Documentation updated
- [ ] CHANGELOG entry added

---

## 4. QUALITY GATES

### Gate 1: Pre-Commit (Local)
```
gofmt ── golangci-lint ── go vet ── go test -short
```
Any failure = commit blocked.

### Gate 2: CI Pipeline (Remote)
```
Build ── Unit Tests (full) ── Integration Tests ── Security Scan ── Coverage Report
```
Coverage < 90% = pipeline fails.

### Gate 3: Code Review (Critic Gate)
```
7-layer review (see above)
```
Any REJECT = pipeline fails.

### Gate 4: Staging Deploy
```
Deploy to staging ── Smoke test ── E2E test ── Performance baseline
```
p99 > 2x baseline = deploy blocked.

### Gate 5: Production Deploy
```
Canary 10% ── Monitor 15min ── Canary 50% ── Monitor 15min ── Full rollout
```
Error rate > 0.1% = automatic rollback.

---

## 5. BRANCH STRATEGY

```
main (protected, requires all gates)
  │
  ├─→ feature/scoring-v2
  ├─→ feature/coach-weekly-tips
  ├─→ fix/salary-overlap-bug
  └─→ hotfix/server-crash-on-nil
```

**Rules**:
- main is protected. No direct pushes.
- Feature branches: `feature/<name>`
- Fix branches: `fix/<name>`
- Hotfix branches: `hotfix/<name>` (expedited review, 3 layers minimum)
- Branch naming: lowercase, hyphens, descriptive
- Commit messages: conventional commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`)

---

## 6. CONVENTIONAL COMMITS

```
feat: add bulk scoring endpoint
fix: handle nil pointer in salary fit calculation
refactor: extract scoring into separate functions
test: add boundary tests for skill match algorithm
docs: update API contract for /v1/score
chore: update golangci-lint config
style: fix formatting in handler
security: add rate limiting to /v1/users
perf: optimize job listing with pagination
hope: add encouragement message to empty dashboard state
```

The `hope:` prefix is unique to Signal. It marks changes specifically
designed to improve the emotional experience. These changes always
require Haven's review.

---

## 7. INCIDENT RESPONSE

### Severity Levels
- **P0 (Critical)**: Service down, data loss, security breach → Jake + Pulse + Sentinel
- **P1 (High)**: Major feature broken, significant user impact → Pulse + Atlas
- **P2 (Medium)**: Feature degraded, workaround exists → Atlas + Mason
- **P3 (Low)**: Minor bug, no user impact → Next sprint

### Response Protocol
```
1. DETECT  ── Pulse alerts
2. TRIAGE  ── Jake assigns severity
3. FIX     ── Agent team assembled by severity
4. VERIFY  ── Harness runs full test suite
5. DEPLOY  ── Sentry runs canary deploy
6. POST    ── Coroner writes post-mortem within 24h
7. PREVENT ── Ledger records decision, Sentry adds regression test
```

### Post-Mortem Template (Coroner)
```markdown
## Incident: [title]
Date: [date]
Severity: P[0-3]
Duration: [time]
Impact: [users affected, features broken]

### Timeline
- T+0: [what happened]
- T+X: [detection]
- T+Y: [fix deployed]

### Root Cause
[technical explanation]

### Contributing Factors
1. [factor]
2. [factor]

### Prevention
1. [action item] — Owner: [agent] — Due: [date]
2. [action item] — Owner: [agent] — Due: [date]

### Lessons Learned
[what we learned that changes our process]
```

---

## 8. PERFORMANCE BUDGETS

| Metric | Target | Max |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | 3.0s |
| Time to Interactive | < 2.5s | 5.0s |
| API p50 latency | < 10ms | 50ms |
| API p95 latency | < 50ms | 200ms |
| API p99 latency | < 100ms | 500ms |
| Lighthouse Performance | >= 90 | 80 |
| Lighthouse Accessibility | >= 95 | 90 |
| JavaScript bundle | < 50KB | 100KB |
| CSS bundle | < 20KB | 50KB |

**Budget breach = build failure. No exceptions.**

---

## 9. ACCESSIBILITY STANDARDS (WCAG 2.1 AA)

Every page MUST:
- [ ] Have a descriptive `<title>` and `<h1>`
- [ ] Pass automated axe-core scan with 0 violations
- [ ] Have color contrast >= 4.5:1 for text, 3:1 for large text
- [ ] Be fully keyboard navigable (Tab, Enter, Escape)
- [ ] Have ARIA labels on all interactive elements
- [ ] Have `lang="en"` on `<html>`
- [ ] Have `prefers-reduced-motion` support
- [ ] Have `prefers-color-scheme` support (dark mode default)
- [ ] Not use color alone to convey information
- [ ] Have focus indicators visible on all interactive elements

Iris reviews every change. No exceptions.

---

## 10. THE HOPE GATE (UNIQUE TO SIGNAL)

Every feature, every page, every interaction passes through Haven's Hope Gate.

**The Question**: "If someone just lost their job and comes to this page, will they feel more hopeful after seeing it?"

**Scoring** (1-10):
1-3: Actively harmful (cold, clinical, or despair-inducing)
4-5: Neutral (functional but no emotional connection)
6-7: Helpful (clear, kind, but not inspiring)
8-9: Hopeful (makes them believe change is possible)
10: Transformative (makes them believe THEY are possible)

**Minimum to ship**: 8/10

**If the Hope Gate fails**, Haven sends the change back with specific guidance:
- "Add a progress indicator — show them they're moving forward"
- "Replace 'No applications yet' with 'Your journey starts here'"
- "The rejection page needs a recovery path — what can they learn?"
- "This number without context is just anxiety. Add comparison or trend."

---

This is how we build. With rigor. With empathy. With hope.
The process is not bureaucracy — it is the guarantee that what we ship
is worthy of someone's trust.
