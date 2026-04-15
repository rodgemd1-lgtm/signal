# SIGNAL — EMOTIONAL DESIGN FRAMEWORK

> "People don't come to Signal to find a job.
> They come to Signal because they want to believe they can become
> who they're meant to be. Our job is to make that belief justified."

Version: 1.0 | April 2026 | Rodgers Intelligence Group

---

## THE EMOTIONAL ARC

Every user arrives at Signal carrying something. Often it's heavy.
A layoff. A stagnation. A quiet dread that they're capable of more
but can't see the path. They're not looking for a resume builder.
They're looking for a reason to believe.

Signal's emotional arc is a story in five acts:

```
ACT 1: RECOGNITION    "You're not alone. This is real."
ACT 2: DISCOVERY      "You are more than your last job title."
ACT 3: CLARITY         "Here's where you stand. And here's where you could go."
ACT 4: EMPOWERMENT    "Your next move is clear. You can make it."
ACT 5: TRANSFORMATION "Look how far you've come. Keep going."
```

Each act maps to a page. Each page has a dominant emotion,
a color temperature, a voice tone, and a micro-interaction language.

---

## ACT 1: LANDING PAGE — RECOGNITION

**The user's feeling**: "I'm stuck. I don't know what to do next."
**What Signal says**: "You're not stuck. You're between chapters."
**Dominant emotion**: Recognition → Validation

### Design Elements

**Color temperature**: Deep dark → warm glow
- Background: `#0a0a0f` (the darkness before dawn)
- Hero gradient: `#0a0a0f` → `rgba(59,130,246,0.03)` (light emerging)
- Accent: `#3b82f6` (trust, stability, calm confidence)
- Text: `#f1f5f9` (clear, readable, not harsh)

**Copy voice**: Direct. Empathetic. Never patronizing.
- BAD: "Find your dream job today!" (false promise)
- BAD: "AI-powered job search platform" (clinical)
- GOOD: "See what's possible for you." (possibility without pressure)
- GOOD: "Your career intelligence. Not a job board." (differentiation)

**Hero section**:
```
SIGNAL.
Your career has a direction.
We help you see it.
```

The period after SIGNAL is deliberate. It's not Signal! or Signal?
It's Signal. A statement. A fact. You have a direction. Period.

**Micro-interactions**:
- Page loads dark. Hero text fades in over 0.8s. Not aggressive. Gentle.
- Scroll 200px: A warm gradient slowly appears beneath the hero.
  Like dawn breaking. Subconscious: "Something is emerging."
- CTA button: `#3b82f6` with a 0.3s hover glow. Not pulsing (anxious).
  Steady (confident). "I'm here when you're ready."

**Hope signal**: The scroll reveal itself. The page doesn't demand
attention. It earns it. You scroll, and more light appears.
Metaphor: the more you engage, the more you see.

---

## ACT 2: ASSESSMENT — DISCOVERY

**The user's feeling**: "I don't know what I'm worth. I don't know what I want."
**What Signal says**: "Tell us who you are. Not just what you've done."
**Dominant emotion**: Self-discovery → "I am more than my resume"

### Design Elements

**Color temperature**: Warm blue → Green hints
- Background: `#0a0a0f` (consistent base)
- Card backgrounds: `rgba(59,130,246,0.03)` (warm blue tint)
- Progress indicator: `#10b981` (green = growth, progress)
- Accent transitions from `#3b82f6` → `#10b981` as form completes

**Copy voice**: Curious. Encouraging. Never clinical.
- BAD: "Enter your salary expectations" (transactional)
- BAD: "Required fields marked *" (bureaucratic)
- GOOD: "What does success look like for you?" (aspirational)
- GOOD: "This helps us find roles that value what you bring." (why it matters)

**Form design**:
- One question at a time. Never a wall of fields.
- Each completed section illuminates a progress dot (green glow).
- The form doesn't say "Required." It says "This unlocks better matches."
- After the last field, a moment of stillness. Then: "Let's see what's out there."
  (Not "Submit." Not "Save." Let's see what's out there — anticipation.)

