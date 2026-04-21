# SIGNAL DESIGN.md — Whoop-Inspired Career Intelligence Platform

> This DESIGN.md defines SIGNAL's visual identity, interaction patterns, and emotional tone.
> Inspired by Whoop.com's premium fitness experience — translated to career intelligence.

## Brand Personality

- **Confident, not arrogant**: We know what we offer. No hedging.
- **Athletic energy**: Career fitness, not career therapy. You're training, not recovering.
- **Data-forward, human-centered**: Numbers tell the story, but the person writes the ending.
- **Premium minimalism**: Every pixel earns its place. No decoration for decoration's sake.

## Color System (OKLCH)

```
--bg-void:        oklch(0.08 0.01 270)     /* Deep space — the darkness before clarity */
--bg-surface:     oklch(0.12 0.01 270)     /* Elevated surface — cards, panels */
--bg-elevated:    oklch(0.16 0.015 270)    /* Highest surface — modals, overlays */

--color-trust:    oklch(0.65 0.2 250)      /* Electric blue — stability, data, progress */
--color-growth:   oklch(0.7 0.2 160)       /* Vivid green — momentum, achievement, money */
--color-achievement: oklch(0.75 0.18 85)   /* Warm gold — earned success, offers, wins */
--color-recovery: oklch(0.65 0.2 25)       /* Warm red — attention, rejection, urgency */
--color-possibility: oklch(0.6 0.22 300)   /* Deep purple — potential, insight, coaching */

--text-primary:   oklch(0.95 0.01 270)     /* Near-white — headings, key data */
--text-secondary: oklch(0.7 0.02 270)      /* Muted — descriptions, labels */
--text-muted:     oklch(0.5 0.02 270)      /* Dim — timestamps, metadata */
```

## Typography

### Font Stack
- **Display/Headings**: "Instrument Serif" or "Cormorant Garamond" — editorial authority
- **Body/Data**: "Instrument Sans" or "Inter" — clean readability
- **Monospace/Data**: "JetBrains Mono" — numbers, scores, salary ranges

### Type Scale (App UI — fixed rem, no fluid)
```
--text-xs:    0.75rem    /* Timestamps, metadata */
--text-sm:    0.875rem   /* Labels, badges */
--text-base:  1rem       /* Body text */
--text-lg:    1.125rem   /* Emphasized body */
--text-xl:    1.25rem    /* Section titles */
--text-2xl:   1.5rem     /* Card titles */
--text-3xl:   2rem       /* Page titles */
--text-4xl:   2.5rem     /* Hero numbers, fit score */
--text-5xl:   3.5rem     /* Dashboard hero metric */
```

## Layout & Spacing

### Grid
- 12-column grid, 24px gutters
- Content max-width: 1200px
- Sidebar: 280px (dashboard, coach)
- Cards: 8px border-radius (not 14px — tighter, more athletic)

### Spacing Scale
```
--space-1:  4px     /* Inline gaps */
--space-2:  8px     /* Tight component spacing */
--space-3:  12px    /* Standard element gap */
--space-4:  16px    /* Section inner padding */
--space-5:  24px    /* Card padding, gutter */
--space-6:  32px    /* Section gaps */
--space-8:  48px    /* Page section spacing */
--space-10: 64px    /* Major section breaks */
```

## Motion Design (Whoop-Inspired)

### Philosophy
Motion in SIGNAL serves three purposes:
1. **Feedback**: Every interaction produces immediate visual response
2. **Guidance**: Motion directs attention to what matters next
3. **Celebration**: Achievements (offers, score improvements) get cinematic treatment

### Easing Curves
```
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1)    /* Primary — deceleration */
--ease-in-out:    cubic-bezier(0.45, 0, 0.55, 1)    /* Smooth transitions */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1) /* Playful pops */
```

### Duration Scale
- Micro-interactions (hover, focus): 150ms
- Component transitions (expand, slide): 250ms
- Page transitions (route change): 400ms
- Celebrations (score reveal, offer): 800ms
- Onboarding reveals: 1200ms

### Specific Animations
- **Fit Score Reveal**: Counter animates from 0 → score. Ring fills. Color shifts from gray → trust/growth.
- **Status Change**: Card slides, status bar color cross-fades, badge animates in.
- **New Match**: Card enters from bottom with spring ease. Subtle glow pulse on fit score.
- **Achievement Unlocked**: Full-screen overlay with particle burst. Gold accent.
- **Data Loading**: Skeleton shimmer (not spinner). Whoop's wave pattern.

## Components

### Cards
- Background: var(--bg-surface)
- Border: 1px solid oklch(0.2 0.01 270)
- Border-radius: 8px (not 14px — tighter)
- Hover: translateY(-2px), shadow increases
- Active states: Left border 3px in status color

