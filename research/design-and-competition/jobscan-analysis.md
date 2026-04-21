# Jobscan.co — Design & Feature Analysis
## For SIGNAL Career Intelligence Platform Redesign

---

## 1. OVERVIEW

Jobscan is an ATS-focused optimization platform that helps job seekers pass through Applicant Tracking Systems and land more interviews. It takes a technical, data-driven approach to resume optimization by reverse-engineering how major ATS platforms parse documents.

**URL:** https://jobscan.co  
**Core Business:** ATS resume optimization + job search tools  
**Target User:** Job seekers frustrated by resume black holes, career changers, tech industry applicants  
**Key Stat:** 1,000,000+ users, companies: Amazon, Google, Apple, Microsoft, NASA, Netflix

---

## 2. CORE FEATURES

### Primary Tools:

**Match Report:**
- Analyzes resume against specific job description
- Calculates "Match Rate" percentage (0-100%)
- Identifies missing keywords and skills
- Prioritizes optimization recommendations
- Hard skills > Education > Job Title > Soft Skills > Other

**One-Click Optimize:**
- Real-time suggestions for improvement
- Keyword insertion recommendations
- Format compliance checks
- Immediate actionable feedback

**ATS Resume Builder:**
- Creates bot-friendly resumes
- Tested against major ATS platforms
- Format recommendations for parsing compatibility
- Template library for ATS-friendly layouts

**LinkedIn Optimization:**
- Profile visibility enhancement
- Keyword optimization for recruiter search
- Headline and summary improvements
- Recruiter findability scoring

**Job Tracker & Matcher:**
- Application organization
- Job matching based on skill profile
- Status tracking through hiring process
- Job board access

**Cover Letter Scanner:**
- Tailors cover letters to job requirements
- Keyword matching analysis
- Format optimization

**Chrome Extension:**
- Scan resumes directly from job boards
- Quick access to optimization tools
- Mobile-friendly access

**Post-Interview Thank You Notes:**
- Template generation
- Follow-up optimization

---

## 3. ATS MATCHING METHODOLOGY

### Priority Scoring System:

1. **Hard Skills** (Highest priority)
   - Technical competencies
   - Specific tools/platforms
   - Certifications
   - Programming languages

2. **Education Level** (If required)
   - Degree requirements
   - Field of study
   - Academic institutions

3. **Job Title**
   - Exact title matches
   - Similar title recognition
   - Seniority level alignment

4. **Soft Skills**
   - Communication
   - Leadership
   - Teamwork
   - Problem-solving

5. **Other Keywords**
   - Industry terminology
   - Company culture keywords
   - General requirements

### Target Score: 75%
- **Below 65%:** Significant improvement needed
- **65-75%:** Good optimization level
- **Above 75%:** Risk of "keyword stuffing" (looks unnatural to humans)
- **100%:** Avoid — suggests over-optimization, hurts with recruiters

### File Format Recommendations:
- **.docx preferred** unless PDF specifically requested
- Some ATS parse .docx more accurately
- Avoid: Tables, columns, graphics, headers, footers
- Use: Both acronym and long-form keywords
- Recommended: Standard section headings
- Traditional fonts preferred

### ATS Systems Tested Against:
- **iCIMS** (widely used enterprise ATS)
- **Lever** (popular for tech companies)
- **Greenhouse** (tech and startup focus)
- **Taleo** (Oracle-owned, enterprise standard)
- **Workday** (large enterprise)

---

## 4. PRICING TIERS

### Plan Structure:

| Plan | Price | Billing | Key Features |
|:-----|:------|:--------|:-------------|
| **Free** | $0 | Forever | 5 resume scans/month, 5 AI optimizations, basic keyword finds |
| **Quarterly** | $29.98/mo | $89.95/3 months | Unlimited scans, AI optimizations, synonym detector, cover letter generator |
| **Monthly** | $49.95/mo | $49.95/month | Same as quarterly, billed monthly (40% premium) |

### Feature Comparison:

| Feature | Free | Quarterly | Monthly |
|:--------|:-----|:---------|:--------|
| Resume Scans | 5/month | Unlimited | Unlimited |
| AI Optimizations | 5/month | Unlimited | Unlimited |
| Keyword Tools | 5 findings | Unlimited + Synonyms | Unlimited + Synonyms |
| AI Generators | No | Cover Letter + Bullets | Cover Letter + Bullets |
| LinkedIn Optimizer | No | Included | Included |
| Job Tracker | Yes | Yes | Yes |
| Chrome Extension | Yes | Yes | Yes |
| Post-Interview Tools | Yes | Yes | Yes |

