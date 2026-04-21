# Levels.fyi — Design & Feature Analysis
## For SIGNAL Career Intelligence Platform Redesign

---

## 1. OVERVIEW

Levels.fyi is the definitive compensation intelligence platform for tech professionals. It provides transparent, crowdsourced salary data, company leveling standardization, and career progression insights. The platform is the go-to resource for tech workers negotiating offers or planning career moves.

**URL:** https://levels.fyi  
**Core Business:** Salary data + leveling standardization + career intelligence  
**Target User:** Tech professionals, engineers, managers seeking market transparency  
**Key Stats:** 1M+ data points, hundreds of companies, mapping partners (Radford, Mercer)  

---

## 2. CORE FEATURES

### Compensation Data:

**Real-Time Salary Search:**
- Explore pay by title, company, and location
- Filters: Experience level, geographic region, company stage
- Sort by: Total compensation, base, stock, bonus
- Real-time updates from recent contributions

**Total Compensation Breakdown:**
- Base salary (fixed annual)
- Stock (RSU) with vesting schedules
- Bonus (annual performance)
- Total compensation = sum of all

**Crowdsourced Data:**
- User-contributed verified salaries
- Self-reported with verification
- Large sample reduces outliers
- Real-time updates from recent offers

### Leveling Standardization:

**Global Level Mapping:**
- Standard scale across companies
- Cross-company comparison
- "L5 at Amazon = L6 at Google" equivalence
- Career portability mapping

**Internal Level Display:**
- Company-specific level systems
- L4-L10 (Amazon)
- IC1-IC6 (Google)  
- E3-E8 (Meta)
- SWE I-IV (Standardized)

**Mapping Partners:**
- Radford Mapping (industry standard)
- Mercer Mapping (global HR standards)
- Proprietary Levels.fyi Standard

---

## 3. SALARY DATA EXAMPLES

### Sample Data Points (Recent):

| Company | Role | Experience | Total Comp | Base | Stock | Bonus | Location |
|:--------|:-----|:-----------|:-----------|:-----|:------|:------|:---------|  
| Block | Sr. Staff SWE | 9 yrs | $660,000 | $310k | $350k | $0 | San Francisco |
| Google | Software Engineer | 11 yrs | $440,000 | $204k | $200k | $36k | Denver, CO |
| JPMorgan | Software Engineer | 9 yrs | $233,000 | $185k | $0 | $48k | New York, NY |
| Microsoft | Software Engineer | 7 yrs | $223,000 | $171k | $30k | $22k | Mountain View |
| Capital One | Software Engineer | N/A | $148,000 | $148k | $0 | $0 | New York, NY |

### Leveling Examples:

**Twitter Level Ladder:**
SWE → SWE II → Senior → Staff → Sr. Staff → Principal → Distinguished

**Amazon Level Ladder:**
L4 (SDE I) → L5 (SDE II) → L6 (SDE III) → L7 (Principal) → L8 (Sr. Principal) → L10 (Distinguished)

**VMware Level Ladder:**
P1 (MTS 1) → P2 → P3 → P4 (Sr. MTS) → Staff 1 → Staff 2 → Sr. Staff → Principal → Fellow

---

## 4. INDUSTRIES & JOB FAMILIES

### Top Industries Covered:
- **Tech** (Primary focus, most data)
- Healthcare
- Finance
- Biotechnology
- Pharmaceutical
- Retail
- Manufacturing
- Management Consulting
- Medical Devices

### Job Families Tracked:
- Software Engineer
- Engineering Manager
- Hardware Engineer
- Product Designer
- Product Manager
- Data Scientist
- Sales

---

## 5. SERVICES & TOOLS

### For Professionals:

**Salary Search:**
- Explore compensation by any combination
- Real-time data access
- Filter and sort capabilities
- Export/share functionality

**Negotiation Services:**
- Professional offer negotiation help
- Market-based counter proposals
- Total compensation optimization
- Signing bonus negotiation

**Add Salary:**
- Crowdsourcing contribution
- Verify your own offer
- Help others by sharing
- Data quality improvement

**Offer Comparison:**
- Compare offers against market
- Multiple offer analysis
- Negotiation leverage points

### For Employers:

**Compensation Benchmarking:**
- Competitive pay analysis
- Level-based comparisons
- Market positioning reports
- Adjust for geography/stage

**Talent Pool:**
- Source and hire senior tech talent
- Pre-vetted professionals
- Direct outreach capability
- Level-matched candidates

**Interactive Offers:**
- Create dynamic offer letters
- Total compensation visualization
- Equity breakdown builder
- Benefits comparison

---

## 6. DESIGN PATTERNS

### Visual Approach:

**Data-Table Heavy:**
- Compensation in clean tabular formats
- Sortable columns
- Consistent row formatting
- Export capabilities

**Company Cards:**
- Individual company pages
- Level structure breakdowns
- Salary ranges by level
- Benefits summary

**Filters & Facets:**
- Search by title, company, location, experience
- Multi-select filters
- Real-time refinement
- Saved searches

**Visual Comparisons:**
- Graphical compensation charts
- Total comp visualization
- Stock vesting timelines
- Bonus comparisons

### Layout Structure:
```
- Header: Logo, Search, Tools, Login
- Homepage: Salary Search hero, Featured companies
- Company Pages: Levels, Salaries, Benefits
- Job Title Pages: Market rates by company/location
- Tools: Negotiation, Add Salary, Compare
```