### Buttons
- **Primary**: Solid fill, var(--color-trust), white text
- **Secondary**: Ghost — transparent bg, var(--color-trust) border
- **Danger**: var(--color-recovery) — destructive actions only
- **CTA**: Larger, animated gradient border (trust → growth)

### Data Visualization
- **Fit Score**: Circular progress ring (like Whoop's recovery score)
- **Pipeline**: Horizontal progress bar with status segments
- **Salary Range**: Range slider with live markers
- **Trends**: Sparkline micro-charts (7-day, 30-day)
- **Match Cards**: Compact, data-dense. Score prominent.

### Form Elements (Assessment)
- **Input fields**: Glass background, focus ring animation
- **Sliders**: Custom track with gradient fill. Thumb with scale animation on drag.
- **Radio/Pill groups**: Selected state uses status color fill
- **Skill tags**: Rounded, removable, with micro-animation on add/remove

## Page Architecture

### Landing Page (Whoop.com inspiration)
- Full-bleed hero with animated data visualization background
- Scroll-triggered sections with parallax depth
- Real user data visualizations (not illustrations)
- Video testimonials with progress data overlays
- Pricing section with clear tiers and value props

### Assessment (Motivational Interviewing Flow)
- One question at a time (not 5-step form — that's the old way)
- Each question has a purpose: opening, exploring, affirming, summarizing
- Progress shown as a journey, not a stepper
- Affirmation moments after each section ("You're building something powerful")
- Summary with reflection: "Here's what I heard. Is this right?"

### Dashboard (Whoop Strap Data Page)
- Hero metric: Fit Score (circular ring, animated)
- Pipeline visualization: horizontal bar with status segments
- Top match: prominent card with "Why this fits you" insight
- Weekly focus: single actionable recommendation
- Activity feed: real-time matching events
- Market data: salary intelligence, demand trends

### Coach (Whoop Coach/Strain Breakdown)
- Archetype visualization with trait radar
- This week's focus: ONE thing, deeply explained
- Action items with difficulty + time estimates
- Career journey timeline (past → present → 3 futures)
- Motivational moments: "You're closer than you think"

### Tracker (Whoop Activity Log)
- List view with compact cards
- Status filters with counts
- Stale application recovery prompts
- Offer celebration with confetti/particles
- Follow-up suggestions with one-click actions

## Interaction Patterns (Behavioral Science)

### Motivational Interviewing (MI) in UI
- **Open questions** instead of form fields: "What matters most to you?" not "Select priority"
- **Affirmations** after each step: "Your experience in healthcare AI is rare. That's your edge."
- **Reflections** in review: "You're looking for remote roles at $200K+ where your AI strategy skills drive decisions."
- **Summaries** before submit: "Here's what I understand about you. What did I miss?"

### Moments of Truth
1. First assessment completion → immediate value (fit score + first match)
2. First match reveal → "This role values exactly what you bring"
3. First status change → "Your application moved. Here's what to do next."
4. First offer → Celebration + negotiation coaching
5. Salary insight → "You're worth $40K more than you thought"

### Nudge Architecture
- Default salary range based on title + location (not blank)
- Pre-filled skills from job title (editable)
- Social proof: "73% of AI Directors include this skill"
- Commitment device: "I'll apply to 3 roles this week" → tracked
- Loss aversion: "You haven't applied in 5 days. Roles are closing."

## Anti-Patterns (What NOT to Do)

- ❌ Generic AI slop: Inter font, purple gradients, cards-in-cards
- ❌ Empty states with just an icon and "Nothing here yet"
- ❌ Spinners — use skeleton shimmers
- ❌ Long forms — use one-question-at-a-time
- ❌ Fake data — every number must be real or clearly labeled as estimate
- ❌ Generic advice — "Update your LinkedIn" is useless
- ❌ Celebration without substance — confetti for its own sake
- ❌ Dark patterns — never hide pricing, never trap users
- ❌ Tooltip overuse — make things self-evident
- ❌ Stock photos — only real data visualizations or illustrations

## Responsive Breakpoints

```
--bp-mobile:   640px    /* Single column, stacked cards */
--bp-tablet:   768px    /* Two-column grid, sidebar collapses */
--bp-desktop:  1024px   /* Full layout with sidebar */
--bp-wide:     1280px   /* Max content width, centered */
```

Mobile-first. Touch targets minimum 44px. Bottom navigation on mobile.

## Accessibility

- All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- Focus states visible and styled (not browser default)
- Reduced motion respected (prefers-reduced-motion)
- Screen reader labels on all interactive elements
- Keyboard navigation for every interactive flow