### Premium Features (Paid Tiers):
- **AI Job Match:** Matches profile to relevant openings
- **ATS Revealed eBook:** Deep dive into ATS mechanics
- **Premium resume templates:** ATS-friendly designs
- **Cover letter templates:** Role-specific options
- **Advanced AI:** One-click optimizations, bullet point generators

---

## 5. DESIGN PATTERNS

### Visual Approach:
- **Color Scheme:** Professional blues and greens
- **Primary Blue:** Trust, professionalism, data
- **Secondary Green:** Success, optimization achieved
- **Alert Red:** Issues found, urgent attention
- **Clean interfaces:** Focus on data and scores

### Score-Centric Design:
- Match Rate prominently displayed as large percentage
- Color-coded score bands:
  - **Green (75-100%):** Target zone
  - **Yellow (50-74%):** Needs work
  - **Red (0-49%):** Critical issues
- Immediate visual parsing of optimization level

### Layout Philosophy:
- **Dashboard:** Overview of all tools
- **Scan-first workflow:** Primary action starts with resume scan
- **Progressive disclosure:** Basic score first, details on expansion
- **Clear CTAs:** "Scan Resume" as primary action
- **Tab navigation:** Tools organized by function

### Key Screen Sections:
```
- Header: Jobscan logo, navigation, account
- Hero: "Scan your resume" CTA with upload
- Dashboard tabs: Scan, Build, Track, LinkedIn, Learning
- Results area: Match score + keyword breakdown
- Recommendations: Actionable improvements
```

### Data Visualization:
- **Match Rate:** Large circular or linear gauge
- **Keyword Breakdown:** Section-by-section bars
- **Missing Keywords:** List with priority indicators
- **Section Scores:** Individual component ratings

---

## 6. SOCIAL PROOF & RESULTS

### User Statistics:
- **1,000,000+ job seekers** have used the platform
- Companies where users got hired: Amazon, Google, Apple, Microsoft, NASA, Netflix
- Recommended by career coaches and resume writers

### Success Stories (Specific):

**Veteran Story:**
- Before: 0% response rate from applications
- After: 62% response rate with Jobscan
- Transformation: Full career transition

**Career Changer Examples:**
- Teachers moving to corporate roles
- Long-tenure professionals (20+ years) re-entering market
- Career pivots successfully executed

### Proven Results Claims:
- **50% increase** in interview chances
- **3x more interviews** when optimized
- Specific ATS testing (Taleo, iCIMS, Greenhouse)

---

## 7. "OVER-OPTIMIZATION" WARNING

### Why 100% is Bad:
- Looks unnatural to human recruiters
- Keyword stuffing detected by hiring managers
- ATS may flag as manipulation
- Less believable to review teams

### The 75% Target Philosophy:
Jobscan educates users that:
- 75% is the "sweet spot" for ATS + human reading
- Below 65% means missing critical keywords
- 65-75% balances optimization and authenticity
- Above 75% risks looking spammy

### This Trust-Building Approach:
- Positions Jobscan as advisor, not just tool
- Prevents user disappointment from over-optimization
- Builds credibility through transparency
- Sets realistic expectations

---

## 8. GAPS FOR SIGNAL TO EXPLOIT

1. **No Career Path Intelligence:**
   - Jobscan optimizes for single applications
   - Doesn't address long-term career trajectory
   - **SIGNAL OPPORTUNITY:** Career planning, skill roadmaps

2. **No Salary Benchmarking:**
   - Knows if you'll pass ATS, not if offer is fair
   - No compensation data or negotiation support
   - **SIGNAL OPPORTUNITY:** Salary data integration, offer comparison

3. **No Interview Preparation:**
   - Only gets you past the resume screen
   - No interview coaching or company research
   - **SIGNAL OPPORTUNITY:** Interview prep, company insights

4. **No Professional Branding:**
   - Resume optimization only, no broader persona
   - No LinkedIn optimization or portfolio
   - **SIGNAL OPPORTUNITY:** Full brand management

5. **No Networking Tools:**
   - Pure application focus, no relationship building
   - No warm outreach facilitation
   - **SIGNAL OPPORTUNITY:** Connection building, warm outreach

6. **No Team/Coaching Features:**
   - Individual contributor only
   - No enterprise or university partnerships
   - **SIGNAL OPPORTUNITY:** B2B channels, coaching marketplace

