-- Signal by RIG — Supabase Schema
-- Deploy to: Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  linkedin_url TEXT,
  is_oracle BOOLEAN DEFAULT FALSE,
  oracle_verified BOOLEAN DEFAULT FALSE,
  oracle_email TEXT,
  phone TEXT,
  title TEXT,
  company TEXT,
  experience_years INTEGER,
  target_salary_min INTEGER,
  target_salary_max INTEGER,
  location_preference TEXT CHECK (location_preference IN ('remote', 'hybrid', 'onsite', 'any')),
  skills TEXT[],
  industry_preferences TEXT[],
  persona TEXT CHECK (persona IN ('Creative', 'Technical', 'Sales', 'Management', 'Startup/Fixer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ASSESSMENTS
-- ============================================
CREATE TABLE assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  clarity_score INTEGER NOT NULL CHECK (clarity_score >= 0 AND clarity_score <= 100),
  resume_score INTEGER NOT NULL CHECK (resume_score >= 0 AND resume_score <= 100),
  linkedin_score INTEGER NOT NULL CHECK (linkedin_score >= 0 AND linkedin_score <= 100),
  interview_score INTEGER NOT NULL CHECK (interview_score >= 0 AND interview_score <= 100),
  positioning_score INTEGER NOT NULL CHECK (positioning_score >= 0 AND positioning_score <= 100),
  answers JSONB NOT NULL,
  biggest_challenge TEXT,
  recommended_tier TEXT NOT NULL CHECK (recommended_tier IN ('Pulse', 'Map', 'Launch', 'Command', 'Executive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('Pulse', 'Map', 'Launch', 'Command', 'Executive')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_checkout_session_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RESUME SCORES
-- ============================================
CREATE TABLE resume_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
  impact_score INTEGER CHECK (impact_score >= 0 AND impact_score <= 100),
  keyword_score INTEGER CHECK (keyword_score >= 0 AND keyword_score <= 100),
  suggestions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JOBS (pipeline tracking)
-- ============================================
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  url TEXT,
  description TEXT,
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'applied', 'interviewing', 'offer', 'rejected', 'withdrawn')),
  fit_score INTEGER CHECK (fit_score >= 0 AND fit_score <= 100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COACHING TIPS
-- ============================================
CREATE TABLE coaching_tips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  persona TEXT NOT NULL,
  stage TEXT NOT NULL,
  tip TEXT NOT NULL,
  action_items JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANALYTICS EVENTS
-- ============================================
CREATE TABLE analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  session_id TEXT,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_oracle ON users(is_oracle, oracle_verified);
CREATE INDEX idx_assessments_user ON assessments(user_id);
CREATE INDEX idx_assessments_created ON assessments(created_at DESC);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_customer_id);
CREATE INDEX idx_jobs_user ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Assessments: users can create and read their own
CREATE POLICY "Users can create assessments" ON assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own assessments" ON assessments FOR SELECT USING (auth.uid() = user_id);

-- Jobs: users can CRUD their own
CREATE POLICY "Users can manage own jobs" ON jobs FOR ALL USING (auth.uid() = user_id);

-- Subscriptions: users can view their own
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Analytics: anyone can insert (for tracking)
CREATE POLICY "Anyone can insert analytics" ON analytics_events FOR INSERT WITH CHECK (true);

-- Coaching tips: anyone can read
CREATE POLICY "Anyone can read coaching tips" ON coaching_tips FOR SELECT USING (true);