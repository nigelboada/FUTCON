-- Esquema de la base de dades de FUTCON (Supabase / PostgreSQL)
-- Generat a partir del catàleg de PostgreSQL de l'esquema public. Només estructura, sense dades.

-- ======================================================================
-- Tipus enumerats
-- ======================================================================

create type public.availability_status as enum ('available', 'open_to_offers', 'unavailable');

create type public.staff_type as enum ('physiotherapist', 'nutritionist', 'physical_trainer', 'analyst', 'other');

create type public.user_role as enum ('player', 'coach', 'club', 'staff');

create type public.verification_status as enum ('unverified', 'pending', 'verified', 'rejected');


-- ======================================================================
-- Taules
-- ======================================================================

create table public.achievements (
  id bigint default nextval('achievements_id_seq'::regclass) not null,
  code text not null,
  title_ca text not null,
  title_es text not null,
  title_en text not null,
  description_ca text not null,
  description_es text not null,
  description_en text not null,
  icon_key text not null,
  points integer default 0 not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default now() not null
);

create table public.admin_warnings (
  id uuid default gen_random_uuid() not null,
  profile_id uuid not null,
  admin_profile_id uuid,
  reason text not null,
  message text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default now() not null
);

create table public.app_admins (
  profile_id uuid not null,
  created_at timestamp with time zone default now(),
  created_by uuid
);

create table public.club_profiles (
  profile_id uuid not null,
  club_name text not null,
  category text,
  city text,
  province text,
  website text,
  contact_role text,
  modality text,
  division_level text
);

create table public.coach_profiles (
  profile_id uuid not null,
  category text,
  current_club text,
  experience_years integer,
  coaching_license text,
  preferred_age_group text,
  modality text,
  division_level text
);

create table public.contact_messages (
  id uuid default gen_random_uuid() not null,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new'::text not null,
  created_at timestamp with time zone default now()
);

create table public.conversation_participants (
  conversation_id uuid not null,
  profile_id uuid not null,
  joined_at timestamp with time zone default now(),
  hidden_at timestamp with time zone,
  marked_unread boolean default false not null,
  last_hidden_at timestamp with time zone
);

