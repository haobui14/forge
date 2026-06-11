-- Local-dev seed: demo accounts so the leaderboard has company.
-- Password for every demo account: forge-demo-123
do $$
declare
  demo record;
begin
  for demo in
    select * from (values
      ('11111111-1111-4111-8111-111111111111'::uuid, 'mira@demo.forge',    'mira.dev',    2840, 9),
      ('22222222-2222-4222-8222-222222222222'::uuid, 'kt@demo.forge',      'kt_builds',   2310, 4),
      ('33333333-3333-4333-8333-333333333333'::uuid, 'octo@demo.forge',    'octocache',    890, 2),
      ('44444444-4444-4444-8444-444444444444'::uuid, 'sam@demo.forge',     'newgrad_sam',  410, 1)
    ) as t(id, email, handle, xp, streak)
  loop
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '00000000-0000-0000-0000-000000000000', demo.id, 'authenticated', 'authenticated',
      demo.email, crypt('forge-demo-123', gen_salt('bf')),
      now(), '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('handle', demo.handle),
      now(), now(), '', '', '', ''
    );

    insert into auth.identities (
      id, user_id, provider_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), demo.id, demo.id,
      jsonb_build_object('sub', demo.id::text, 'email', demo.email, 'email_verified', true),
      'email', now(), now(), now()
    );

    -- the on_auth_user_created trigger made the profile; top up its stats
    update public.profiles
    set xp = demo.xp,
        streak = demo.streak,
        last_activity_date = (now() at time zone 'utc')::date
    where id = demo.id;
  end loop;
end $$;
