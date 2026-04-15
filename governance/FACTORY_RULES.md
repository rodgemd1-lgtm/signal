# Signal — Factory Rules
## How the Dark Factory Operates on Signal

---

## Triage Rules

### Issue Classification
When evaluating a new feature or change request, the factory classifies as:

| Classification | When | Action |
|---------------|------|--------|
| **ACCEPT** | In-scope per MISSION.md, fits within existing data model | Implement |
| **REJECT** | Out-of-scope per MISSION.md, or violates hard invariants | Close with explanation |
| **ESCALATE** | Ambiguous, requires architectural decision, or cost > $5 | Flag for Mike |

### Rejection Reasons
- Violates hard invariant (e.g., adds database dependency)
- Adds payment/billing integration
- Adds mobile app requirement
- Adds email sending capability
- Requires external API keys not in environment
- Scope creep beyond MISSION.md core capabilities

---

## Implementation Rules

### Code Generation
- Output MUST be in Go (per requirements section of spec.md)
- All files in `=== FILE: path ===` block format
- Main entry point: `cmd/server/main.go`
- Server listens on port `8080`
- Uses standard library net/http for HTTP handling
- In-memory storage only — no database drivers

### PR/Change Requirements
- **MAX 500 lines per iteration** — Break large changes into smaller focused pieces
- Each change must be independently validatable
- Changes must not break previously passing scenarios
- All new endpoints must have corresponding test scenarios

### File Structure
```
cmd/server/main.go       # Entry point, HTTP server setup
internal/
  handlers/             # HTTP handlers per resource
  models/                # Data model structs
  store/                 # In-memory store interface
  scoring/              # Fit scoring engine
  validator/            # Input validation
```

### Protected Files (AI Cannot Modify)
- `governance/MISSION.md` — The factory's constitution
- `governance/FACTORY_RULES.md` — These rules
- `governance/CLAUDE.md` — Model-specific instructions
- `spec.md` — The NLSpec specification
- `scenarios/*.yaml` — Holdout validation scenarios

---

## Validation Rules (Holdout Pattern)

### Independent Validation
The validator agent:
- Has **NO access** to implementation context
- Has **NO access** to commit messages or PR descriptions
- Has **NO access** to previous validation results
- Receives **ONLY**: running server URL + scenario file + governance docs

### Validation Workflow
1. Start the generated server in a Docker container
2. Run each YAML scenario against the live server
3. Score each scenario 0–100 via LLM judge
4. Aggregate: mean score across all scenarios
5. **Converge if mean >= 95**
6. **Block if any scenario regressed from previous passing state**

### Holdout Constraints
The validator must NOT:
- Read files in the implementation directory
- Check git history or commit messages
- Accept implementation hints from failure messages
- Consider code style or structure — only behavior

### Regression Detection
- Track per-scenario score across iterations
- If scenario was >= 95 and drops below 95 → REGRESSION
- Regressions block convergence (unless Mike overrides)
- Format: `scenario 'X' dropped from {prev} → {curr} (iter {n} → {n+1})`

---

## Quality Gates for Convergence (7-Layer Gauntlet)

All must be TRUE to declare convergence:

- [ ] LAYER 0 — Smoke: Binary pass (server starts, health check OK)
- [ ] LAYER 1 — Unit: 90%+ code coverage, all tests pass
- [ ] LAYER 2 — Contract: 100% JSON Schema conformance, 0 violations
- [ ] LAYER 3 — Property: 0 invariant violations under 1000+ fuzz inputs
- [ ] LAYER 4 — Scenario: Mean satisfaction >= 95/100, 0 regressions
- [ ] LAYER 5 — Security: 0 critical, 0 high vulnerabilities
- [ ] LAYER 6 — Performance: All latency/throughput budgets met
- [ ] Weighted convergence score >= 95/100
- [ ] Cost_usd < budget_usd ($10 default)
- [ ] Iteration <= max_iterations (10 default)

### Weighted Scoring
```
convergence = (
    smoke_pass     × 0.10  +
    unit_coverage  × 0.15  +
    contract_pass  × 0.15  +
    property_pass  × 0.10  +
    scenario_score × 0.20  +
    security_pass  × 0.15  +
    perf_pass      × 0.15
)
```

### Minimum Layer Scores
Every layer (except smoke) must score >= 80% for convergence.
You cannot compensate for bad security with good scenarios.
You cannot compensate for bad performance with good tests.

---

## Cost and Throughput Rules

### Model Escalation
- Start: Frugal tier (Qwen3-32B local)
- Escalate → Primary (glm-5.1) after 2 consecutive non-improving iterations
- Downgrade → Frugal after 5 consecutive improving iterations

### Budget Controls
- Default budget: $10.00 per run
- Abort if cost_usd >= budget_usd
- Track cost per iteration and accumulate

### Stall Detection
- Stall: same satisfaction score for `stall_limit` consecutive iterations
- Default stall_limit: 3
- On stall: trigger Wonder/Reflect (Tinker agent)
  - Wonder (temp=0.8): diagnose failures, return structured hypotheses
  - Reflect (temp=0.4): generate surgical fix from diagnosis

### Oscillation Detection
- SHA-256 hash of generated files per iteration
- A→B→A→B pattern detected → inject steering text
- Steering: "Try a fundamentally different approach. Do NOT revert."

---

## Error Handling

### Validation Failures
- Log each failing scenario with step detail
- Provide scenario summary in feedback (compact: 4KB max for early iterations)
- Escalate feedback detail by iteration (compact → standard → full)

### Build Failures
- Parse Docker build error output
- Include relevant error lines in feedback
- Do not include full build log

### Network/Container Failures
- Retry container startup once before marking as failure
- Log port binding errors specifically
- Report if container exits immediately with exit code

---

## Regression Testing

### Daily/Weekly Full Regression
- Run ALL scenarios (not just new ones)
- No knowledge of recent features or fixes
- Answers: Does the complete application still work as specified?
- Any failures become new implementation tasks

### Smoke Test
Before running full validation, verify:
- Server responds to `/` or basic health check
- Can create a user via POST /users
- Can create a job via POST /jobs
- Server port is reachable

---

## Escalation Triggers

Escalate to Mike (pause factory, await decision) when:

1. **Ambiguous scope** — Issue could be in-scope or out-of-scope
2. **Architectural decision** — Would require changing core data model
3. **Cost estimate > $5** — For a single feature addition
4. **User data concern** — Any decision involving data handling changes
5. **Third-party integration** — New external service dependency
6. **Security implication** — Any authentication, authorization, or data protection change

Escalation format:
```
ESCALATION: [reason]
Context: [what triggered this]
Options: [A] [B] [C]
Recommendation: [best option]
```

---

## Protected Files

The AI may NOT modify these files under any circumstances:

```
governance/MISSION.md       — Constitution
governance/FACTORY_RULES.md — These rules
governance/CLAUDE.md        — Model instructions
spec.md                     — NLSpec
scenarios/                  — All YAML files
```

These files can ONLY be changed by Mike Rodgers directly.

---

*This file is the factory's operating manual. It cannot be modified by the AI.
Only Mike Rodgers may update these rules.*