create table public.conversations (
  id uuid default gen_random_uuid() not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table public.messages (
  id uuid default gen_random_uuid() not null,
  conversation_id uuid,
  sender_profile_id uuid,
  content text not null,
  created_at timestamp with time zone default now(),
  read_at timestamp with time zone
);

create table public.player_profiles (
  profile_id uuid not null,
  "position" text,
  preferred_foot text,
  category text,
  current_club text,
  experience_years integer,
  birth_year integer,
  height_cm integer,
  modality text,
  division_level text
);

create table public.profile_roles (
  profile_id uuid not null,
  role user_role not null,
  created_at timestamp with time zone default now()
);

create table public.profiles (
  id uuid not null,
  display_name text not null,
  bio text,
  avatar_url text,
  city text,
  province text,
  availability availability_status default 'available'::availability_status,
  verification verification_status default 'unverified'::verification_status,
  is_public boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  is_banned boolean default false not null,
  banned_at timestamp with time zone,
  banned_reason text,
  banned_by uuid
);

create table public.reviews (
  id uuid default gen_random_uuid() not null,
  reviewer_profile_id uuid,
  reviewed_profile_id uuid,
  rating integer not null,
  comment text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table public.staff_profiles (
  profile_id uuid not null,
  staff_kind staff_type not null,
  services text,
  experience_years integer,
  price_range text,
  works_remotely boolean default false
);

create table public.user_achievements (
  id bigint default nextval('user_achievements_id_seq'::regclass) not null,
  profile_id uuid not null,
  achievement_id bigint not null,
  unlocked_at timestamp with time zone default now() not null,
  seen_at timestamp with time zone,
  is_visible boolean default true not null
);

create table public.verification_requests (
  id uuid default gen_random_uuid() not null,
  profile_id uuid not null,
  status verification_status default 'pending'::verification_status not null,
  request_message text,
  created_at timestamp with time zone default now(),
  resolved_at timestamp with time zone,
  resolved_by uuid
);


-- ======================================================================
-- Claus i restriccions
-- ======================================================================

alter table public.achievements add constraint achievements_code_key UNIQUE (code);

alter table public.achievements add constraint achievements_pkey PRIMARY KEY (id);

alter table public.admin_warnings add constraint admin_warnings_admin_profile_id_fkey FOREIGN KEY (admin_profile_id) REFERENCES profiles(id);

alter table public.admin_warnings add constraint admin_warnings_pkey PRIMARY KEY (id);

alter table public.admin_warnings add constraint admin_warnings_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.app_admins add constraint app_admins_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id);

alter table public.app_admins add constraint app_admins_pkey PRIMARY KEY (profile_id);

alter table public.app_admins add constraint app_admins_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.club_profiles add constraint club_profiles_pkey PRIMARY KEY (profile_id);

alter table public.club_profiles add constraint club_profiles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.coach_profiles add constraint coach_profiles_pkey PRIMARY KEY (profile_id);

alter table public.coach_profiles add constraint coach_profiles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.contact_messages add constraint contact_messages_pkey PRIMARY KEY (id);

alter table public.conversation_participants add constraint conversation_participants_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;

alter table public.conversation_participants add constraint conversation_participants_pkey PRIMARY KEY (conversation_id, profile_id);

alter table public.conversation_participants add constraint conversation_participants_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.conversations add constraint conversations_pkey PRIMARY KEY (id);

alter table public.messages add constraint messages_content_check CHECK ((char_length(TRIM(BOTH FROM content)) > 0));

alter table public.messages add constraint messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;

alter table public.messages add constraint messages_pkey PRIMARY KEY (id);

alter table public.messages add constraint messages_sender_profile_id_fkey FOREIGN KEY (sender_profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.player_profiles add constraint player_profiles_pkey PRIMARY KEY (profile_id);

alter table public.player_profiles add constraint player_profiles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.profile_roles add constraint profile_roles_pkey PRIMARY KEY (profile_id, role);

alter table public.profile_roles add constraint profile_roles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.profiles add constraint profiles_banned_by_fkey FOREIGN KEY (banned_by) REFERENCES profiles(id);

alter table public.profiles add constraint profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

alter table public.profiles add constraint profiles_pkey PRIMARY KEY (id);

alter table public.reviews add constraint no_self_review CHECK ((reviewer_profile_id <> reviewed_profile_id));

alter table public.reviews add constraint reviews_pkey PRIMARY KEY (id);

alter table public.reviews add constraint reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)));

