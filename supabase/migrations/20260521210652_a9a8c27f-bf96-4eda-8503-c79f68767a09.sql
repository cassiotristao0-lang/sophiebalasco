
-- =========================
-- PROFILES (responsáveis)
-- =========================
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  username text UNIQUE,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Trigger: criar profile automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'name',
    NEW.raw_user_meta_data ->> 'username'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================
-- CHILD PROFILES
-- =========================
CREATE TABLE public.child_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name text NOT NULL,
  age integer,
  avatar_data jsonb DEFAULT '{}'::jsonb,
  current_world integer NOT NULL DEFAULT 1,
  current_level integer NOT NULL DEFAULT 1,
  total_points integer NOT NULL DEFAULT 0,
  total_coins integer NOT NULL DEFAULT 0,
  total_stars integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_child_profiles_parent ON public.child_profiles(parent_user_id);

ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own children"
  ON public.child_profiles FOR SELECT TO authenticated
  USING (auth.uid() = parent_user_id);

CREATE POLICY "Parents create own children"
  ON public.child_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = parent_user_id);

CREATE POLICY "Parents update own children"
  ON public.child_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = parent_user_id);

CREATE POLICY "Parents delete own children"
  ON public.child_profiles FOR DELETE TO authenticated
  USING (auth.uid() = parent_user_id);

-- Helper: verifica se a criança pertence ao usuário atual (evita recursão em RLS)
CREATE OR REPLACE FUNCTION public.owns_child(_child_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.child_profiles
    WHERE id = _child_id AND parent_user_id = auth.uid()
  );
$$;

-- =========================
-- PROGRESS
-- =========================
CREATE TABLE public.progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_profile_id uuid NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  world_id integer NOT NULL,
  level_id integer NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  stars integer NOT NULL DEFAULT 0,
  score integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  wrong_answers integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  UNIQUE(child_profile_id, world_id, level_id)
);

CREATE INDEX idx_progress_child ON public.progress(child_profile_id);

ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own children progress"
  ON public.progress FOR SELECT TO authenticated
  USING (public.owns_child(child_profile_id));

CREATE POLICY "Parents insert own children progress"
  ON public.progress FOR INSERT TO authenticated
  WITH CHECK (public.owns_child(child_profile_id));

CREATE POLICY "Parents update own children progress"
  ON public.progress FOR UPDATE TO authenticated
  USING (public.owns_child(child_profile_id));

CREATE POLICY "Parents delete own children progress"
  ON public.progress FOR DELETE TO authenticated
  USING (public.owns_child(child_profile_id));

-- =========================
-- REWARDS
-- =========================
CREATE TABLE public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_profile_id uuid NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  reward_type text NOT NULL,
  reward_name text NOT NULL,
  unlocked_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_rewards_child ON public.rewards(child_profile_id);

ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own children rewards"
  ON public.rewards FOR SELECT TO authenticated
  USING (public.owns_child(child_profile_id));

CREATE POLICY "Parents insert own children rewards"
  ON public.rewards FOR INSERT TO authenticated
  WITH CHECK (public.owns_child(child_profile_id));

CREATE POLICY "Parents delete own children rewards"
  ON public.rewards FOR DELETE TO authenticated
  USING (public.owns_child(child_profile_id));

-- =========================
-- AUDIO PREFERENCES
-- =========================
CREATE TABLE public.audio_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_profile_id uuid NOT NULL UNIQUE REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  music_enabled boolean NOT NULL DEFAULT true,
  music_volume numeric NOT NULL DEFAULT 0.3,
  sfx_enabled boolean NOT NULL DEFAULT true,
  sfx_volume numeric NOT NULL DEFAULT 0.5
);

ALTER TABLE public.audio_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own children audio prefs"
  ON public.audio_preferences FOR SELECT TO authenticated
  USING (public.owns_child(child_profile_id));

CREATE POLICY "Parents insert own children audio prefs"
  ON public.audio_preferences FOR INSERT TO authenticated
  WITH CHECK (public.owns_child(child_profile_id));

CREATE POLICY "Parents update own children audio prefs"
  ON public.audio_preferences FOR UPDATE TO authenticated
  USING (public.owns_child(child_profile_id));