**Hope signal**: The progress bar fills with green light.
Each answer adds a dot. The dots are hope accumulating.
The user can SEE their own value taking shape.

---

## ACT 3: DASHBOARD — CLARITY

**The user's feeling**: "I have no idea where I stand."
**What Signal says**: "Here's the landscape. And here's where you fit."
**Dominant emotion**: Clarity → "Now I can see"

### Design Elements

**Color temperature**: Green dominant
- Background: `#0a0a0f`
- Score circles: Gradient `#10b981` → `#3b82f6` (growth + trust)
- Pipeline cards: Status-colored left border
- Numbers: `#f1f5f9` with contextual color underneath (green = good, blue = neutral)

**Copy voice**: Informative. Reassuring. Data-driven but not cold.
- BAD: "Application pipeline: 3 submitted, 1 interviewing" (clinical)
- GOOD: "3 applications in motion. 1 interview — they see what you bring."
- BAD: "Fit score: 87%" (meaningless alone)
- GOOD: "87% match — one of your strongest opportunities" (contextual)

**Data presentation rules**:
1. Never show a number without context. "87%" means nothing.
   "87% — your strongest match this week" means everything.
2. Never show a deficit without a path. "0 interviews" is devastating.
   "0 interviews yet. 3 applications are in review — that pipeline is building."
3. Always show progress, even if it's small. "1 new application this week"
   is not "only 1." It's "1 more than last week. Momentum."

**Hope signal**: The pipeline visualization itself. Seeing applications
move through stages — even slowly — creates a sense of progress.
The green `#10b981` on "in progress" items says: "This is alive. You're moving."

---

## ACT 4: COACH — EMPOWERMENT

**The user's feeling**: "I don't know what to do next. I'm overwhelmed."
**What Signal says**: "One step at a time. Here's your next move."
**Dominant emotion**: Empowerment → "I know what to do"

### Design Elements

**Color temperature**: Green → Gold
- Background: `#0a0a0f`
- Weekly focus card: Gold border `rgba(251,191,36,0.2)` (gold = achievement)
- Action items: Priority badges in blue/yellow/red
- Completion checkmarks: `#10b981` (green = done, progress, forward)

**Copy voice**: Coaching. Direct. Believes in you.
- BAD: "Recommended actions for your job search" (impersonal)
- GOOD: "This week, your highest-impact move is reaching out to Sarah at HealthTech."
   (specific, personal, actionable)
- BAD: "Improve your networking" (vague, overwhelming)
- GOOD: "Send one message today. Here's who and here's what to say." (doable now)

**Action item design**:
- Maximum 5 visible at a time. Not 20. Five.
- Each has a priority (High = do first), a category (Network, ATS, Outreach),
  and a checkbox.