alter table public.reviews add constraint reviews_reviewed_profile_id_fkey FOREIGN KEY (reviewed_profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.reviews add constraint reviews_reviewer_profile_id_fkey FOREIGN KEY (reviewer_profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.staff_profiles add constraint staff_profiles_pkey PRIMARY KEY (profile_id);

alter table public.staff_profiles add constraint staff_profiles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.user_achievements add constraint user_achievements_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE;

alter table public.user_achievements add constraint user_achievements_pkey PRIMARY KEY (id);

alter table public.user_achievements add constraint user_achievements_profile_id_achievement_id_key UNIQUE (profile_id, achievement_id);

alter table public.user_achievements add constraint user_achievements_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.verification_requests add constraint verification_requests_pkey PRIMARY KEY (id);

alter table public.verification_requests add constraint verification_requests_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

alter table public.verification_requests add constraint verification_requests_resolved_by_fkey FOREIGN KEY (resolved_by) REFERENCES profiles(id);


-- ======================================================================
-- Índexs
-- ======================================================================

CREATE INDEX idx_conversation_participants_profile ON public.conversation_participants USING btree (profile_id);

CREATE INDEX idx_messages_conversation_created_at ON public.messages USING btree (conversation_id, created_at);

CREATE INDEX idx_messages_sender ON public.messages USING btree (sender_profile_id);

CREATE INDEX idx_player_profiles_category ON public.player_profiles USING btree (category);

CREATE INDEX idx_player_profiles_position ON public.player_profiles USING btree ("position");

CREATE INDEX idx_profile_roles_role ON public.profile_roles USING btree (role);

CREATE INDEX idx_profiles_availability ON public.profiles USING btree (availability);

CREATE INDEX idx_profiles_city ON public.profiles USING btree (city);

CREATE INDEX idx_profiles_is_public ON public.profiles USING btree (is_public);

CREATE INDEX idx_profiles_province ON public.profiles USING btree (province);

CREATE INDEX idx_reviews_reviewed_profile ON public.reviews USING btree (reviewed_profile_id);

CREATE INDEX idx_reviews_reviewer_profile ON public.reviews USING btree (reviewer_profile_id);

CREATE UNIQUE INDEX idx_reviews_unique_pair ON public.reviews USING btree (reviewer_profile_id, reviewed_profile_id);

CREATE UNIQUE INDEX idx_verification_requests_pending_profile ON public.verification_requests USING btree (profile_id) WHERE (status = 'pending'::verification_status);

CREATE INDEX idx_verification_requests_profile ON public.verification_requests USING btree (profile_id);


-- ======================================================================
-- Vistes
-- ======================================================================

create or replace view public.admin_verification_requests_view with (security_invoker=true) as
 SELECT vr.id,
    vr.profile_id,
    vr.status,
    vr.request_message,
    vr.created_at,
    vr.resolved_at,
    vr.resolved_by,
    p.display_name AS profile_display_name,
    p.city AS profile_city,
    p.province AS profile_province,
    p.verification AS profile_verification,
    COALESCE(string_agg(pr.role::text, ', '::text), 'Sense rol'::text) AS profile_roles
   FROM verification_requests vr
     JOIN profiles p ON p.id = vr.profile_id
     LEFT JOIN profile_roles pr ON pr.profile_id = p.id
  GROUP BY vr.id, vr.profile_id, vr.status, vr.request_message, vr.created_at, vr.resolved_at, vr.resolved_by, p.display_name, p.city, p.province, p.verification;

create or replace view public.conversation_overview_view with (security_invoker=true) as
 SELECT cp.profile_id AS viewer_profile_id,
    cp.hidden_at AS viewer_hidden_at,
    cp.last_hidden_at AS viewer_last_hidden_at,
    cp.marked_unread AS viewer_marked_unread,
    c.id AS conversation_id,
    c.created_at,
    c.updated_at,
    other_cp.profile_id AS other_profile_id,
    p.display_name AS other_display_name,
    p.city AS other_city,
    p.province AS other_province,
    pr.role AS other_role,
    last_message.content AS last_message_content,
    last_message.created_at AS last_message_at,
    ( SELECT count(*)::integer AS count
           FROM messages unread_messages
          WHERE unread_messages.conversation_id = c.id AND unread_messages.sender_profile_id <> cp.profile_id AND unread_messages.read_at IS NULL) AS unread_count,
    cp.marked_unread OR (EXISTS ( SELECT 1
           FROM messages unread_messages
          WHERE unread_messages.conversation_id = c.id AND unread_messages.sender_profile_id <> cp.profile_id AND unread_messages.read_at IS NULL)) AS has_unread
   FROM conversation_participants cp
     JOIN conversations c ON c.id = cp.conversation_id
     JOIN conversation_participants other_cp ON other_cp.conversation_id = c.id AND other_cp.profile_id <> cp.profile_id
     JOIN profiles p ON p.id = other_cp.profile_id
     LEFT JOIN profile_roles pr ON pr.profile_id = other_cp.profile_id
     LEFT JOIN LATERAL ( SELECT m.content,
            m.created_at
           FROM messages m
          WHERE m.conversation_id = c.id
          ORDER BY m.created_at DESC
         LIMIT 1) last_message ON true
  WHERE cp.hidden_at IS NULL;

create or replace view public.profile_review_summary_view with (security_invoker=true) as
 SELECT reviewed_profile_id,
    count(*)::integer AS review_count,
    round(avg(rating), 2) AS average_rating
   FROM reviews
  GROUP BY reviewed_profile_id;

create or replace view public.profile_reviews_view with (security_invoker=true) as
 SELECT r.id,
    r.reviewer_profile_id,
    r.reviewed_profile_id,
    reviewer.display_name AS reviewer_display_name,
    r.rating,
    r.comment,
    r.created_at,
    r.updated_at
   FROM reviews r
     JOIN profiles reviewer ON reviewer.id = r.reviewer_profile_id;

create or replace view public.profile_search_view with (security_invoker=true) as
 SELECT p.id AS profile_id,
    p.display_name,
    p.bio,
    p.city,
    p.province,
    p.availability,
    p.verification,
    pr.role,
    pp."position" AS player_position,
    pp.category AS player_category,
    pp.current_club AS player_current_club,
    cp.category AS coach_category,
    cp.current_club AS coach_current_club,
    cp.coaching_license,
    club.club_name,
    club.category AS club_category,
    sp.staff_kind,
    sp.services AS staff_services,
    sp.price_range,
    COALESCE(rs.review_count, 0) AS review_count,
    rs.average_rating,
    p.avatar_url,
    pp.modality AS player_modality,
    pp.division_level AS player_division_level,
    cp.modality AS coach_modality,
    cp.division_level AS coach_division_level,
    club.modality AS club_modality,
    club.division_level AS club_division_level
   FROM profiles p
     JOIN profile_roles pr ON pr.profile_id = p.id
     LEFT JOIN player_profiles pp ON pp.profile_id = p.id
     LEFT JOIN coach_profiles cp ON cp.profile_id = p.id
     LEFT JOIN club_profiles club ON club.profile_id = p.id
     LEFT JOIN staff_profiles sp ON sp.profile_id = p.id
     LEFT JOIN profile_review_summary_view rs ON rs.reviewed_profile_id = p.id
  WHERE p.is_public = true;


-- ======================================================================
-- Funcions
-- ======================================================================

CREATE OR REPLACE FUNCTION public.approve_profile_verification_request(target_request_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  target_profile_id uuid;
begin
  if not public.is_app_admin() then
    raise exception 'No tens permisos d’administració.';
  end if;

  select profile_id
  into target_profile_id
  from public.verification_requests
  where id = target_request_id
    and status = 'pending';

  if target_profile_id is null then
    raise exception 'La sol·licitud no existeix o ja no està pendent.';
  end if;

  if target_profile_id = auth.uid() then
    raise exception 'Un administrador no pot aprovar la seva pròpia verificació.';
  end if;

  update public.verification_requests
  set
    status = 'verified',
    resolved_at = now(),
    resolved_by = auth.uid()
  where id = target_request_id;

  update public.profiles
  set
    verification = 'verified',
    updated_at = now()
  where id = target_profile_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.award_achievement(achievement_code text, target_profile_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  target_achievement_id bigint;
  affected_rows integer;
begin
  if auth.uid() is null then
    raise exception 'Usuari no autenticat.';
  end if;

  if target_profile_id is null then
    raise exception 'Perfil no vàlid.';
  end if;

  if target_profile_id <> auth.uid()
     and not public.is_app_admin() then
    raise exception 'No tens permisos per assignar aquest assoliment.';
  end if;

  select id
  into target_achievement_id
  from public.achievements
  where code = achievement_code;

  if target_achievement_id is null then
    return false;
  end if;

  insert into public.user_achievements (
    profile_id,
    achievement_id
  )
  values (
    target_profile_id,
    target_achievement_id
  )
  on conflict (profile_id, achievement_id) do nothing;

  get diagnostics affected_rows = row_count;

  return affected_rows > 0;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.ban_profile(target_profile_id uuid, reason text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if not public.is_app_admin() then
    raise exception 'No tens permisos per banejar usuaris.';
  end if;

  if target_profile_id = auth.uid() then
    raise exception 'No pots banejar el teu propi perfil.';
  end if;

  update public.profiles
  set
    is_banned = true,
    banned_at = now(),
    banned_reason = reason,
    banned_by = auth.uid(),
    updated_at = now()
  where id = target_profile_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_admin_warning(target_profile_id uuid, warning_reason text, warning_message text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if not public.is_app_admin() then
    raise exception 'No tens permisos per enviar advertències.';
  end if;

  if target_profile_id = auth.uid() then
    raise exception 'No pots enviar-te una advertència a tu mateix.';
  end if;

  insert into public.admin_warnings (
    profile_id,
    admin_profile_id,
    reason,
    message
  )
  values (
    target_profile_id,
    auth.uid(),
    warning_reason,
    warning_message
  );
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_or_get_conversation(target_profile_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  current_profile_id uuid;
  existing_conversation_id uuid;
  new_conversation_id uuid;
begin
  current_profile_id := auth.uid();

  if current_profile_id is null then
    raise exception 'Usuari no autenticat.';
  end if;

  if current_profile_id = target_profile_id then
    raise exception 'No es pot crear una conversa amb un mateix perfil.';
  end if;

  if not exists (
    select 1
    from public.profiles p
    where p.id = target_profile_id
      and p.is_public = true
  ) then
    raise exception 'El perfil de destí no existeix o no és públic.';
  end if;

  select cp1.conversation_id
  into existing_conversation_id
  from public.conversation_participants cp1
  join public.conversation_participants cp2
    on cp2.conversation_id = cp1.conversation_id
  where cp1.profile_id = current_profile_id
    and cp2.profile_id = target_profile_id
  limit 1;

  if existing_conversation_id is not null then
    update public.conversation_participants
    set hidden_at = null
    where public.conversation_participants.conversation_id = existing_conversation_id
      and public.conversation_participants.profile_id = current_profile_id;

    return existing_conversation_id;
  end if;

  insert into public.conversations default values
  returning id into new_conversation_id;

  insert into public.conversation_participants (conversation_id, profile_id)
  values
    (new_conversation_id, current_profile_id),
    (new_conversation_id, target_profile_id);

  update public.conversation_participants
  set hidden_at = null
  where public.conversation_participants.conversation_id = new_conversation_id
    and public.conversation_participants.profile_id = current_profile_id;

  return new_conversation_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_own_profile()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if auth.uid() is null then
    raise exception 'Usuari no autenticat.';
  end if;

  delete from public.profiles
  where id = auth.uid();
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_unread_message_count()
 RETURNS integer
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select count(*)::integer
  from public.conversation_participants cp
  where cp.profile_id = auth.uid()
    and (
      cp.marked_unread = true
      or exists (
        select 1
        from public.messages m
        where m.conversation_id = cp.conversation_id
          and m.sender_profile_id <> auth.uid()
          and m.read_at is null
      )
    );
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (
    id,
    display_name,
    is_public
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      split_part(new.email, '@', 1),
      'Perfil FUTCON'
    ),
    true
  )
  on conflict (id) do nothing;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_app_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.app_admins
    where profile_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_conversation_participant(target_conversation_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.conversation_participants cp
    where cp.conversation_id = target_conversation_id
      and cp.profile_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_unauthorized_verification_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.verification is distinct from old.verification then

    -- Permet canvis manuals des del panell SQL/admin de Supabase.
    if auth.uid() is null then
      return new;
    end if;

    -- Permet canvis fets per administradors de FUTCON.
    if public.is_app_admin() then
      return new;
    end if;

    -- Permet només que el mateix usuari passi de no verificat/rebutjat a pendent.
    if auth.uid() = old.id
       and old.verification in ('unverified', 'rejected')
       and new.verification = 'pending' then
      return new;
    end if;

    raise exception 'No tens permisos per modificar l’estat de verificació.';
  end if;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.reject_profile_verification_request(target_request_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  target_profile_id uuid;
begin
  if not public.is_app_admin() then
    raise exception 'No tens permisos d’administració.';
  end if;

  select profile_id
  into target_profile_id
  from public.verification_requests
  where id = target_request_id
    and status = 'pending';

  if target_profile_id is null then
    raise exception 'La sol·licitud no existeix o ja no està pendent.';
  end if;

  if target_profile_id = auth.uid() then
    raise exception 'Un administrador no pot resoldre la seva pròpia verificació.';
  end if;

  update public.verification_requests
  set
    status = 'rejected',
    resolved_at = now(),
    resolved_by = auth.uid()
  where id = target_request_id;

  update public.profiles
  set
    verification = 'rejected',
    updated_at = now()
  where id = target_profile_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.request_profile_verification(request_message text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  current_profile_id uuid;
  current_status verification_status;
begin
  current_profile_id := auth.uid();

  if current_profile_id is null then
    raise exception 'Usuari no autenticat.';
  end if;

  select verification
  into current_status
  from public.profiles
  where id = current_profile_id;

  if current_status is null then
    raise exception 'El perfil no existeix.';
  end if;

  if current_status = 'verified' then
    raise exception 'Aquest perfil ja està verificat.';
  end if;

  update public.profiles
  set
    verification = 'pending',
    updated_at = now()
  where id = current_profile_id
    and verification in ('unverified', 'rejected');

  if not exists (
    select 1
    from public.verification_requests
    where profile_id = current_profile_id
      and status = 'pending'
  ) then
    insert into public.verification_requests (
      profile_id,
      status,
      request_message
    )
    values (
      current_profile_id,
      'pending',
      nullif(trim(request_message), '')
    );
  end if;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.restore_hidden_conversation_on_new_message()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.conversation_participants
  set hidden_at = null
  where conversation_id = new.conversation_id
    and profile_id <> new.sender_profile_id
    and hidden_at is not null;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.unban_profile(target_profile_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if not public.is_app_admin() then
    raise exception 'No tens permisos per desbanejar usuaris.';
  end if;

  update public.profiles
  set
    is_banned = false,
    banned_at = null,
    banned_reason = null,
    banned_by = null,
    updated_at = now()
  where id = target_profile_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;

  return new;
end;
$function$
;


-- ======================================================================
-- Triggers
-- ======================================================================

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER on_message_created_update_conversation AFTER INSERT ON public.messages FOR EACH ROW EXECUTE FUNCTION update_conversation_timestamp();

CREATE TRIGGER on_message_restore_hidden_conversation AFTER INSERT ON public.messages FOR EACH ROW EXECUTE FUNCTION restore_hidden_conversation_on_new_message();

CREATE TRIGGER prevent_unauthorized_verification_update BEFORE UPDATE OF verification ON public.profiles FOR EACH ROW EXECUTE FUNCTION prevent_unauthorized_verification_update();


-- ======================================================================
-- Row Level Security
-- ======================================================================

alter table public.achievements enable row level security;

alter table public.admin_warnings enable row level security;

alter table public.app_admins enable row level security;

alter table public.club_profiles enable row level security;

alter table public.coach_profiles enable row level security;

alter table public.contact_messages enable row level security;

alter table public.conversation_participants enable row level security;

alter table public.conversations enable row level security;

alter table public.messages enable row level security;

alter table public.player_profiles enable row level security;

alter table public.profile_roles enable row level security;

alter table public.profiles enable row level security;

alter table public.reviews enable row level security;

alter table public.staff_profiles enable row level security;

alter table public.user_achievements enable row level security;

alter table public.verification_requests enable row level security;


-- ======================================================================
-- Polítiques RLS
-- ======================================================================

create policy "Achievements are readable by authenticated users" on public.achievements as permissive for select to authenticated
  using (true);

create policy "Admins can insert admin warnings" on public.admin_warnings as permissive for insert to authenticated
  with check (is_app_admin());

create policy "Admins can read all admin warnings" on public.admin_warnings as permissive for select to authenticated
  using (is_app_admin());

create policy "Users can read own admin warnings" on public.admin_warnings as permissive for select to authenticated
  using ((auth.uid() = profile_id));

create policy "Users can update own warning read status" on public.admin_warnings as permissive for update to authenticated
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Admins can read admins" on public.app_admins as permissive for select to public
  using (is_app_admin());

create policy "Users can manage own club profile" on public.club_profiles as permissive for all to public
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Users can read club profiles" on public.club_profiles as permissive for select to public
  using (true);

create policy "Users can manage own coach profile" on public.coach_profiles as permissive for all to public
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Users can read coach profiles" on public.coach_profiles as permissive for select to public
  using (true);

create policy "Admins can read contact messages" on public.contact_messages as permissive for select to public
  using (is_app_admin());

create policy "Anyone can submit contact messages" on public.contact_messages as permissive for insert to public
  with check (true);

create policy "Participants can read conversation participants" on public.conversation_participants as permissive for select to public
  using (is_conversation_participant(conversation_id));

create policy "Participants can update own conversation state" on public.conversation_participants as permissive for update to authenticated
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Participants can read conversations" on public.conversations as permissive for select to public
  using (is_conversation_participant(id));

create policy "Participants can insert messages" on public.messages as permissive for insert to public
  with check (((auth.uid() = sender_profile_id) AND is_conversation_participant(conversation_id)));

create policy "Participants can read messages" on public.messages as permissive for select to public
  using (is_conversation_participant(conversation_id));

create policy "Participants can update read status of received messages" on public.messages as permissive for update to authenticated
  using ((is_conversation_participant(conversation_id) AND (sender_profile_id <> auth.uid())))
  with check ((is_conversation_participant(conversation_id) AND (sender_profile_id <> auth.uid())));

create policy "Users can manage own player profile" on public.player_profiles as permissive for all to public
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Users can read player profiles" on public.player_profiles as permissive for select to public
  using (true);

create policy "Users can delete own profile roles" on public.profile_roles as permissive for delete to public
  using ((auth.uid() = profile_id));

create policy "Users can insert own profile roles" on public.profile_roles as permissive for insert to public
  with check ((auth.uid() = profile_id));

create policy "Users can insert own roles" on public.profile_roles as permissive for insert to public
  with check ((auth.uid() = profile_id));

create policy "Users can read own profile roles" on public.profile_roles as permissive for select to public
  using ((auth.uid() = profile_id));

create policy "Users can read profile roles" on public.profile_roles as permissive for select to public
  using (true);

create policy "Users can update own roles" on public.profile_roles as permissive for update to public
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Public profiles are readable" on public.profiles as permissive for select to public
  using ((is_public = true));

create policy "Users can insert own profile" on public.profiles as permissive for insert to public
  with check ((auth.uid() = id));

create policy "Users can update own profile" on public.profiles as permissive for update to public
  using ((auth.uid() = id))
  with check ((auth.uid() = id));

create policy "Reviews are readable" on public.reviews as permissive for select to public
  using (true);

create policy "Users can delete own reviews" on public.reviews as permissive for delete to public
  using ((auth.uid() = reviewer_profile_id));

create policy "Users can insert own reviews" on public.reviews as permissive for insert to public
  with check (((auth.uid() = reviewer_profile_id) AND (auth.uid() <> reviewed_profile_id)));

create policy "Users can update own reviews" on public.reviews as permissive for update to public
  using ((auth.uid() = reviewer_profile_id))
  with check (((auth.uid() = reviewer_profile_id) AND (auth.uid() <> reviewed_profile_id)));

create policy "Users can manage own staff profile" on public.staff_profiles as permissive for all to public
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Users can read staff profiles" on public.staff_profiles as permissive for select to public
  using (true);

create policy "Users can mark own achievements as seen" on public.user_achievements as permissive for update to authenticated
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Users can read visible or own achievements" on public.user_achievements as permissive for select to authenticated
  using (((is_visible = true) OR (auth.uid() = profile_id)));

create policy "Users can update own achievement visibility" on public.user_achievements as permissive for update to authenticated
  using ((auth.uid() = profile_id))
  with check ((auth.uid() = profile_id));

create policy "Admins can read all verification requests" on public.verification_requests as permissive for select to public
  using (is_app_admin());

create policy "Users can read own verification requests" on public.verification_requests as permissive for select to public
  using ((auth.uid() = profile_id));


-- ======================================================================
-- Permisos d'actualització per columna
-- ======================================================================

revoke update on public.conversation_participants from anon, authenticated;
grant update (hidden_at, last_hidden_at, marked_unread) on public.conversation_participants to authenticated;

revoke update on public.messages from anon, authenticated;
grant update (read_at) on public.messages to authenticated;

revoke update on public.profiles from anon, authenticated;
grant update (availability, avatar_url, bio, city, display_name, is_public, province, updated_at) on public.profiles to authenticated;

revoke update on public.user_achievements from anon, authenticated;
grant update (is_visible, seen_at) on public.user_achievements to authenticated;
