# Signal — Product Specification
## The Career Intelligence Platform

---

## What is Signal?

Signal is an AI-powered career intelligence platform for executives targeting VP, SVP, and C-suite roles. It transforms the job search from reactive applications into proactive intelligence operations.

## Core Product

**Job Search Intelligence API + Dashboard**

- REST API on port 8080 (Go, in-memory storage)
- Marketing landing page (index.html)
- Probability dashboard (probability.html)
- Coach Mode (coach.html)
- Assessment funnel (assessment.html)

## Design Language

- Dark mode: `#0a0a0f` background, `#3b82f6` accent, `#10b981` success
- Fonts: Inter (UI), JetBrains Mono (code/data)
- No external dependencies except Google Fonts

## Pages

| Page | Purpose | Key API |
|------|---------|---------|
| index.html | Landing/conversion | None |
| assessment.html | Intake form | POST /v1/users |
| probability.html | Monte Carlo dashboard | GET /v1/dashboard/{id} |
| coach.html | Weekly coaching | GET /v1/coaching-tip, GET /v1/persona/{id} |
| applications.html | Pipeline tracker | GET /v1/jobs, GET /v1/applications |

## API Endpoints (v1)

All endpoints prefixed `/v1/`

- `POST /v1/users` — Create user profile
- `GET /v1/users/{id}` — Get user
- `PUT /v1/users/{id}` — Update user
- `POST /v1/jobs` — Create job listing
- `GET /v1/jobs/{id}` — Get job
- `PUT /v1/jobs/{id}` — Update job
- `PATCH /v1/jobs/{id}/status` — Update status
- `GET /v1/jobs?user_id=X` — List jobs with filtering
- `DELETE /v1/jobs/{id}` — Delete job
- `POST /v1/score` — Score user vs job
- `POST /v1/score/bulk` — Score all unscored jobs
- `POST /v1/applications` — Create application
- `GET /v1/applications/{id}` — Get application
- `PATCH /v1/applications/{id}/status` — Update status
- `GET /v1/applications?user_id=X` — List applications
- `GET /v1/dashboard/{user_id}` — Dashboard summary
- `GET /v1/health` — Health check

## User Profile

- name, email (required)
- title, target_salary_min, target_salary_max
- location_preference: remote | hybrid | onsite | any
- skills: string[]
- experience_years: int
- industry_preferences: string[]
- Persona: Creative | Technical | Sales | Management | Startup/Fixer

## Scoring

Weighted average of:
- skill_match (35%): keyword overlap between user.skills and job.description
- salary_fit (20%): overlap between user range and job range
- location_fit (15%): exact/compatible/partial/incompatible
- seniority_fit (15%): based on title keywords vs experience_years
- industry_fit (15%): industry preference overlap

## Coaching System

- Weekly coaching tip (contextual to persona + pipeline stage)
- 3 prioritized action items per week
- Progress timeline through job search stages
- localStorage for completion tracking

## Data Storage

MVP: In-memory Go maps (no database)
Production: Supabase (pgvector for job matching)