### Color & Typography:
- **Neutral Palette:** Professional, data-centric
- **Primary Blue:** Trust, clarity
- **Gray Scale:** Text, backgrounds
- **Highlight:** Green (positive), Red (below market)
- **Large Numbers:** Compensation amounts prominent
- **Clean Sans-Serif:** Readable data presentation

---

## 7. SOCIAL PROOF & TRUST

### Market Position:
- Go-to resource for tech compensation
- 1M+ data points referenced
- Used by thousands in negotiations
- Employer partnerships

### Data Credibility:
- Crowdsourced from verified professionals
- Large sample reduces manipulation
- Real-time updates reflect current market
- Mapping partners add legitimacy

### User Behavior:
- Used in offer negotiations
- Referenced by recruiters
- Cited in salary discussions
- Standard resource in tech career planning

---

## 8. PRICING & BUSINESS MODEL

### Core Access (Free):
- Salary search and comparison
- Leveling standardization
- Company data exploration
- Real-time compensation lookup

### Value-Add Services (Paid):
- Negotiation Services: Professional support
- Employer Tools: Recruitment and benchmarking
- Talent Pool: Sourcing platform access

### Revenue Model:
- B2C: Free core, paid negotiation services
- B2B: Employer subscription for benchmarking
- B2B: Recruitment marketplace

---

## 9. GAPS FOR SIGNAL TO EXPLOIT

1. **Career Path Beyond Salary:**
   - Shows compensation but not skill development
   - No learning recommendations
   - **SIGNAL OPPORTUNITY:** Skill gap analysis, learning paths

2. **Interview Preparation:**
   - Transparent on pay, opaque on process
   - No company interview insights
   - **SIGNAL OPPORTUNITY:** Interview prep, hiring manager data

3. **Job Search Management:**
   - Data platform, not search tool
   - No application tracking
   - **SIGNAL OPPORTUNITY:** Interview pipeline, status tracking

4. **Company Culture Data:**
   - No culture/values insights
   - Just compensation
   - **SIGNAL OPPORTUNITY:** Culture fit matching

5. **Real-Time Market Movement:**
   - Static data, not trend tracking
   - No skill demand shifts
   - **SIGNAL OPPORTUNITY:** Market shift alerts

6. **Network Effects:**
   - Isolated lookups, no networking
   - Pure data consumption
   - **SIGNAL OPPORTUNITY:** Warm introductions

7. **Non-Tech Industries:**
   - Heavy tech focus limits scope
   - Finance, healthcare underserved
   - **SIGNAL OPPORTUNITY:** Multi-industry expansion

8. **Holistic Career Platform:**
   - Salary endpoint without broader journey
   - Single use case
   - **SIGNAL OPPORTUNITY:** Full career lifecycle

---

## 10. DESIGN PATTERNS TO REPLICATE

1. **Total Compensation Breakdown:**
   - Base + Stock + Bonus structure
   - Shows true compensation picture
   - Vesting timeline visualization

2. **Level Hierarchy Visualization:**
   - Career ladder as navigable structure
   - Current level → next level planning
   - Cross-company level mapping

3. **Cross-Company Level Mapping:**
   - Standardized level equivalence
   - "L5 at Amazon = L6 at Google" understanding
   - Experience portability

4. **Crowdsourced Data Model:**
   - User contribution improves quality
   - Network effect drives accuracy
   - Community-based growth

5. **Real-Time Search:**
   - Instant data lookup
   - Filters for context
   - Sort and comparison

6. **Comparison Tools:**
   - Side-by-side analysis
   - Offer against market comparison
   - Multiple companies/locations

7. **Employer vs. Employee Duality:**
   - Both sides benefit from transparency
   - Balanced marketplace
   - Double-sided network

8. **Negotiation as Premium Service:**
   - High-stakes use case as paid offering
   - Value-based pricing
   - Clear ROI demonstration

9. **Data Export/Share:**
   - Download salary data
   - Share specific comparisons
   - External citation capability

10. **Geographic Adjustment:**
    - Cost of living integration
    - Location-based normalization
    - "Adjusted for SF vs. remote"

---

## 11. KEY TAKEAWAYS FOR SIGNAL

1. **Compensation Transparency:** "Get paid, not played" drives engagement
2. **Level Ladders:** Visual career progression aids planning
3. **Total Comp Breakdown:** Base/stock/bonus shows true value
4. **Cross-Company Mapping:** Standardized levels aid mobility
5. **Crowdsourcing:** User data improves platform quality
6. **Negotiation Service:** High-stakes tool as premium tier
7. **Employer Tools:** B2B as meaningful revenue stream
8. **Data as Moat:** Large dataset is hard to replicate

---

## 12. SALARY OFFER COMPONENTS

### Base Salary:
- Fixed annual cash
- Most visible component
- Used for comparisons
- Typically largest portion

### Stock (RSU):
- Restricted Stock Units
- Vesting schedules (4 years typical)
- Grants and refreshers
- Public vs private company

### Bonus:
- Annual performance bonuses
- Signing bonuses
- Retention bonuses
- Commission (sales)

### Total Compensation:
- Sum of all components
- Year 1 vs. Year 4+ calculation
- Important for negotiation
- Company loyalty builder

---

**Analysis Date:** April 2026  
**Source:** levels.fyi (primary data confirmed)  
**Focus:** Data architecture, leveling standardization, compensation transparency model