7. **No Real-Time Market Intelligence:**
   - Static resume analysis, not labor market trends
   - No skill demand tracking
   - **SIGNAL OPPORTUNITY:** Live market analytics

8. **No Offer Negotiation:**
   - Gets you the interview, not the best offer
   - No benefits analysis
   - **SIGNAL OPPORTUNITY:** Complete offer support

---

## 9. DESIGN PATTERNS TO REPLICATE

1. **Match Score Visualization:**
   - Large, prominent percentage with color bands
   - Immediate understanding of optimization level
   - Circle or linear gauge format

2. **Priority-Ordered Recommendations:**
   - Not just "improve X" but "prioritize Y first"
   - Actionable hierarchy
   - Hard skills > Soft skills ordering

3. **ATS Reverse-Engineering Credibility:**
   - Technical deep-dive into parsing logic
   - "We tested against iCIMS, Lever, Greenhouse, Taleo"
   - Trust-building through transparency

4. **Keyword + Acronym Pairing:**
   - "Search Engine Optimization (SEO)" approach
   - Shows understanding of both human and bot readers
   - Maximizes keyword matching breadth

5. **"Target Score" Framing:**
   - 75% as ideal, not 100%
   - Educates users, builds trust
   - Prevents over-optimization

6. **Success Ratio Display:**
   - "3x more interviews" is powerful claim
   - Before/after framing
   - Specific numbers over vague promises

7. **Chrome Extension Integration:**
   - Data capture from external job boards
   - Low-friction feature integration
   - Mobile-friendly access

8. **Quarterly Billing with Savings:**
   - 40% savings display creates urgency
   - Annual-feel without annual commitment
   - Makes quarterly the default choice

9. **Company Logo Badges:**
   - "Users hired at Amazon, Google, Apple"
   - Logos as trust signals
   - FOMO from prestigious names

---

## 10. COMPETITIVE POSITIONING

### Strengths:
- **Most technically rigorous ATS tool** in market
- **Specific ATS system testing:** Taleo, iCIMS, Greenhouse, Lever
- **Clear match rate metrics:** 0-100% with targets
- **Strong success story testimonials:** Before/after data
- **Established brand:** 1M+ users, recognized in space

### Weaknesses for SIGNAL:
- **No broader career intelligence:** Single-purpose focus
- **Pure job-search focus:** No career planning
- **Mediocre design:** Functional, not beautiful
- **No salary or offer support:** Incomplete lifecycle
- **Not a platform:** Just a tool

### Differentiation from ApplyArc:
- ApplyArc: 18 AI tools, £19/mo, Kanban tracker
- Jobscan: ATS focus, $49.95/mo, single-purpose
- SIGNAL: Could combine ATS + broader career intelligence

---

## 11. KEY TAKEAWAYS FOR SIGNAL

1. **Match Score Pattern:** Core metric prominently displayed with clear target
2. **Reverse-Engineering Credibility:** Technical transparency builds trust
3. **Success Frameworks:** "Target 75%, not 100%" educates users
4. **Quarterly Billing:** 40% savings creates conversion incentive
5. **Chrome Extension:** Capture data seamlessly from job boards
6. **Keyword Priority Hierarchy:** Hard skills > Soft skills > Other
7. **Before/After Success Stories:** Concrete numbers (0% → 62%)
8. **ATS Partnership Network:** iCIMS, Lever, Greenhouse badges add credibility
9. **Over-Optimization Warning:** Builds trust with realistic guidance
10. **Company Logo Social Proof:** "Hired by Amazon, Google, Apple"

---

## 12. PRODUCT SPECIFICATIONS

### Match Rate Calculation:
```
Match Rate = (Hard Skills Match × 0.40) + 
             (Education Match × 0.15) + 
             (Job Title Match × 0.25) + 
             (Soft Skills Match × 0.10) + 
             (Other Keywords × 0.10)
```

### Keyword Extraction Process:
1. Parse job description text
2. Identify noun phrases and skills
3. Compare against resume content
4. Calculate match percentage per category
5. Generate prioritized recommendations

### ATS Format Support:
- Input formats: PDF, DOC, DOCX
- Output formats: DOCX (recommended), PDF (conditional)
- Parsing engine maintains formatting

---

**Analysis Date:** April 2026  
**Source:** jobscan.co, jobscan.co/pricing  
**Comparison context:** applyarc.com, tealhq.com, market competitors