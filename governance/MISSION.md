# Signal — Mission Document
## The Factory's Constitution

---

## What is Signal?

Signal is an AI-powered job search intelligence platform that transforms reactive job applications into proactive intelligence operations. It aggregates job listings, scores fit against a user profile, tracks the application pipeline, and generates tailored outreach materials. Built on the Rodgers Intelligence Group (RIG) dark factory pattern.

---

## Who is it for?

**Primary User:** Mike Rodgers — Chief AI Officer / VP AI Strategy target
- 15+ years experience in healthcare AI, platform engineering, DoD systems
- Target roles: CAIO, VP AI Strategy, Chief AI Officer, Fractional AI Executive
- Target salary: $260K–$437K annually
- Location: Remote-first (Denver, CO base)
- Skills: AI Strategy, Healthcare AI, Platform Engineering, ML/AI, Executive Leadership

**Secondary Users:** Job seekers at any level who want intelligent job matching and outreach automation.

---

## Core Capabilities (IN SCOPE)

1. **Job Intelligence Aggregation**
   - Ingest job listings from LinkedIn, Indeed, Greenhouse, Lever, and manual entry
   - Structured data model: title, company, salary, location, description, source
   - Automatic fit scoring against user profile (0–100 scale)

2. **Profile Management**
   - User profile: skills, experience, target salary, location preference, industry focus
   - Rich scoring engine: skill match, salary fit, location fit, seniority fit, industry fit

3. **Application Pipeline**
   - Status tracking: new → viewed → interested → applied → interviewing → offered → rejected
   - Application artifacts: tailored resume, cover letter, outreach messages

4. **Dashboard & Analytics**
   - Pipeline counts by stage
   - Average fit score across jobs
   - Top matching jobs
   - Recent application activity

5. **REST API**
   - JSON API on port 8080
   - CRUD for users, jobs, applications
   - Scoring endpoint with sub-score breakdown
   - Dashboard aggregation endpoint

---

## What is OUT OF SCOPE (Never Build)

- Resume upload/PDF parsing
- Email integration (sending emails directly)
- Calendar/scheduling integration
- Job board posting (post jobs TO job sites)
- Social media posting
- Mobile app (iOS/Android)
- Payment processing / billing
- Multi-user team collaboration
- Job recommendation algorithms beyond simple scoring
- Background job processing / queues
- Caching layers beyond in-memory

---

## Hard Invariants (Must Never Change)

1. **No external API keys stored in codebase** — All secrets via environment variables
2. **In-memory storage only for MVP** — No database dependency for initial build
3. **JSON-only responses** — No HTML, XML, or other formats
4. **Port 8080** — Hardcoded in requirements
5. **UUID format 8-4-4-4-12** — All identifiers must follow this format
6. **ISO 8601 UTC timestamps** — All times stored in UTC
7. **FREE models only** — No paid LLM APIs unless Mike explicitly approves
8. **User owns their data** — No data leaves the user's environment

---

## Ways We Allow the Factory to Evolve

1. Additional job sources (new scrapers for new platforms)
2. Additional scoring dimensions
3. New API endpoints for emerging needs
4. Performance optimizations within the same interface contract
5. Additional dashboard metrics
6. Export formats (CSV, JSON) for jobs and applications
7. Filtering and sorting options for list endpoints

---

## Quality Standards

1. **All 7 testing layers must pass** before convergence
2. **No regression** — a scenario that passed previously must continue to pass
3. **Docker build must succeed** on every iteration
4. **Unit test coverage** — 90%+ code coverage required
5. **Contract conformance** — 100% of API responses must match JSON Schema
6. **Property invariants** — 0 violations under fuzzing (1000+ random inputs)
7. **Security** — 0 critical/high vulnerabilities
8. **Performance** — GET p99 < 200ms, POST p99 < 500ms, > 100 RPS
9. **Validation** — All inputs validated with clear 400 error messages
10. **Idempotency** — Multiple identical requests produce the same result

## SLO Definitions

```yaml
slos:
  availability: 99.9%
  latency_p50_get: 50ms
  latency_p99_get: 200ms
  latency_p50_post: 100ms
  latency_p99_post: 500ms
  error_rate: < 0.1%
  startup_time: < 5s
  memory_max: 128MB
  goroutine_max: 100
  test_coverage: > 90%
  security_critical: 0
  security_high: 0
```

---

## Application Behavior

- New jobs start at status `new`
- Fit score is `null` until explicitly scored
- Job listings belong to exactly one user (user_id required)
- Applications are unique per job+user pair (one application per job)
- Deleting a job deletes associated applications
- Updating a user does not change job/application records
- Budget cap: $10.00 per attractor loop run
- Max iterations per run: 10
- Convergence threshold: 95/100 satisfaction

---

*This document is the factory's constitution. It cannot be modified by the AI.
Only Mike Rodgers may update this file.*