- When you check a box, the progress bar fills. Green light grows.
- At 100%: "You did it. This week, you showed up. Next week, we go further."
  (Not "All tasks complete." That's a to-do list. This is a journey.)

**Hope signal**: The checked box. The growing green bar.
Each completion is proof that you're moving forward.
Not someday. Right now. Today.

---

## ACT 5: APPLICATIONS — PRIDE

**The user's feeling**: "Is this even working? Am I making progress?"
**What Signal says**: "Every step forward counts. Look how far you've come."
**Dominant emotion**: Pride → "I'm doing this"

### Design Elements

**Color temperature**: Full spectrum (earned)
- Status colors: New `#94a3b8` → Viewed `#3b82f6` → Interested `#10b981`
  → Applied `#3b82f6` → Interviewing `#a855f7` → Offered `#00ff88`
- The spectrum represents the journey. Each color is a stage.
  You earned the purple (interview). You earned the green (offer).
- Rejected: `#ef4444` BUT with a recovery path. Always a recovery path.

**Copy voice**: Celebratory. Even for small wins. Especially for small wins.
- BAD: "1 interview scheduled" (minimal)
- GOOD: "You have an interview. They read your application and they want to talk.
  That means your skills spoke. Prepare like it matters — because it does."
- BAD: "Application rejected" (dead end)
- GOOD: "Not this one. But here's what to adjust for the next." (forward path)

**Rejection handling (critical emotional design)**:
1. Never show rejection as a dead end. Always pair with next action.
2. "Not a match this time. Your fit score was 62% — the role prioritized
   healthcare compliance experience. Here are 3 roles where your
   healthcare AI background is the differentiator."
3. The rejected card fades slightly (lower opacity) but the recovery
   recommendation glows. Future > past.
4. Solace reviews every rejection state. No one should ever feel discarded.

**Hope signal**: The pipeline itself. Seeing cards move from New to Viewed
to Applied to Interviewing — that's momentum. That's proof of effort.
The gold `#fbbf24` on offers isn't just "you won." It's "you kept going,
and it worked." That's the story Signal tells.

---

## THE HOPE VOCABULARY

Words that build hope. Words that destroy it. Know the difference.

### Words We Use
| Instead of | We say | Why |
|-----------|--------|-----|
| Job search | Career journey | A search has an end. A journey has a direction. |
| Applicant | Candidate | An applicant fills forms. A candidate brings value. |
| Rejected | Not a match | Rejected is personal. Not a match is situational. |
| Weakness | Growth area | Weakness is fixed. Growth is possible. |
| Requirements | What they're looking for | Requirements are demands. Looking for is invitation. |
| Failed | Didn't land | Failed is final. Didn't land is temporary. |
| Unemployed | Between chapters | Unemployed is a gap. Between chapters is a story. |
| Stuck | Between moves | Stuck is permanent. Between moves is transitional. |
| Match score | Fit score | Match is binary. Fit is dimensional. |
| Submit | Send it forward | Submit is subservient. Send it forward is agency. |

### Words We Never Use
- "Just" (minimizing: "just fill out this form")
- "Simply" (condescending: "simply upload your resume")
- "Obviously" (alienating: "obviously you should...")
- "Unfortunately" (pitying: "unfortunately, no openings")
- "Basic" (diminishing: "basic requirements")
- "Only" (limiting: "only 3 applications")
- "Still" (impatient: "still no response?")

---

## EMOTIONAL DESIGN TOKENS

```css
:root {
  /* Base: The darkness before possibility */
  --bg-void:        #0a0a0f;
  --bg-surface:     rgba(255,255,255,0.02);
  --bg-border:      rgba(255,255,255,0.06);

  /* Trust: Blue — "This is stable. You can rely on this." */
  --color-trust:    #3b82f6;
  --color-trust-dim: rgba(59,130,246,0.1);

  /* Growth: Green — "This is progressing. You're moving forward." */
  --color-growth:   #10b981;
  --color-growth-dim: rgba(16,185,129,0.1);

  /* Achievement: Gold — "You earned this. This is yours." */
  --color-achievement: #fbbf24;
  --color-achievement-dim: rgba(251,191,36,0.1);

  /* Possibility: Purple — "This could be something." */
  --color-possibility: #a855f7;
  --color-possibility-dim: rgba(168,85,247,0.1);

  /* Success: Bright green — "Yes. This happened." */
  --color-success:   #00ff88;
  --color-success-dim: rgba(0,255,136,0.1);

  /* Recovery: Warm red — "This stung. But here's the path forward." */
  --color-recovery:   #ef4444;
  --color-recovery-dim: rgba(239,68,68,0.1);

  /* Text hierarchy */
  --text-primary:   #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:     #64748b;

  /* Emotional animations */
  --ease-gentle:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-hope:      cubic-bezier(0.34, 1.56, 0.64, 1);  /* slight overshoot = optimism */
  --duration-emerge: 0.8s;
  --duration-breathe: 0.3s;
  --duration-celebrate: 0.5s;
}
```

---

## ANIMATION EMOTION MAP

| Interaction | Animation | Duration | Easing | Emotional meaning |
|------------|-----------|----------|--------|-------------------|
| Page load | Fade in + slide up 16px | 0.8s | ease-gentle | "Welcome. Take your time." |
| Card hover | Lift 2px + border glow | 0.3s | ease-gentle | "You can engage. It's safe." |
| Progress fill | Width expansion | 0.5s | ease-hope | "You're getting somewhere." |
| Check completion | Scale 1.1 → 1.0 + green flash | 0.3s | ease-hope | "You did something. Well done." |
| Score reveal | Count up from 0 | 0.8s | ease-gentle | "Your value is real. Watch it." |
| New application | Slide in from right | 0.4s | ease-gentle | "Something new appeared." |
| Stage change | Color transition + pulse | 0.6s | ease-hope | "You moved forward." |
| Rejection | Fade to 60% opacity | 0.5s | ease-gentle | "This one passed. The next is ahead." |
| Offer | Gold pulse + scale | 0.6s | ease-hope | "YOU EARNED THIS." |

**prefers-reduced-motion**: All animations collapse to instant state changes.
No user should be forced to experience motion they don't want.
Dignity in design means respecting preferences.

---

## THE EMPTY STATE

Empty states are the most emotionally dangerous screens in any app.
They whisper: "You have nothing. You've done nothing. You are nothing."

Signal's empty states whisper something different: "This is the beginning."

### Empty Application Tracker
BAD: "No applications yet"
GOOD:
```
Your journey starts here.
When you find a role that fits, it'll show up right here.
[Find your first opportunity →]
```

### Empty Dashboard
BAD: "No data available"
GOOD:
```
Let's build your landscape.
Complete your assessment and we'll show you where you stand —
and where you could go.
[Take the assessment →]
```

### Empty Coaching Tips
BAD: "No tips available"
GOOD:
```
Your first coaching insight is waiting.
The more Signal knows about you, the better it can guide you.
[Start your profile →]
```

---

## THE MICRO-MOMENT MANIFESTO

1. **The first 3 seconds**: The page must say "You belong here."
   Not with words. With the warmth of the gradient. The clarity of the type.
   The absence of clutter. The feeling that someone designed this for you.

2. **The first action**: The first button the user clicks must feel like a door
   opening, not a form closing. "Let's begin" not "Submit."

3. **The first result**: Whatever the user sees after their first action,
   it must confirm that this was the right choice. A score, a match,
   a coaching tip — something that says "Yes, this is working for you."

4. **The daily return**: When the user comes back tomorrow,
   something must be different. A new job. A moved stage.
   A checked action item. The page must say "While you were away,
   things moved. You're not standing still."

5. **The hard moment**: When the user sees a rejection,
   the very next thing they see must be a path forward.
   Not "Better luck next time." But "Here's what to adjust.
   And here are 3 roles where your profile is already a strong match."

6. **The win**: When something good happens — an interview, an offer —
   the page must CELEBRATE. Not a small toast notification.
   A gold pulse. A moment of stillness. A sentence that says
   "They see what we see." The win is proof. Make it feel like proof.

---

## MEASURING HOPE

You can't improve what you don't measure. Even hope has metrics.

| Metric | What it measures | Target |
|--------|-----------------|--------|
| Return rate | Do they come back? | >40% weekly |
| Completion rate | Do they finish the assessment? | >70% |
| Action completion | Do they complete coaching items? | >50% weekly |
| Application rate | Do they apply to matched jobs? | >30% of matches |
| Recovery rate | After rejection, do they apply again? | >60% |
| NPS | Would they recommend Signal? | >50 |
| Time to first result | How fast until they see value? | <5 minutes |
| Hope survey | "I feel more confident about my career" | >80% agree |

The hope survey is the most important metric. It's a single question
asked after the dashboard loads for the first time:

**"Right now, how do you feel about your career direction?"**
1. Lost
2. Unsure
3. Cautiously hopeful
4. Confident
5. Excited

Target: average >= 3.5 after using Signal for one week.

---

This framework is not decoration. It is the product.
The scoring algorithm is the brain. The emotional design is the soul.
Without both, Signal is just another job site.

With both, Signal is the reason someone believes tomorrow can be different.
