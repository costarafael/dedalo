--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.2 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: orioledb; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS orioledb WITH SCHEMA public;


--
-- Name: EXTENSION orioledb; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION orioledb IS 'OrioleDB -- the next generation transactional engine';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: AssigneeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AssigneeType" AS ENUM (
    'USER',
    'GROUP',
    'CONTEXT',
    'PROVIDER',
    'PROVIDER_GROUP',
    'CLIENT'
);


ALTER TYPE public."AssigneeType" OWNER TO postgres;

--
-- Name: AuditActionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AuditActionType" AS ENUM (
    'CREATE',
    'READ',
    'UPDATE',
    'DELETE',
    'LOGIN',
    'LOGOUT',
    'EXPORT',
    'IMPORT',
    'SHARE',
    'APPROVE',
    'REJECT',
    'CUSTOM'
);


ALTER TYPE public."AuditActionType" OWNER TO postgres;

--
-- Name: ComponentCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ComponentCategory" AS ENUM (
    'DATA',
    'FORM',
    'LAYOUT',
    'NAVIGATION',
    'UTILITY',
    'SECURITY',
    'CUSTOM'
);


ALTER TYPE public."ComponentCategory" OWNER TO postgres;

--
-- Name: ComponentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ComponentType" AS ENUM (
    'FIELD',
    'FILE',
    'SIGNATURE',
    'TOKEN_INPUT',
    'CODE_EDITOR',
    'CAMERA',
    'DATE_RANGE',
    'CUSTOM'
);


ALTER TYPE public."ComponentType" OWNER TO postgres;

--
-- Name: ContextType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ContextType" AS ENUM (
    'ADMIN',
    'AGENCY',
    'CLIENT',
    'PROVIDER'
);


ALTER TYPE public."ContextType" OWNER TO postgres;

--
-- Name: FieldType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."FieldType" AS ENUM (
    'TEXT',
    'TEXTAREA',
    'PASSWORD',
    'EMAIL',
    'URL',
    'NUMBER',
    'RATING',
    'SELECT',
    'MULTISELECT',
    'RADIO',
    'CHECKBOX',
    'DATE',
    'TIME',
    'DATETIME',
    'DATE_RANGE',
    'PHONE',
    'TEL',
    'FILE',
    'MULTIFILE',
    'COLOR',
    'CPF',
    'CNPJ',
    'SWITCH'
);


ALTER TYPE public."FieldType" OWNER TO postgres;

--
-- Name: GenericStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."GenericStatus" AS ENUM (
    'SUCCESS',
    'FAILURE',
    'PENDING',
    'CANCELLED',
    'BLOCKED',
    'FLAGGED'
);


ALTER TYPE public."GenericStatus" OWNER TO postgres;

--
-- Name: HierarchyValidationType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."HierarchyValidationType" AS ENUM (
    'STRICT',
    'FLEXIBLE',
    'CUSTOM'
);


ALTER TYPE public."HierarchyValidationType" OWNER TO postgres;

--
-- Name: LogLevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LogLevel" AS ENUM (
    'DEBUG',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL'
);


ALTER TYPE public."LogLevel" OWNER TO postgres;

--
-- Name: NodeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."NodeType" AS ENUM (
    'ROOT',
    'CATEGORY',
    'OPTION'
);


ALTER TYPE public."NodeType" OWNER TO postgres;

--
-- Name: ScopeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ScopeType" AS ENUM (
    'MODULE',
    'WORKFLOW',
    'RECORD_TEMPLATE',
    'COMPONENT',
    'PROVIDER_HIERARCHY',
    'ORGANIZATIONAL_UNIT',
    'UNIT_CONTAINER'
);


ALTER TYPE public."ScopeType" OWNER TO postgres;

--
-- Name: SecurityEventType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SecurityEventType" AS ENUM (
    'LOGIN_ATTEMPT',
    'PASSWORD_CHANGE',
    'PERMISSION_CHANGE',
    'API_KEY_GENERATED',
    'TOKEN_GENERATED',
    'ACCESS_DENIED',
    'SUSPICIOUS_ACTIVITY'
);


ALTER TYPE public."SecurityEventType" OWNER TO postgres;

--
-- Name: TriggerType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TriggerType" AS ENUM (
    'SCHEDULE',
    'EVENT',
    'CONDITION'
);


ALTER TYPE public."TriggerType" OWNER TO postgres;

--
-- Name: UnitSelectionMode; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UnitSelectionMode" AS ENUM (
    'single',
    'multiple'
);


ALTER TYPE public."UnitSelectionMode" OWNER TO postgres;

--
-- Name: entitytype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.entitytype AS ENUM (
    'CLIENT',
    'PROVIDER',
    'AGENCY'
);


ALTER TYPE public.entitytype OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: graphql(text, text, jsonb, jsonb); Type: FUNCTION; Schema: graphql_public; Owner: supabase_admin
--

CREATE FUNCTION graphql_public.graphql("operationName" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
    DECLARE
        server_version float;
    BEGIN
        server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

        IF server_version >= 14 THEN
            RETURN jsonb_build_object(
                'errors', jsonb_build_array(
                    jsonb_build_object(
                        'message', 'pg_graphql extension is not enabled.'
                    )
                )
            );
        ELSE
            RETURN jsonb_build_object(
                'errors', jsonb_build_array(
                    jsonb_build_object(
                        'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                    )
                )
            );
        END IF;
    END;
$$;


ALTER FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) OWNER TO supabase_admin;

--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: create_client_root_unit(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_client_root_unit() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    unit_id TEXT;
    node_name_id TEXT;
BEGIN
  IF NEW.type = 'CLIENT' THEN
    -- Gera um ID para a unidade organizacional
    unit_id := UPPER(
        SUBSTRING(NEW.name, 1, 2) || 
        SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
        'U'  -- U de Unit
    );

    -- Gera um ID para o node_name
    node_name_id := UPPER(
        'ROOT' || 
        SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
        'N'  -- N de Node
    );
    
    -- Insere o node_name
    INSERT INTO node_names (
      id,
      name,
      client_id,
      created_at,
      updated_at
    ) VALUES (
      node_name_id,
      'ROOT',
      NEW.id,
      NOW(),
      NOW()
    );
    
    -- Insere a unidade organizacional
    INSERT INTO organizational_units (
      id,
      client_id,
      name,
      type,
      depth,
      order_index,
      is_active,
      node_name_id,
      created_at,
      updated_at
    ) VALUES (
      unit_id,
      NEW.id,
      NEW.name,
      'ROOT',
      0,
      0,
      true,
      node_name_id,
      NOW(),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.create_client_root_unit() OWNER TO postgres;

--
-- Name: generate_entity_id(text, public."ContextType"); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_entity_id(name text, entity_type public."ContextType") RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    type_str TEXT;
BEGIN
    type_str := entity_type::TEXT;
    RETURN UPPER(
        SUBSTRING(name, 1, 2) || 
        SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
        LEFT(type_str, 1)
    );
END;
$$;


ALTER FUNCTION public.generate_entity_id(name text, entity_type public."ContextType") OWNER TO postgres;

--
-- Name: manage_node(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.manage_node() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_has_nodes BOOLEAN;
BEGIN
  -- Verifica se é o primeiro node do cliente
  IF TG_OP = 'INSERT' THEN
    SELECT EXISTS (
      SELECT 1 
      FROM node_names n 
      WHERE n.client_id = NEW.client_id 
        AND n.deleted_at IS NULL
    ) INTO v_has_nodes;

    -- Se for o primeiro node, força ser root
    IF NOT v_has_nodes THEN
      NEW.is_root := true;
      NEW."order" := 0;
      NEW."validationType" := 'STRICT';
      NEW.is_required := true;
    END IF;
  END IF;

  -- Impede alteração do status root
  IF TG_OP = 'UPDATE' THEN
    IF OLD.is_root <> NEW.is_root THEN
      RAISE EXCEPTION 'Não é permitido alterar o status root de um node';
    END IF;
    
    -- Mantém ordem 0 para root
    IF OLD.is_root AND NEW."order" != 0 THEN
      NEW."order" := 0;
    END IF;
  END IF;

  -- Para nodes não-root, define ordem se necessário
  IF NOT NEW.is_root AND (NEW."order" IS NULL OR NEW."order" <= 0) THEN
    SELECT COALESCE(MAX(n."order"), 0) + 1
    INTO NEW."order"
    FROM node_names n
    WHERE n.client_id = NEW.client_id
      AND NOT n.is_root
      AND n.deleted_at IS NULL;
  END IF;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.manage_node() OWNER TO postgres;

--
-- Name: set_entity_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_entity_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.id = generate_entity_id(NEW.name, NEW.type);
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_entity_id() OWNER TO postgres;

--
-- Name: update_node_unit_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_node_unit_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = NEW.node_name_id
        )
        WHERE id = NEW.node_name_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = OLD.node_name_id
        )
        WHERE id = OLD.node_name_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.node_name_id != NEW.node_name_id THEN
        -- Atualizar contagem do node antigo
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = OLD.node_name_id
        )
        WHERE id = OLD.node_name_id;
        
        -- Atualizar contagem do novo node
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = NEW.node_name_id
        )
        WHERE id = NEW.node_name_id;
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.update_node_unit_count() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  partition_name text;
BEGIN
  partition_name := 'messages_' || to_char(NOW(), 'YYYY_MM_DD');

  IF NOT EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'realtime'
    AND c.relname = partition_name
  ) THEN
    EXECUTE format(
      'CREATE TABLE realtime.%I PARTITION OF realtime.messages FOR VALUES FROM (%L) TO (%L)',
      partition_name,
      NOW(),
      (NOW() + interval '1 day')::timestamp
    );
  END IF;

  INSERT INTO realtime.messages (payload, event, topic, private, extension)
  VALUES (payload, event, topic, private, 'broadcast');
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


SET default_table_access_method = orioledb;

--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


SET default_table_access_method = heap;

--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


SET default_table_access_method = orioledb;

--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

SET default_table_access_method = heap;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


SET default_table_access_method = orioledb;

--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


SET default_table_access_method = heap;

--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


SET default_table_access_method = orioledb;

--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


SET default_table_access_method = orioledb;

--
-- Name: Entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Entity" (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    type public."ContextType"
);


ALTER TABLE public."Entity" OWNER TO postgres;

--
-- Name: Record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Record" (
    id character varying(7) DEFAULT concat('R', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    template_id text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    name text NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    metadata jsonb,
    hierarchy_id text,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    created_by text NOT NULL,
    updated_by text,
    organizational_unit_id text
);


ALTER TABLE public."Record" OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    user_id text NOT NULL,
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    action text NOT NULL,
    "actionType" public."AuditActionType" NOT NULL,
    status public."GenericStatus" DEFAULT 'SUCCESS'::public."GenericStatus" NOT NULL,
    previous_data jsonb,
    new_data jsonb,
    metadata jsonb,
    ip_address text,
    user_agent text,
    hierarchy_id text,
    context_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: component_library; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component_library (
    id character varying(7) DEFAULT concat('L', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    name text NOT NULL,
    description text,
    type public."ComponentType" NOT NULL,
    category public."ComponentCategory" NOT NULL,
    version text DEFAULT '1.0.0'::text NOT NULL,
    is_latest_version boolean DEFAULT true NOT NULL,
    config jsonb NOT NULL,
    metadata jsonb,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.component_library OWNER TO postgres;

--
-- Name: container_node_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.container_node_names (
    id text NOT NULL,
    container_id text NOT NULL,
    node_name_id text NOT NULL,
    is_required boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    item_count integer DEFAULT 0 NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.container_node_names OWNER TO postgres;

--
-- Name: context_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.context_permissions (
    id text NOT NULL,
    user_context_id text NOT NULL,
    permission_id text NOT NULL,
    scope_type public."ScopeType" NOT NULL,
    scope_id text NOT NULL,
    deleted_at timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.context_permissions OWNER TO postgres;

--
-- Name: group_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_members (
    id text NOT NULL,
    group_id text NOT NULL,
    user_id text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.group_members OWNER TO postgres;

--
-- Name: group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_permissions (
    id text NOT NULL,
    group_id text NOT NULL,
    permission_id text NOT NULL,
    scope_type public."ScopeType" NOT NULL,
    scope_id text NOT NULL,
    deleted_at timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.group_permissions OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "contextType" public."ContextType" NOT NULL,
    entity_id text,
    is_active boolean DEFAULT true NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: integration_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.integration_logs (
    id text NOT NULL,
    integration_type text NOT NULL,
    direction text NOT NULL,
    status public."GenericStatus" NOT NULL,
    request_data jsonb,
    response_data jsonb,
    error text,
    duration integer,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.integration_logs OWNER TO postgres;

--
-- Name: module_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.module_components (
    id character varying(7) DEFAULT concat('C', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    module_id text NOT NULL,
    library_id text,
    type public."ComponentType" NOT NULL,
    category public."ComponentCategory" NOT NULL,
    config jsonb NOT NULL,
    metadata jsonb,
    is_required boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.module_components OWNER TO postgres;

--
-- Name: module_dependencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.module_dependencies (
    id character varying(7) DEFAULT concat('D', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    module_id text NOT NULL,
    dependency_id text NOT NULL,
    "isRequired" boolean DEFAULT true NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.module_dependencies OWNER TO postgres;

--
-- Name: module_instances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.module_instances (
    id character varying(7) DEFAULT concat('MI', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    module_id text NOT NULL,
    client_id text NOT NULL,
    source_id text,
    is_active boolean DEFAULT true NOT NULL,
    config jsonb,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.module_instances OWNER TO postgres;

--
-- Name: module_organizational_scopes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.module_organizational_scopes (
    id text NOT NULL,
    module_id text NOT NULL,
    "scopeType" public."ScopeType" NOT NULL,
    scope_id text NOT NULL,
    is_required boolean DEFAULT false NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.module_organizational_scopes OWNER TO postgres;

--
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    id character varying(7) DEFAULT concat('M', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    slug character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp(3) without time zone,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    is_library boolean DEFAULT false NOT NULL
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- Name: node_hierarchy_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.node_hierarchy_rules (
    id text NOT NULL,
    parent_node_id text NOT NULL,
    child_node_id text NOT NULL,
    "isRequired" boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.node_hierarchy_rules OWNER TO postgres;

--
-- Name: node_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.node_names (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    client_id text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    is_required boolean DEFAULT false NOT NULL,
    "validationType" public."HierarchyValidationType" DEFAULT 'FLEXIBLE'::public."HierarchyValidationType" NOT NULL,
    metadata jsonb,
    unit_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_root boolean DEFAULT false,
    unit_selection_mode public."UnitSelectionMode" DEFAULT 'single'::public."UnitSelectionMode" NOT NULL
);


ALTER TABLE public.node_names OWNER TO postgres;

--
-- Name: organizational_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizational_units (
    id text NOT NULL,
    name text NOT NULL,
    type public."NodeType" DEFAULT 'OPTION'::public."NodeType" NOT NULL,
    client_id text NOT NULL,
    node_name_id text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    full_path text,
    depth integer DEFAULT 0 NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.organizational_units OWNER TO postgres;

--
-- Name: performance_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.performance_logs (
    id text NOT NULL,
    operation text NOT NULL,
    duration integer NOT NULL,
    status public."GenericStatus" NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.performance_logs OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "contextTypes" public."ContextType"[],
    "scopeTypes" public."ScopeType"[],
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: provider_hierarchies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provider_hierarchies (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    provider_id text NOT NULL,
    client_id text,
    parent_provider_id text,
    root_provider_id text,
    is_active boolean DEFAULT true,
    version integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at timestamp with time zone,
    metadata jsonb,
    hierarchy_path text[] DEFAULT ARRAY[]::text[],
    level integer DEFAULT 1,
    valid_from timestamp with time zone DEFAULT timezone('utc'::text, now()),
    valid_to timestamp with time zone,
    CONSTRAINT provider_hierarchies_client_or_parent_check CHECK ((((client_id IS NOT NULL) AND (parent_provider_id IS NULL)) OR ((client_id IS NULL) AND (parent_provider_id IS NOT NULL))))
);


ALTER TABLE public.provider_hierarchies OWNER TO postgres;

--
-- Name: provider_hierarchy_cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provider_hierarchy_cache (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    hierarchy_id text NOT NULL,
    depth integer NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.provider_hierarchy_cache OWNER TO postgres;

--
-- Name: provider_hierarchy_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provider_hierarchy_history (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    hierarchy_id text NOT NULL,
    version integer NOT NULL,
    changed_by text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata jsonb
);


ALTER TABLE public.provider_hierarchy_history OWNER TO postgres;

--
-- Name: provider_hierarchy_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provider_hierarchy_rules (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    client_id text,
    is_active boolean DEFAULT true,
    priority integer DEFAULT 0,
    validation_type text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.provider_hierarchy_rules OWNER TO postgres;

--
-- Name: record_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_files (
    id text NOT NULL,
    record_id text NOT NULL,
    field_id text NOT NULL,
    file_name text NOT NULL,
    file_type text NOT NULL,
    "fileSize" integer NOT NULL,
    file_url text NOT NULL,
    bucket_path text NOT NULL,
    metadata jsonb,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.record_files OWNER TO postgres;

--
-- Name: record_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_history (
    id text NOT NULL,
    record_id text NOT NULL,
    version integer NOT NULL,
    changes jsonb NOT NULL,
    metadata jsonb,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.record_history OWNER TO postgres;

--
-- Name: record_organizational_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_organizational_units (
    id text NOT NULL,
    record_id text NOT NULL,
    organizational_unit_id text NOT NULL,
    scope_type public."ScopeType" NOT NULL,
    scope_id text NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    module_id text
);


ALTER TABLE public.record_organizational_units OWNER TO postgres;

--
-- Name: record_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_templates (
    id character varying(7) DEFAULT concat('T', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    module_id text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    slug character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp(3) without time zone,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.record_templates OWNER TO postgres;

--
-- Name: record_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_values (
    id text NOT NULL,
    record_id text NOT NULL,
    field_id text NOT NULL,
    value jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    module_id text,
    "templateId" text NOT NULL
);


ALTER TABLE public.record_values OWNER TO postgres;

--
-- Name: security_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.security_logs (
    id text NOT NULL,
    user_id text,
    "eventType" public."SecurityEventType" NOT NULL,
    status public."GenericStatus" NOT NULL,
    ip_address text NOT NULL,
    user_agent text,
    details jsonb,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.security_logs OWNER TO postgres;

--
-- Name: system_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_logs (
    id text NOT NULL,
    level public."LogLevel" NOT NULL,
    source text NOT NULL,
    message text NOT NULL,
    details jsonb,
    metadata jsonb,
    stack_trace text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id text
);


ALTER TABLE public.system_logs OWNER TO postgres;

--
-- Name: template_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.template_fields (
    id text NOT NULL,
    template_id text NOT NULL,
    label text NOT NULL,
    type public."FieldType" NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    is_required boolean DEFAULT false NOT NULL,
    is_unique boolean DEFAULT false NOT NULL,
    config jsonb NOT NULL,
    validation jsonb,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.template_fields OWNER TO postgres;

--
-- Name: template_organizational_scopes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.template_organizational_scopes (
    id text NOT NULL,
    template_id text NOT NULL,
    "scopeType" public."ScopeType" NOT NULL,
    scope_id text NOT NULL,
    is_required boolean DEFAULT false NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.template_organizational_scopes OWNER TO postgres;

--
-- Name: unit_container_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_container_items (
    id text NOT NULL,
    container_id text NOT NULL,
    unit_id text NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.unit_container_items OWNER TO postgres;

--
-- Name: unit_containers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_containers (
    id text NOT NULL,
    name text NOT NULL,
    container_key text NOT NULL,
    client_id text NOT NULL,
    description text,
    metadata jsonb,
    is_active boolean DEFAULT true NOT NULL,
    item_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.unit_containers OWNER TO postgres;

--
-- Name: unit_hierarchies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_hierarchies (
    id text NOT NULL,
    child_id text NOT NULL,
    parent_id text NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    path_from_root text,
    depth integer DEFAULT 0 NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.unit_hierarchies OWNER TO postgres;

--
-- Name: user_contexts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_contexts (
    id character varying(7) DEFAULT concat('UCTX', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    user_id text NOT NULL,
    "contextType" public."ContextType" NOT NULL,
    entity_id text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.user_contexts OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: workflow_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_records (
    id character varying(7) DEFAULT concat('WR', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    record_id text NOT NULL,
    workflow_id text NOT NULL,
    current_state_id text NOT NULL,
    assignee_id text,
    "assigneeType" public."AssigneeType",
    due_date timestamp(3) without time zone,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.workflow_records OWNER TO postgres;

--
-- Name: workflow_state_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_state_history (
    id text NOT NULL,
    workflow_record_id text NOT NULL,
    state_id text NOT NULL,
    assignee_id text,
    "assigneeType" public."AssigneeType",
    entered_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    exited_at timestamp(3) without time zone,
    duration integer,
    metadata jsonb,
    changed_by text NOT NULL
);


ALTER TABLE public.workflow_state_history OWNER TO postgres;

--
-- Name: workflow_states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_states (
    id character varying(7) DEFAULT concat('WS', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    workflow_id text NOT NULL,
    name text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    is_initial boolean DEFAULT false NOT NULL,
    is_final boolean DEFAULT false NOT NULL,
    auto_transition boolean DEFAULT false NOT NULL,
    "assigneeType" public."AssigneeType",
    assignee_id text,
    transition_rules jsonb,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.workflow_states OWNER TO postgres;

--
-- Name: workflow_transition_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_transition_history (
    id text NOT NULL,
    transition_id text NOT NULL,
    workflow_record_id text NOT NULL,
    triggered_by text NOT NULL,
    triggered_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    success public."GenericStatus" DEFAULT 'SUCCESS'::public."GenericStatus" NOT NULL,
    error text,
    metadata jsonb
);


ALTER TABLE public.workflow_transition_history OWNER TO postgres;

--
-- Name: workflow_transitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_transitions (
    id character varying(7) DEFAULT concat('WT', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    workflow_id text NOT NULL,
    from_state_id text NOT NULL,
    to_state_id text NOT NULL,
    conditions jsonb,
    actions jsonb,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.workflow_transitions OWNER TO postgres;

--
-- Name: workflow_trigger_executions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_trigger_executions (
    id text NOT NULL,
    trigger_id text NOT NULL,
    started_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    finished_at timestamp(3) without time zone,
    status public."GenericStatus" DEFAULT 'PENDING'::public."GenericStatus" NOT NULL,
    result jsonb,
    error text,
    metadata jsonb,
    triggered_by text
);


ALTER TABLE public.workflow_trigger_executions OWNER TO postgres;

--
-- Name: workflow_triggers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflow_triggers (
    id character varying(7) DEFAULT concat('WTG', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    workflow_id text NOT NULL,
    name text NOT NULL,
    type public."TriggerType" NOT NULL,
    conditions jsonb,
    actions jsonb,
    schedule text,
    metadata jsonb,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.workflow_triggers OWNER TO postgres;

--
-- Name: workflows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workflows (
    id character varying(7) DEFAULT concat('W', SUBSTRING(md5((gen_random_uuid())::text) FROM 1 FOR 6)) NOT NULL,
    module_id text,
    name text NOT NULL,
    description text,
    version integer DEFAULT 1 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp(3) without time zone,
    metadata jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    created_by text NOT NULL,
    updated_by text
);


ALTER TABLE public.workflows OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


SET default_table_access_method = heap;

--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


SET default_table_access_method = orioledb;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT id,
    name,
    description,
    secret,
        CASE
            WHEN (secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secret, 'base64'::text), convert_to(((((id)::text || description) || (created_at)::text) || (updated_at)::text), 'utf8'::name), key_id, nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    key_id,
    nonce,
    created_at,
    updated_at
   FROM vault.secrets;


ALTER VIEW vault.decrypted_secrets OWNER TO supabase_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Record Record_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Record"
    ADD CONSTRAINT "Record_pkey" PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: Entity clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Entity"
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: component_library component_library_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component_library
    ADD CONSTRAINT component_library_pkey PRIMARY KEY (id);


--
-- Name: container_node_names container_node_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.container_node_names
    ADD CONSTRAINT container_node_names_pkey PRIMARY KEY (id);


--
-- Name: context_permissions context_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.context_permissions
    ADD CONSTRAINT context_permissions_pkey PRIMARY KEY (id);


--
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (id);


--
-- Name: group_permissions group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT group_permissions_pkey PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: integration_logs integration_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.integration_logs
    ADD CONSTRAINT integration_logs_pkey PRIMARY KEY (id);


--
-- Name: module_components module_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_components
    ADD CONSTRAINT module_components_pkey PRIMARY KEY (id);


--
-- Name: module_dependencies module_dependencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_dependencies
    ADD CONSTRAINT module_dependencies_pkey PRIMARY KEY (id);


--
-- Name: module_instances module_instances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_instances
    ADD CONSTRAINT module_instances_pkey PRIMARY KEY (id);


--
-- Name: module_organizational_scopes module_organizational_scopes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_organizational_scopes
    ADD CONSTRAINT module_organizational_scopes_pkey PRIMARY KEY (id);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- Name: node_hierarchy_rules node_hierarchy_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.node_hierarchy_rules
    ADD CONSTRAINT node_hierarchy_rules_pkey PRIMARY KEY (id);


--
-- Name: node_names node_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.node_names
    ADD CONSTRAINT node_names_pkey PRIMARY KEY (id);


--
-- Name: organizational_units organizational_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizational_units
    ADD CONSTRAINT organizational_units_pkey PRIMARY KEY (id);


--
-- Name: performance_logs performance_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_logs
    ADD CONSTRAINT performance_logs_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: provider_hierarchies provider_hierarchies_client_id_provider_id_parent_provider_id_k; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchies
    ADD CONSTRAINT provider_hierarchies_client_id_provider_id_parent_provider_id_k UNIQUE (client_id, provider_id, parent_provider_id);


--
-- Name: provider_hierarchies provider_hierarchies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchies
    ADD CONSTRAINT provider_hierarchies_pkey PRIMARY KEY (id);


--
-- Name: provider_hierarchy_cache provider_hierarchy_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_cache
    ADD CONSTRAINT provider_hierarchy_cache_pkey PRIMARY KEY (id);


--
-- Name: provider_hierarchy_history provider_hierarchy_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_history
    ADD CONSTRAINT provider_hierarchy_history_pkey PRIMARY KEY (id);


--
-- Name: provider_hierarchy_rules provider_hierarchy_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_rules
    ADD CONSTRAINT provider_hierarchy_rules_pkey PRIMARY KEY (id);


--
-- Name: record_files record_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_files
    ADD CONSTRAINT record_files_pkey PRIMARY KEY (id);


--
-- Name: record_history record_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_history
    ADD CONSTRAINT record_history_pkey PRIMARY KEY (id);


--
-- Name: record_organizational_units record_organizational_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_organizational_units
    ADD CONSTRAINT record_organizational_units_pkey PRIMARY KEY (id);


--
-- Name: record_templates record_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_templates
    ADD CONSTRAINT record_templates_pkey PRIMARY KEY (id);


--
-- Name: record_values record_values_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_values
    ADD CONSTRAINT record_values_pkey PRIMARY KEY (id);


--
-- Name: security_logs security_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.security_logs
    ADD CONSTRAINT security_logs_pkey PRIMARY KEY (id);


--
-- Name: system_logs system_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_logs
    ADD CONSTRAINT system_logs_pkey PRIMARY KEY (id);


--
-- Name: template_fields template_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_fields
    ADD CONSTRAINT template_fields_pkey PRIMARY KEY (id);


--
-- Name: template_organizational_scopes template_organizational_scopes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_organizational_scopes
    ADD CONSTRAINT template_organizational_scopes_pkey PRIMARY KEY (id);


--
-- Name: unit_container_items unit_container_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_container_items
    ADD CONSTRAINT unit_container_items_pkey PRIMARY KEY (id);


--
-- Name: unit_containers unit_containers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_containers
    ADD CONSTRAINT unit_containers_pkey PRIMARY KEY (id);


--
-- Name: unit_hierarchies unit_hierarchies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_hierarchies
    ADD CONSTRAINT unit_hierarchies_pkey PRIMARY KEY (id);


--
-- Name: user_contexts user_contexts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_contexts
    ADD CONSTRAINT user_contexts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: workflow_records workflow_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_records
    ADD CONSTRAINT workflow_records_pkey PRIMARY KEY (id);


--
-- Name: workflow_state_history workflow_state_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_state_history
    ADD CONSTRAINT workflow_state_history_pkey PRIMARY KEY (id);


--
-- Name: workflow_states workflow_states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_states
    ADD CONSTRAINT workflow_states_pkey PRIMARY KEY (id);


--
-- Name: workflow_transition_history workflow_transition_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transition_history
    ADD CONSTRAINT workflow_transition_history_pkey PRIMARY KEY (id);


--
-- Name: workflow_transitions workflow_transitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transitions
    ADD CONSTRAINT workflow_transitions_pkey PRIMARY KEY (id);


--
-- Name: workflow_trigger_executions workflow_trigger_executions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_trigger_executions
    ADD CONSTRAINT workflow_trigger_executions_pkey PRIMARY KEY (id);


--
-- Name: workflow_triggers workflow_triggers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_triggers
    ADD CONSTRAINT workflow_triggers_pkey PRIMARY KEY (id);


--
-- Name: workflows workflows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflows
    ADD CONSTRAINT workflows_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: audit_logs_actionType_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "audit_logs_actionType_idx" ON public.audit_logs USING btree ("actionType");


--
-- Name: audit_logs_action_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_action_idx ON public.audit_logs USING btree (action);


--
-- Name: audit_logs_context_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_context_id_idx ON public.audit_logs USING btree (context_id);


--
-- Name: audit_logs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_created_at_idx ON public.audit_logs USING btree (created_at);


--
-- Name: audit_logs_entity_type_entity_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_entity_type_entity_id_idx ON public.audit_logs USING btree (entity_type, entity_id);


--
-- Name: audit_logs_hierarchy_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_hierarchy_id_idx ON public.audit_logs USING btree (hierarchy_id);


--
-- Name: audit_logs_new_data_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_new_data_idx ON public.audit_logs USING gin (new_data);


--
-- Name: audit_logs_previous_data_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_previous_data_idx ON public.audit_logs USING gin (previous_data);


--
-- Name: audit_logs_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_status_idx ON public.audit_logs USING btree (status);


--
-- Name: audit_logs_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_user_id_idx ON public.audit_logs USING btree (user_id);


--
-- Name: clients_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clients_deleted_at_idx ON public."Entity" USING btree (deleted_at);


--
-- Name: component_library_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_library_deleted_at_idx ON public.component_library USING btree (deleted_at);


--
-- Name: component_library_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_library_is_active_idx ON public.component_library USING btree (is_active);


--
-- Name: component_library_is_latest_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_library_is_latest_version_idx ON public.component_library USING btree (is_latest_version);


--
-- Name: component_library_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX component_library_name_key ON public.component_library USING btree (name);


--
-- Name: component_library_name_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_library_name_version_idx ON public.component_library USING btree (name, version);


--
-- Name: component_library_type_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_library_type_category_idx ON public.component_library USING btree (type, category);


--
-- Name: container_node_names_container_id_node_name_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX container_node_names_container_id_node_name_id_key ON public.container_node_names USING btree (container_id, node_name_id);


--
-- Name: container_node_names_container_id_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX container_node_names_container_id_order_idx ON public.container_node_names USING btree (container_id, "order");


--
-- Name: container_node_names_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX container_node_names_deleted_at_idx ON public.container_node_names USING btree (deleted_at);


--
-- Name: container_node_names_node_name_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX container_node_names_node_name_id_idx ON public.container_node_names USING btree (node_name_id);


--
-- Name: context_permissions_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX context_permissions_deleted_at_idx ON public.context_permissions USING btree (deleted_at);


--
-- Name: context_permissions_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "context_permissions_isActive_idx" ON public.context_permissions USING btree ("isActive");


--
-- Name: context_permissions_scope_type_scope_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX context_permissions_scope_type_scope_id_idx ON public.context_permissions USING btree (scope_type, scope_id);


--
-- Name: context_permissions_user_context_id_permission_id_scope_typ_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX context_permissions_user_context_id_permission_id_scope_typ_key ON public.context_permissions USING btree (user_context_id, permission_id, scope_type, scope_id);


--
-- Name: group_members_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX group_members_deleted_at_idx ON public.group_members USING btree (deleted_at);


--
-- Name: group_members_group_id_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX group_members_group_id_user_id_key ON public.group_members USING btree (group_id, user_id);


--
-- Name: group_members_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX group_members_is_active_idx ON public.group_members USING btree (is_active);


--
-- Name: group_members_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX group_members_user_id_idx ON public.group_members USING btree (user_id);


--
-- Name: group_permissions_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX group_permissions_deleted_at_idx ON public.group_permissions USING btree (deleted_at);


--
-- Name: group_permissions_group_id_permission_id_scope_type_scope_i_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX group_permissions_group_id_permission_id_scope_type_scope_i_key ON public.group_permissions USING btree (group_id, permission_id, scope_type, scope_id);


--
-- Name: group_permissions_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "group_permissions_isActive_idx" ON public.group_permissions USING btree ("isActive");


--
-- Name: group_permissions_scope_type_scope_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX group_permissions_scope_type_scope_id_idx ON public.group_permissions USING btree (scope_type, scope_id);


--
-- Name: groups_contextType_entity_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "groups_contextType_entity_id_idx" ON public.groups USING btree ("contextType", entity_id);


--
-- Name: groups_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX groups_deleted_at_idx ON public.groups USING btree (deleted_at);


--
-- Name: groups_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX groups_is_active_idx ON public.groups USING btree (is_active);


--
-- Name: integration_logs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX integration_logs_created_at_idx ON public.integration_logs USING btree (created_at);


--
-- Name: integration_logs_direction_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX integration_logs_direction_idx ON public.integration_logs USING btree (direction);


--
-- Name: integration_logs_integration_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX integration_logs_integration_type_idx ON public.integration_logs USING btree (integration_type);


--
-- Name: integration_logs_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX integration_logs_status_idx ON public.integration_logs USING btree (status);


--
-- Name: module_components_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_components_deleted_at_idx ON public.module_components USING btree (deleted_at);


--
-- Name: module_components_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_components_is_active_idx ON public.module_components USING btree (is_active);


--
-- Name: module_components_is_required_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_components_is_required_idx ON public.module_components USING btree (is_required);


--
-- Name: module_components_module_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_components_module_id_idx ON public.module_components USING btree (module_id);


--
-- Name: module_components_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_components_order_idx ON public.module_components USING btree ("order");


--
-- Name: module_components_type_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_components_type_category_idx ON public.module_components USING btree (type, category);


--
-- Name: module_dependencies_module_id_dependency_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX module_dependencies_module_id_dependency_id_key ON public.module_dependencies USING btree (module_id, dependency_id);


--
-- Name: module_instances_client_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_instances_client_id_idx ON public.module_instances USING btree (client_id);


--
-- Name: module_instances_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_instances_deleted_at_idx ON public.module_instances USING btree (deleted_at);


--
-- Name: module_instances_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX module_instances_is_active_idx ON public.module_instances USING btree (is_active);


--
-- Name: module_instances_module_id_client_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX module_instances_module_id_client_id_key ON public.module_instances USING btree (module_id, client_id);


--
-- Name: module_organizational_scopes_module_id_scopeType_scope_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "module_organizational_scopes_module_id_scopeType_scope_id_key" ON public.module_organizational_scopes USING btree (module_id, "scopeType", scope_id);


--
-- Name: modules_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX modules_deleted_at_idx ON public.modules USING btree (deleted_at);


--
-- Name: modules_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX modules_is_active_idx ON public.modules USING btree (is_active);


--
-- Name: modules_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX modules_slug_idx ON public.modules USING btree (slug);


--
-- Name: modules_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX modules_slug_key ON public.modules USING btree (slug);


--
-- Name: modules_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX modules_version_idx ON public.modules USING btree (version);


--
-- Name: node_hierarchy_rules_child_node_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX node_hierarchy_rules_child_node_id_idx ON public.node_hierarchy_rules USING btree (child_node_id);


--
-- Name: node_hierarchy_rules_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX node_hierarchy_rules_deleted_at_idx ON public.node_hierarchy_rules USING btree (deleted_at);


--
-- Name: node_hierarchy_rules_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX node_hierarchy_rules_is_active_idx ON public.node_hierarchy_rules USING btree (is_active);


--
-- Name: node_hierarchy_rules_parent_node_id_child_node_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX node_hierarchy_rules_parent_node_id_child_node_id_key ON public.node_hierarchy_rules USING btree (parent_node_id, child_node_id);


--
-- Name: node_names_client_id_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX node_names_client_id_order_idx ON public.node_names USING btree (client_id, "order");


--
-- Name: node_names_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX node_names_deleted_at_idx ON public.node_names USING btree (deleted_at);


--
-- Name: node_names_name_client_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX node_names_name_client_id_key ON public.node_names USING btree (name, client_id);


--
-- Name: organizational_units_client_id_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organizational_units_client_id_type_idx ON public.organizational_units USING btree (client_id, type);


--
-- Name: organizational_units_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organizational_units_deleted_at_idx ON public.organizational_units USING btree (deleted_at);


--
-- Name: organizational_units_depth_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organizational_units_depth_idx ON public.organizational_units USING btree (depth);


--
-- Name: organizational_units_full_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organizational_units_full_path_idx ON public.organizational_units USING btree (full_path);


--
-- Name: organizational_units_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organizational_units_is_active_idx ON public.organizational_units USING btree (is_active);


--
-- Name: organizational_units_node_name_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organizational_units_node_name_id_idx ON public.organizational_units USING btree (node_name_id);


--
-- Name: performance_logs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX performance_logs_created_at_idx ON public.performance_logs USING btree (created_at);


--
-- Name: performance_logs_duration_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX performance_logs_duration_idx ON public.performance_logs USING btree (duration);


--
-- Name: performance_logs_operation_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX performance_logs_operation_idx ON public.performance_logs USING btree (operation);


--
-- Name: performance_logs_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX performance_logs_status_idx ON public.performance_logs USING btree (status);


--
-- Name: permissions_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX permissions_deleted_at_idx ON public.permissions USING btree (deleted_at);


--
-- Name: permissions_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX permissions_is_active_idx ON public.permissions USING btree (is_active);


--
-- Name: permissions_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX permissions_slug_idx ON public.permissions USING btree (slug);


--
-- Name: permissions_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX permissions_slug_key ON public.permissions USING btree (slug);


--
-- Name: provider_hierarchies_client_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_client_id_idx ON public.provider_hierarchies USING btree (client_id);


--
-- Name: provider_hierarchies_hierarchy_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_hierarchy_path_idx ON public.provider_hierarchies USING btree (hierarchy_path);


--
-- Name: provider_hierarchies_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_is_active_idx ON public.provider_hierarchies USING btree (is_active);


--
-- Name: provider_hierarchies_level_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_level_idx ON public.provider_hierarchies USING btree (level);


--
-- Name: provider_hierarchies_parent_provider_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_parent_provider_id_idx ON public.provider_hierarchies USING btree (parent_provider_id);


--
-- Name: provider_hierarchies_provider_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_provider_id_idx ON public.provider_hierarchies USING btree (provider_id);


--
-- Name: provider_hierarchies_root_provider_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_root_provider_id_idx ON public.provider_hierarchies USING btree (root_provider_id);


--
-- Name: provider_hierarchies_valid_from_valid_to_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_valid_from_valid_to_idx ON public.provider_hierarchies USING btree (valid_from, valid_to);


--
-- Name: provider_hierarchies_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchies_version_idx ON public.provider_hierarchies USING btree (version);


--
-- Name: provider_hierarchy_cache_depth_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_cache_depth_idx ON public.provider_hierarchy_cache USING btree (depth);


--
-- Name: provider_hierarchy_cache_hierarchy_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX provider_hierarchy_cache_hierarchy_id_key ON public.provider_hierarchy_cache USING btree (hierarchy_id);


--
-- Name: provider_hierarchy_history_changed_by_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_history_changed_by_idx ON public.provider_hierarchy_history USING btree (changed_by);


--
-- Name: provider_hierarchy_history_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_history_created_at_idx ON public.provider_hierarchy_history USING btree (created_at);


--
-- Name: provider_hierarchy_history_hierarchy_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_history_hierarchy_id_idx ON public.provider_hierarchy_history USING btree (hierarchy_id);


--
-- Name: provider_hierarchy_history_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_history_version_idx ON public.provider_hierarchy_history USING btree (version);


--
-- Name: provider_hierarchy_rules_client_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_rules_client_id_idx ON public.provider_hierarchy_rules USING btree (client_id);


--
-- Name: provider_hierarchy_rules_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_rules_is_active_idx ON public.provider_hierarchy_rules USING btree (is_active);


--
-- Name: provider_hierarchy_rules_priority_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX provider_hierarchy_rules_priority_idx ON public.provider_hierarchy_rules USING btree (priority);


--
-- Name: record_files_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_files_deleted_at_idx ON public.record_files USING btree (deleted_at);


--
-- Name: record_files_field_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_files_field_id_idx ON public.record_files USING btree (field_id);


--
-- Name: record_files_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_files_is_active_idx ON public.record_files USING btree (is_active);


--
-- Name: record_files_record_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_files_record_id_idx ON public.record_files USING btree (record_id);


--
-- Name: record_history_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_history_created_at_idx ON public.record_history USING btree (created_at);


--
-- Name: record_history_created_by_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_history_created_by_idx ON public.record_history USING btree (created_by);


--
-- Name: record_history_record_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_history_record_id_idx ON public.record_history USING btree (record_id);


--
-- Name: record_history_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_history_version_idx ON public.record_history USING btree (version);


--
-- Name: record_organizational_units_record_id_organizational_unit_i_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX record_organizational_units_record_id_organizational_unit_i_key ON public.record_organizational_units USING btree (record_id, organizational_unit_id);


--
-- Name: record_templates_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_templates_deleted_at_idx ON public.record_templates USING btree (deleted_at);


--
-- Name: record_templates_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_templates_is_active_idx ON public.record_templates USING btree (is_active);


--
-- Name: record_templates_module_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_templates_module_id_idx ON public.record_templates USING btree (module_id);


--
-- Name: record_templates_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX record_templates_slug_key ON public.record_templates USING btree (slug);


--
-- Name: record_templates_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_templates_version_idx ON public.record_templates USING btree (version);


--
-- Name: record_values_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_values_deleted_at_idx ON public.record_values USING btree (deleted_at);


--
-- Name: record_values_field_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_values_field_id_idx ON public.record_values USING btree (field_id);


--
-- Name: record_values_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_values_is_active_idx ON public.record_values USING btree (is_active);


--
-- Name: record_values_record_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX record_values_record_id_idx ON public.record_values USING btree (record_id);


--
-- Name: security_logs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX security_logs_created_at_idx ON public.security_logs USING btree (created_at);


--
-- Name: security_logs_eventType_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "security_logs_eventType_idx" ON public.security_logs USING btree ("eventType");


--
-- Name: security_logs_ip_address_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX security_logs_ip_address_idx ON public.security_logs USING btree (ip_address);


--
-- Name: security_logs_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX security_logs_status_idx ON public.security_logs USING btree (status);


--
-- Name: security_logs_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX security_logs_user_id_idx ON public.security_logs USING btree (user_id);


--
-- Name: system_logs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX system_logs_created_at_idx ON public.system_logs USING btree (created_at);


--
-- Name: system_logs_level_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX system_logs_level_idx ON public.system_logs USING btree (level);


--
-- Name: system_logs_source_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX system_logs_source_idx ON public.system_logs USING btree (source);


--
-- Name: template_fields_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_fields_deleted_at_idx ON public.template_fields USING btree (deleted_at);


--
-- Name: template_fields_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_fields_is_active_idx ON public.template_fields USING btree (is_active);


--
-- Name: template_fields_is_required_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_fields_is_required_idx ON public.template_fields USING btree (is_required);


--
-- Name: template_fields_template_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_fields_template_id_idx ON public.template_fields USING btree (template_id);


--
-- Name: template_fields_template_id_label_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX template_fields_template_id_label_key ON public.template_fields USING btree (template_id, label);


--
-- Name: template_fields_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_fields_type_idx ON public.template_fields USING btree (type);


--
-- Name: template_organizational_scopes_template_id_scopeType_scope__key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "template_organizational_scopes_template_id_scopeType_scope__key" ON public.template_organizational_scopes USING btree (template_id, "scopeType", scope_id);


--
-- Name: unique_client_root; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_client_root ON public.node_names USING btree (client_id) WHERE ((is_root = true) AND (deleted_at IS NULL));


--
-- Name: unit_container_items_container_id_unit_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_container_items_container_id_unit_id_idx ON public.unit_container_items USING btree (container_id, unit_id);


--
-- Name: unit_container_items_container_id_unit_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unit_container_items_container_id_unit_id_key ON public.unit_container_items USING btree (container_id, unit_id);


--
-- Name: unit_container_items_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_container_items_deleted_at_idx ON public.unit_container_items USING btree (deleted_at);


--
-- Name: unit_container_items_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_container_items_is_active_idx ON public.unit_container_items USING btree (is_active);


--
-- Name: unit_container_items_unit_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_container_items_unit_id_idx ON public.unit_container_items USING btree (unit_id);


--
-- Name: unit_containers_client_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_containers_client_id_idx ON public.unit_containers USING btree (client_id);


--
-- Name: unit_containers_container_key_client_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unit_containers_container_key_client_id_key ON public.unit_containers USING btree (container_key, client_id);


--
-- Name: unit_containers_container_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unit_containers_container_key_key ON public.unit_containers USING btree (container_key);


--
-- Name: unit_containers_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_containers_deleted_at_idx ON public.unit_containers USING btree (deleted_at);


--
-- Name: unit_containers_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_containers_is_active_idx ON public.unit_containers USING btree (is_active);


--
-- Name: unit_hierarchies_child_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_child_id_idx ON public.unit_hierarchies USING btree (child_id);


--
-- Name: unit_hierarchies_child_id_parent_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unit_hierarchies_child_id_parent_id_key ON public.unit_hierarchies USING btree (child_id, parent_id);


--
-- Name: unit_hierarchies_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_deleted_at_idx ON public.unit_hierarchies USING btree (deleted_at);


--
-- Name: unit_hierarchies_depth_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_depth_idx ON public.unit_hierarchies USING btree (depth);


--
-- Name: unit_hierarchies_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_is_active_idx ON public.unit_hierarchies USING btree (is_active);


--
-- Name: unit_hierarchies_is_primary_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_is_primary_idx ON public.unit_hierarchies USING btree (is_primary);


--
-- Name: unit_hierarchies_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_parent_id_idx ON public.unit_hierarchies USING btree (parent_id);


--
-- Name: unit_hierarchies_path_from_root_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX unit_hierarchies_path_from_root_idx ON public.unit_hierarchies USING btree (path_from_root);


--
-- Name: user_contexts_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_contexts_deleted_at_idx ON public.user_contexts USING btree (deleted_at);


--
-- Name: user_contexts_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_contexts_is_active_idx ON public.user_contexts USING btree (is_active);


--
-- Name: user_contexts_metadata_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_contexts_metadata_idx ON public.user_contexts USING gin (metadata);


--
-- Name: user_contexts_user_id_contextType_entity_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "user_contexts_user_id_contextType_entity_id_key" ON public.user_contexts USING btree (user_id, "contextType", entity_id);


--
-- Name: user_contexts_user_id_contextType_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "user_contexts_user_id_contextType_idx" ON public.user_contexts USING btree (user_id, "contextType");


--
-- Name: users_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_deleted_at_idx ON public.users USING btree (deleted_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_is_active_idx ON public.users USING btree (is_active);


--
-- Name: workflow_records_assignee_id_assigneeType_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "workflow_records_assignee_id_assigneeType_idx" ON public.workflow_records USING btree (assignee_id, "assigneeType");


--
-- Name: workflow_records_current_state_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_records_current_state_id_idx ON public.workflow_records USING btree (current_state_id);


--
-- Name: workflow_records_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_records_deleted_at_idx ON public.workflow_records USING btree (deleted_at);


--
-- Name: workflow_records_due_date_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_records_due_date_idx ON public.workflow_records USING btree (due_date);


--
-- Name: workflow_records_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_records_is_active_idx ON public.workflow_records USING btree (is_active);


--
-- Name: workflow_records_record_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX workflow_records_record_id_key ON public.workflow_records USING btree (record_id);


--
-- Name: workflow_state_history_entered_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_state_history_entered_at_idx ON public.workflow_state_history USING btree (entered_at);


--
-- Name: workflow_state_history_state_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_state_history_state_id_idx ON public.workflow_state_history USING btree (state_id);


--
-- Name: workflow_state_history_workflow_record_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_state_history_workflow_record_id_idx ON public.workflow_state_history USING btree (workflow_record_id);


--
-- Name: workflow_states_assigneeType_assignee_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "workflow_states_assigneeType_assignee_id_idx" ON public.workflow_states USING btree ("assigneeType", assignee_id);


--
-- Name: workflow_states_auto_transition_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_states_auto_transition_idx ON public.workflow_states USING btree (auto_transition);


--
-- Name: workflow_states_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_states_deleted_at_idx ON public.workflow_states USING btree (deleted_at);


--
-- Name: workflow_states_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_states_is_active_idx ON public.workflow_states USING btree (is_active);


--
-- Name: workflow_states_workflow_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_states_workflow_id_idx ON public.workflow_states USING btree (workflow_id);


--
-- Name: workflow_transition_history_transition_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transition_history_transition_id_idx ON public.workflow_transition_history USING btree (transition_id);


--
-- Name: workflow_transition_history_triggered_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transition_history_triggered_at_idx ON public.workflow_transition_history USING btree (triggered_at);


--
-- Name: workflow_transition_history_workflow_record_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transition_history_workflow_record_id_idx ON public.workflow_transition_history USING btree (workflow_record_id);


--
-- Name: workflow_transitions_conditions_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transitions_conditions_idx ON public.workflow_transitions USING gin (conditions);


--
-- Name: workflow_transitions_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transitions_deleted_at_idx ON public.workflow_transitions USING btree (deleted_at);


--
-- Name: workflow_transitions_from_state_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transitions_from_state_id_idx ON public.workflow_transitions USING btree (from_state_id);


--
-- Name: workflow_transitions_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transitions_is_active_idx ON public.workflow_transitions USING btree (is_active);


--
-- Name: workflow_transitions_to_state_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_transitions_to_state_id_idx ON public.workflow_transitions USING btree (to_state_id);


--
-- Name: workflow_transitions_workflow_id_from_state_id_to_state_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX workflow_transitions_workflow_id_from_state_id_to_state_id_key ON public.workflow_transitions USING btree (workflow_id, from_state_id, to_state_id);


--
-- Name: workflow_trigger_executions_started_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_trigger_executions_started_at_idx ON public.workflow_trigger_executions USING btree (started_at);


--
-- Name: workflow_trigger_executions_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_trigger_executions_status_idx ON public.workflow_trigger_executions USING btree (status);


--
-- Name: workflow_trigger_executions_trigger_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_trigger_executions_trigger_id_idx ON public.workflow_trigger_executions USING btree (trigger_id);


--
-- Name: workflow_triggers_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_triggers_deleted_at_idx ON public.workflow_triggers USING btree (deleted_at);


--
-- Name: workflow_triggers_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_triggers_is_active_idx ON public.workflow_triggers USING btree (is_active);


--
-- Name: workflow_triggers_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_triggers_type_idx ON public.workflow_triggers USING btree (type);


--
-- Name: workflow_triggers_workflow_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflow_triggers_workflow_id_idx ON public.workflow_triggers USING btree (workflow_id);


--
-- Name: workflows_deleted_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflows_deleted_at_idx ON public.workflows USING btree (deleted_at);


--
-- Name: workflows_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflows_is_active_idx ON public.workflows USING btree (is_active);


--
-- Name: workflows_module_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflows_module_id_idx ON public.workflows USING btree (module_id);


--
-- Name: workflows_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workflows_version_idx ON public.workflows USING btree (version);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: node_names node_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER node_trigger BEFORE INSERT OR UPDATE ON public.node_names FOR EACH ROW EXECUTE FUNCTION public.manage_node();


--
-- Name: Entity trigger_create_client_root_unit; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_create_client_root_unit AFTER INSERT ON public."Entity" FOR EACH ROW EXECUTE FUNCTION public.create_client_root_unit();


--
-- Name: Entity trigger_set_entity_id; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_set_entity_id BEFORE INSERT ON public."Entity" FOR EACH ROW EXECUTE FUNCTION public.set_entity_id();


--
-- Name: organizational_units update_node_unit_count_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_node_unit_count_trigger AFTER INSERT OR DELETE OR UPDATE ON public.organizational_units FOR EACH ROW EXECUTE FUNCTION public.update_node_unit_count();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: Record Record_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Record"
    ADD CONSTRAINT "Record_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Record Record_organizational_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Record"
    ADD CONSTRAINT "Record_organizational_unit_id_fkey" FOREIGN KEY (organizational_unit_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Record Record_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Record"
    ADD CONSTRAINT "Record_template_id_fkey" FOREIGN KEY (template_id) REFERENCES public.record_templates(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Record Record_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Record"
    ADD CONSTRAINT "Record_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: container_node_names container_node_names_container_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.container_node_names
    ADD CONSTRAINT container_node_names_container_id_fkey FOREIGN KEY (container_id) REFERENCES public.unit_containers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: container_node_names container_node_names_node_name_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.container_node_names
    ADD CONSTRAINT container_node_names_node_name_id_fkey FOREIGN KEY (node_name_id) REFERENCES public.node_names(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: context_permissions context_permissions_org_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.context_permissions
    ADD CONSTRAINT context_permissions_org_unit_fkey FOREIGN KEY (scope_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: context_permissions context_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.context_permissions
    ADD CONSTRAINT context_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: context_permissions context_permissions_unit_container_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.context_permissions
    ADD CONSTRAINT context_permissions_unit_container_fkey FOREIGN KEY (scope_id) REFERENCES public.unit_containers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: context_permissions context_permissions_user_context_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.context_permissions
    ADD CONSTRAINT context_permissions_user_context_id_fkey FOREIGN KEY (user_context_id) REFERENCES public.user_contexts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: group_members group_members_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: group_members group_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: group_permissions group_permissions_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT group_permissions_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: group_permissions group_permissions_org_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT group_permissions_org_unit_fkey FOREIGN KEY (scope_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: group_permissions group_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT group_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: group_permissions group_permissions_unit_container_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT group_permissions_unit_container_fkey FOREIGN KEY (scope_id) REFERENCES public.unit_containers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_components module_components_library_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_components
    ADD CONSTRAINT module_components_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.component_library(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: module_components module_components_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_components
    ADD CONSTRAINT module_components_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_dependencies module_dependencies_dependency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_dependencies
    ADD CONSTRAINT module_dependencies_dependency_id_fkey FOREIGN KEY (dependency_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_dependencies module_dependencies_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_dependencies
    ADD CONSTRAINT module_dependencies_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_instances module_instances_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_instances
    ADD CONSTRAINT module_instances_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_instances module_instances_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_instances
    ADD CONSTRAINT module_instances_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: module_organizational_scopes module_organizational_scopes_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_organizational_scopes
    ADD CONSTRAINT module_organizational_scopes_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_organizational_scopes module_scopes_node_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_organizational_scopes
    ADD CONSTRAINT module_scopes_node_name_fkey FOREIGN KEY (scope_id) REFERENCES public.node_names(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_organizational_scopes module_scopes_org_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_organizational_scopes
    ADD CONSTRAINT module_scopes_org_unit_fkey FOREIGN KEY (scope_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: module_organizational_scopes module_scopes_unit_container_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_organizational_scopes
    ADD CONSTRAINT module_scopes_unit_container_fkey FOREIGN KEY (scope_id) REFERENCES public.unit_containers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: node_hierarchy_rules node_hierarchy_rules_child_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.node_hierarchy_rules
    ADD CONSTRAINT node_hierarchy_rules_child_node_id_fkey FOREIGN KEY (child_node_id) REFERENCES public.node_names(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: node_hierarchy_rules node_hierarchy_rules_parent_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.node_hierarchy_rules
    ADD CONSTRAINT node_hierarchy_rules_parent_node_id_fkey FOREIGN KEY (parent_node_id) REFERENCES public.node_names(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: organizational_units organizational_units_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizational_units
    ADD CONSTRAINT organizational_units_client_id_fkey FOREIGN KEY (client_id) REFERENCES public."Entity"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: organizational_units organizational_units_node_name_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizational_units
    ADD CONSTRAINT organizational_units_node_name_id_fkey FOREIGN KEY (node_name_id) REFERENCES public.node_names(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: provider_hierarchies provider_hierarchies_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchies
    ADD CONSTRAINT provider_hierarchies_client_id_fkey FOREIGN KEY (client_id) REFERENCES public."Entity"(id);


--
-- Name: provider_hierarchies provider_hierarchies_parent_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchies
    ADD CONSTRAINT provider_hierarchies_parent_provider_id_fkey FOREIGN KEY (parent_provider_id) REFERENCES public."Entity"(id);


--
-- Name: provider_hierarchies provider_hierarchies_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchies
    ADD CONSTRAINT provider_hierarchies_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public."Entity"(id);


--
-- Name: provider_hierarchies provider_hierarchies_root_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchies
    ADD CONSTRAINT provider_hierarchies_root_provider_id_fkey FOREIGN KEY (root_provider_id) REFERENCES public."Entity"(id);


--
-- Name: provider_hierarchy_cache provider_hierarchy_cache_hierarchy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_cache
    ADD CONSTRAINT provider_hierarchy_cache_hierarchy_id_fkey FOREIGN KEY (hierarchy_id) REFERENCES public.provider_hierarchies(id);


--
-- Name: provider_hierarchy_history provider_hierarchy_history_changed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_history
    ADD CONSTRAINT provider_hierarchy_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.users(id);


--
-- Name: provider_hierarchy_history provider_hierarchy_history_hierarchy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_history
    ADD CONSTRAINT provider_hierarchy_history_hierarchy_id_fkey FOREIGN KEY (hierarchy_id) REFERENCES public.provider_hierarchies(id);


--
-- Name: provider_hierarchy_rules provider_hierarchy_rules_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_hierarchy_rules
    ADD CONSTRAINT provider_hierarchy_rules_client_id_fkey FOREIGN KEY (client_id) REFERENCES public."Entity"(id);


--
-- Name: record_files record_files_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_files
    ADD CONSTRAINT record_files_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.template_fields(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_files record_files_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_files
    ADD CONSTRAINT record_files_record_id_fkey FOREIGN KEY (record_id) REFERENCES public."Record"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_history record_history_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_history
    ADD CONSTRAINT record_history_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_history record_history_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_history
    ADD CONSTRAINT record_history_record_id_fkey FOREIGN KEY (record_id) REFERENCES public."Record"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_organizational_units record_organizational_units_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_organizational_units
    ADD CONSTRAINT record_organizational_units_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: record_organizational_units record_organizational_units_organizational_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_organizational_units
    ADD CONSTRAINT record_organizational_units_organizational_unit_id_fkey FOREIGN KEY (organizational_unit_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_organizational_units record_organizational_units_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_organizational_units
    ADD CONSTRAINT record_organizational_units_record_id_fkey FOREIGN KEY (record_id) REFERENCES public."Record"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_templates record_templates_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_templates
    ADD CONSTRAINT record_templates_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_values record_values_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_values
    ADD CONSTRAINT record_values_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.template_fields(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: record_values record_values_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_values
    ADD CONSTRAINT record_values_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: record_values record_values_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_values
    ADD CONSTRAINT record_values_record_id_fkey FOREIGN KEY (record_id) REFERENCES public."Record"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: record_values record_values_templateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_values
    ADD CONSTRAINT "record_values_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES public.record_templates(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: security_logs security_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.security_logs
    ADD CONSTRAINT security_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: system_logs system_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_logs
    ADD CONSTRAINT system_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: template_fields template_fields_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_fields
    ADD CONSTRAINT template_fields_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.record_templates(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: template_organizational_scopes template_organizational_scopes_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_organizational_scopes
    ADD CONSTRAINT template_organizational_scopes_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.record_templates(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: template_organizational_scopes template_scopes_node_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_organizational_scopes
    ADD CONSTRAINT template_scopes_node_name_fkey FOREIGN KEY (scope_id) REFERENCES public.node_names(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: template_organizational_scopes template_scopes_org_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_organizational_scopes
    ADD CONSTRAINT template_scopes_org_unit_fkey FOREIGN KEY (scope_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: template_organizational_scopes template_scopes_unit_container_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_organizational_scopes
    ADD CONSTRAINT template_scopes_unit_container_fkey FOREIGN KEY (scope_id) REFERENCES public.unit_containers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: unit_container_items unit_container_items_container_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_container_items
    ADD CONSTRAINT unit_container_items_container_id_fkey FOREIGN KEY (container_id) REFERENCES public.unit_containers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: unit_container_items unit_container_items_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_container_items
    ADD CONSTRAINT unit_container_items_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: unit_hierarchies unit_hierarchies_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_hierarchies
    ADD CONSTRAINT unit_hierarchies_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: unit_hierarchies unit_hierarchies_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_hierarchies
    ADD CONSTRAINT unit_hierarchies_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.organizational_units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_contexts user_contexts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_contexts
    ADD CONSTRAINT user_contexts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_records workflow_records_current_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_records
    ADD CONSTRAINT workflow_records_current_state_id_fkey FOREIGN KEY (current_state_id) REFERENCES public.workflow_states(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_records workflow_records_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_records
    ADD CONSTRAINT workflow_records_record_id_fkey FOREIGN KEY (record_id) REFERENCES public."Record"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_records workflow_records_workflow_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_records
    ADD CONSTRAINT workflow_records_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.workflows(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_state_history workflow_state_history_changed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_state_history
    ADD CONSTRAINT workflow_state_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_state_history workflow_state_history_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_state_history
    ADD CONSTRAINT workflow_state_history_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.workflow_states(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_state_history workflow_state_history_workflow_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_state_history
    ADD CONSTRAINT workflow_state_history_workflow_record_id_fkey FOREIGN KEY (workflow_record_id) REFERENCES public.workflow_records(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_states workflow_states_workflow_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_states
    ADD CONSTRAINT workflow_states_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.workflows(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_transition_history workflow_transition_history_transition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transition_history
    ADD CONSTRAINT workflow_transition_history_transition_id_fkey FOREIGN KEY (transition_id) REFERENCES public.workflow_transitions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_transition_history workflow_transition_history_triggered_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transition_history
    ADD CONSTRAINT workflow_transition_history_triggered_by_fkey FOREIGN KEY (triggered_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_transition_history workflow_transition_history_workflow_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transition_history
    ADD CONSTRAINT workflow_transition_history_workflow_record_id_fkey FOREIGN KEY (workflow_record_id) REFERENCES public.workflow_records(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_transitions workflow_transitions_from_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transitions
    ADD CONSTRAINT workflow_transitions_from_state_id_fkey FOREIGN KEY (from_state_id) REFERENCES public.workflow_states(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_transitions workflow_transitions_to_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transitions
    ADD CONSTRAINT workflow_transitions_to_state_id_fkey FOREIGN KEY (to_state_id) REFERENCES public.workflow_states(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_transitions workflow_transitions_workflow_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_transitions
    ADD CONSTRAINT workflow_transitions_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.workflows(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_trigger_executions workflow_trigger_executions_trigger_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_trigger_executions
    ADD CONSTRAINT workflow_trigger_executions_trigger_id_fkey FOREIGN KEY (trigger_id) REFERENCES public.workflow_triggers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflow_trigger_executions workflow_trigger_executions_triggered_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_trigger_executions
    ADD CONSTRAINT workflow_trigger_executions_triggered_by_fkey FOREIGN KEY (triggered_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: workflow_triggers workflow_triggers_workflow_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflow_triggers
    ADD CONSTRAINT workflow_triggers_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.workflows(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflows workflows_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflows
    ADD CONSTRAINT workflows_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: workflows workflows_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflows
    ADD CONSTRAINT workflows_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: workflows workflows_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workflows
    ADD CONSTRAINT workflows_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA graphql_public; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA graphql_public TO postgres;
GRANT USAGE ON SCHEMA graphql_public TO anon;
GRANT USAGE ON SCHEMA graphql_public TO authenticated;
GRANT USAGE ON SCHEMA graphql_public TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.try_cast_double(inp text) FROM postgres;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.url_decode(data text) FROM postgres;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.url_encode(data bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION create_client_root_unit(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_client_root_unit() TO anon;
GRANT ALL ON FUNCTION public.create_client_root_unit() TO authenticated;
GRANT ALL ON FUNCTION public.create_client_root_unit() TO service_role;


--
-- Name: FUNCTION generate_entity_id(name text, entity_type public."ContextType"); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.generate_entity_id(name text, entity_type public."ContextType") TO anon;
GRANT ALL ON FUNCTION public.generate_entity_id(name text, entity_type public."ContextType") TO authenticated;
GRANT ALL ON FUNCTION public.generate_entity_id(name text, entity_type public."ContextType") TO service_role;


--
-- Name: FUNCTION manage_node(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.manage_node() TO anon;
GRANT ALL ON FUNCTION public.manage_node() TO authenticated;
GRANT ALL ON FUNCTION public.manage_node() TO service_role;


--
-- Name: FUNCTION orioledb_commit_hash(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_commit_hash() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_commit_hash() TO anon;
GRANT ALL ON FUNCTION public.orioledb_commit_hash() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_commit_hash() TO service_role;


--
-- Name: FUNCTION orioledb_compression_max_level(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_compression_max_level() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_compression_max_level() TO anon;
GRANT ALL ON FUNCTION public.orioledb_compression_max_level() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_compression_max_level() TO service_role;


--
-- Name: FUNCTION orioledb_evict_pages(relid oid, maxlevel integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_evict_pages(relid oid, maxlevel integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_evict_pages(relid oid, maxlevel integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_evict_pages(relid oid, maxlevel integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_evict_pages(relid oid, maxlevel integer) TO service_role;


--
-- Name: FUNCTION orioledb_get_evicted_trees(OUT datoid oid, OUT relnode oid, OUT root_downlink bigint, OUT file_length bigint); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_get_evicted_trees(OUT datoid oid, OUT relnode oid, OUT root_downlink bigint, OUT file_length bigint) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_get_evicted_trees(OUT datoid oid, OUT relnode oid, OUT root_downlink bigint, OUT file_length bigint) TO anon;
GRANT ALL ON FUNCTION public.orioledb_get_evicted_trees(OUT datoid oid, OUT relnode oid, OUT root_downlink bigint, OUT file_length bigint) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_get_evicted_trees(OUT datoid oid, OUT relnode oid, OUT root_downlink bigint, OUT file_length bigint) TO service_role;


--
-- Name: FUNCTION orioledb_get_index_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_get_index_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_get_index_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_get_index_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_get_index_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO service_role;


--
-- Name: FUNCTION orioledb_get_table_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_get_table_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_get_table_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_get_table_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_get_table_descrs(OUT datoid oid, OUT reloid oid, OUT relnode oid, OUT refcnt oid) TO service_role;


--
-- Name: FUNCTION orioledb_has_retained_undo(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_has_retained_undo() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_has_retained_undo() TO anon;
GRANT ALL ON FUNCTION public.orioledb_has_retained_undo() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_has_retained_undo() TO service_role;


--
-- Name: FUNCTION orioledb_idx_structure(relid oid, tree_name text, options character varying, depth integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_idx_structure(relid oid, tree_name text, options character varying, depth integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_idx_structure(relid oid, tree_name text, options character varying, depth integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_idx_structure(relid oid, tree_name text, options character varying, depth integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_idx_structure(relid oid, tree_name text, options character varying, depth integer) TO service_role;


--
-- Name: FUNCTION orioledb_index_description(datoid oid, relid oid, relnode oid, index_type text, OUT name text, OUT description text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_index_description(datoid oid, relid oid, relnode oid, index_type text, OUT name text, OUT description text) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_index_description(datoid oid, relid oid, relnode oid, index_type text, OUT name text, OUT description text) TO anon;
GRANT ALL ON FUNCTION public.orioledb_index_description(datoid oid, relid oid, relnode oid, index_type text, OUT name text, OUT description text) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_index_description(datoid oid, relid oid, relnode oid, index_type text, OUT name text, OUT description text) TO service_role;


--
-- Name: FUNCTION orioledb_index_oids(OUT datoid oid, OUT table_reloid oid, OUT table_relnode oid, OUT index_reloid oid, OUT index_relnode oid, OUT index_type text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_index_oids(OUT datoid oid, OUT table_reloid oid, OUT table_relnode oid, OUT index_reloid oid, OUT index_relnode oid, OUT index_type text) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_index_oids(OUT datoid oid, OUT table_reloid oid, OUT table_relnode oid, OUT index_reloid oid, OUT index_relnode oid, OUT index_type text) TO anon;
GRANT ALL ON FUNCTION public.orioledb_index_oids(OUT datoid oid, OUT table_reloid oid, OUT table_relnode oid, OUT index_reloid oid, OUT index_relnode oid, OUT index_type text) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_index_oids(OUT datoid oid, OUT table_reloid oid, OUT table_relnode oid, OUT index_reloid oid, OUT index_relnode oid, OUT index_type text) TO service_role;


--
-- Name: FUNCTION orioledb_index_rows(relid oid, OUT total integer, OUT dead integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_index_rows(relid oid, OUT total integer, OUT dead integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_index_rows(relid oid, OUT total integer, OUT dead integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_index_rows(relid oid, OUT total integer, OUT dead integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_index_rows(relid oid, OUT total integer, OUT dead integer) TO service_role;


--
-- Name: FUNCTION orioledb_page_stats(OUT pool_name text, OUT busy_pages bigint, OUT free_pages bigint, OUT dirty_pages bigint, OUT all_pages bigint); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_page_stats(OUT pool_name text, OUT busy_pages bigint, OUT free_pages bigint, OUT dirty_pages bigint, OUT all_pages bigint) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_page_stats(OUT pool_name text, OUT busy_pages bigint, OUT free_pages bigint, OUT dirty_pages bigint, OUT all_pages bigint) TO anon;
GRANT ALL ON FUNCTION public.orioledb_page_stats(OUT pool_name text, OUT busy_pages bigint, OUT free_pages bigint, OUT dirty_pages bigint, OUT all_pages bigint) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_page_stats(OUT pool_name text, OUT busy_pages bigint, OUT free_pages bigint, OUT dirty_pages bigint, OUT all_pages bigint) TO service_role;


--
-- Name: FUNCTION orioledb_parallel_debug_start(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_parallel_debug_start() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_parallel_debug_start() TO anon;
GRANT ALL ON FUNCTION public.orioledb_parallel_debug_start() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_parallel_debug_start() TO service_role;


--
-- Name: FUNCTION orioledb_parallel_debug_stop(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_parallel_debug_stop() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_parallel_debug_stop() TO anon;
GRANT ALL ON FUNCTION public.orioledb_parallel_debug_stop() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_parallel_debug_stop() TO service_role;


--
-- Name: FUNCTION orioledb_recovery_synchronized(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_recovery_synchronized() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_recovery_synchronized() TO anon;
GRANT ALL ON FUNCTION public.orioledb_recovery_synchronized() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_recovery_synchronized() TO service_role;


--
-- Name: FUNCTION orioledb_relation_size(relid oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_relation_size(relid oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_relation_size(relid oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_relation_size(relid oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_relation_size(relid oid) TO service_role;


--
-- Name: FUNCTION orioledb_sys_tree_check(num integer, force_map_check boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_sys_tree_check(num integer, force_map_check boolean) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_check(num integer, force_map_check boolean) TO anon;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_check(num integer, force_map_check boolean) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_check(num integer, force_map_check boolean) TO service_role;


--
-- Name: FUNCTION orioledb_sys_tree_rows(num integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_sys_tree_rows(num integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_rows(num integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_rows(num integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_rows(num integer) TO service_role;


--
-- Name: FUNCTION orioledb_sys_tree_structure(num integer, options character varying, depth integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_sys_tree_structure(num integer, options character varying, depth integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_structure(num integer, options character varying, depth integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_structure(num integer, options character varying, depth integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_sys_tree_structure(num integer, options character varying, depth integer) TO service_role;


--
-- Name: FUNCTION orioledb_table_description(relid oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_table_description(relid oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_table_description(relid oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_table_description(relid oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_table_description(relid oid) TO service_role;


--
-- Name: FUNCTION orioledb_table_description(datoid oid, relid oid, relnode oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_table_description(datoid oid, relid oid, relnode oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_table_description(datoid oid, relid oid, relnode oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_table_description(datoid oid, relid oid, relnode oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_table_description(datoid oid, relid oid, relnode oid) TO service_role;


--
-- Name: FUNCTION orioledb_table_oids(OUT datoid oid, OUT reloid oid, OUT relnode oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_table_oids(OUT datoid oid, OUT reloid oid, OUT relnode oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_table_oids(OUT datoid oid, OUT reloid oid, OUT relnode oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_table_oids(OUT datoid oid, OUT reloid oid, OUT relnode oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_table_oids(OUT datoid oid, OUT reloid oid, OUT relnode oid) TO service_role;


--
-- Name: FUNCTION orioledb_table_pages(relid oid, OUT blkno bigint, OUT level integer, OUT rightlink bigint, OUT hikey jsonb); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_table_pages(relid oid, OUT blkno bigint, OUT level integer, OUT rightlink bigint, OUT hikey jsonb) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_table_pages(relid oid, OUT blkno bigint, OUT level integer, OUT rightlink bigint, OUT hikey jsonb) TO anon;
GRANT ALL ON FUNCTION public.orioledb_table_pages(relid oid, OUT blkno bigint, OUT level integer, OUT rightlink bigint, OUT hikey jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_table_pages(relid oid, OUT blkno bigint, OUT level integer, OUT rightlink bigint, OUT hikey jsonb) TO service_role;


--
-- Name: FUNCTION orioledb_tableam_handler(internal); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tableam_handler(internal) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tableam_handler(internal) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tableam_handler(internal) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tableam_handler(internal) TO service_role;


--
-- Name: FUNCTION orioledb_tbl_are_indices_equal(idx_oid1 regclass, idx_oid2 regclass); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tbl_are_indices_equal(idx_oid1 regclass, idx_oid2 regclass) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tbl_are_indices_equal(idx_oid1 regclass, idx_oid2 regclass) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tbl_are_indices_equal(idx_oid1 regclass, idx_oid2 regclass) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tbl_are_indices_equal(idx_oid1 regclass, idx_oid2 regclass) TO service_role;


--
-- Name: FUNCTION orioledb_tbl_bin_structure(relid oid, print_bytes boolean, depth integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tbl_bin_structure(relid oid, print_bytes boolean, depth integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tbl_bin_structure(relid oid, print_bytes boolean, depth integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tbl_bin_structure(relid oid, print_bytes boolean, depth integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tbl_bin_structure(relid oid, print_bytes boolean, depth integer) TO service_role;


--
-- Name: FUNCTION orioledb_tbl_check(relid oid, force_map_check boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tbl_check(relid oid, force_map_check boolean) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tbl_check(relid oid, force_map_check boolean) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tbl_check(relid oid, force_map_check boolean) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tbl_check(relid oid, force_map_check boolean) TO service_role;


--
-- Name: FUNCTION orioledb_tbl_compression_check(level bigint, relid oid, ranges integer[]); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tbl_compression_check(level bigint, relid oid, ranges integer[]) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tbl_compression_check(level bigint, relid oid, ranges integer[]) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tbl_compression_check(level bigint, relid oid, ranges integer[]) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tbl_compression_check(level bigint, relid oid, ranges integer[]) TO service_role;


--
-- Name: FUNCTION orioledb_tbl_indices(relid oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tbl_indices(relid oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tbl_indices(relid oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tbl_indices(relid oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tbl_indices(relid oid) TO service_role;


--
-- Name: FUNCTION orioledb_tbl_structure(relid oid, options character varying, depth integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_tbl_structure(relid oid, options character varying, depth integer) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_tbl_structure(relid oid, options character varying, depth integer) TO anon;
GRANT ALL ON FUNCTION public.orioledb_tbl_structure(relid oid, options character varying, depth integer) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_tbl_structure(relid oid, options character varying, depth integer) TO service_role;


--
-- Name: FUNCTION orioledb_ucm_check(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_ucm_check() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_ucm_check() TO anon;
GRANT ALL ON FUNCTION public.orioledb_ucm_check() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_ucm_check() TO service_role;


--
-- Name: FUNCTION orioledb_version(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_version() TO postgres;
GRANT ALL ON FUNCTION public.orioledb_version() TO anon;
GRANT ALL ON FUNCTION public.orioledb_version() TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_version() TO service_role;


--
-- Name: FUNCTION orioledb_write_pages(relid oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.orioledb_write_pages(relid oid) TO postgres;
GRANT ALL ON FUNCTION public.orioledb_write_pages(relid oid) TO anon;
GRANT ALL ON FUNCTION public.orioledb_write_pages(relid oid) TO authenticated;
GRANT ALL ON FUNCTION public.orioledb_write_pages(relid oid) TO service_role;


--
-- Name: FUNCTION pg_stopevent_reset(eventname text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.pg_stopevent_reset(eventname text) TO postgres;
GRANT ALL ON FUNCTION public.pg_stopevent_reset(eventname text) TO anon;
GRANT ALL ON FUNCTION public.pg_stopevent_reset(eventname text) TO authenticated;
GRANT ALL ON FUNCTION public.pg_stopevent_reset(eventname text) TO service_role;


--
-- Name: FUNCTION pg_stopevent_set(eventname text, condition jsonpath); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.pg_stopevent_set(eventname text, condition jsonpath) TO postgres;
GRANT ALL ON FUNCTION public.pg_stopevent_set(eventname text, condition jsonpath) TO anon;
GRANT ALL ON FUNCTION public.pg_stopevent_set(eventname text, condition jsonpath) TO authenticated;
GRANT ALL ON FUNCTION public.pg_stopevent_set(eventname text, condition jsonpath) TO service_role;


--
-- Name: FUNCTION pg_stopevents(OUT stopevent text, OUT condition jsonpath, OUT waiter_pids integer[]); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.pg_stopevents(OUT stopevent text, OUT condition jsonpath, OUT waiter_pids integer[]) TO postgres;
GRANT ALL ON FUNCTION public.pg_stopevents(OUT stopevent text, OUT condition jsonpath, OUT waiter_pids integer[]) TO anon;
GRANT ALL ON FUNCTION public.pg_stopevents(OUT stopevent text, OUT condition jsonpath, OUT waiter_pids integer[]) TO authenticated;
GRANT ALL ON FUNCTION public.pg_stopevents(OUT stopevent text, OUT condition jsonpath, OUT waiter_pids integer[]) TO service_role;


--
-- Name: FUNCTION s3_get(objectname text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.s3_get(objectname text) TO postgres;
GRANT ALL ON FUNCTION public.s3_get(objectname text) TO anon;
GRANT ALL ON FUNCTION public.s3_get(objectname text) TO authenticated;
GRANT ALL ON FUNCTION public.s3_get(objectname text) TO service_role;


--
-- Name: FUNCTION s3_put(objectname text, filename text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.s3_put(objectname text, filename text) TO postgres;
GRANT ALL ON FUNCTION public.s3_put(objectname text, filename text) TO anon;
GRANT ALL ON FUNCTION public.s3_put(objectname text, filename text) TO authenticated;
GRANT ALL ON FUNCTION public.s3_put(objectname text, filename text) TO service_role;


--
-- Name: FUNCTION set_entity_id(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_entity_id() TO anon;
GRANT ALL ON FUNCTION public.set_entity_id() TO authenticated;
GRANT ALL ON FUNCTION public.set_entity_id() TO service_role;


--
-- Name: FUNCTION update_node_unit_count(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_node_unit_count() TO anon;
GRANT ALL ON FUNCTION public.update_node_unit_count() TO authenticated;
GRANT ALL ON FUNCTION public.update_node_unit_count() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.schema_migrations TO postgres;
GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE "Entity"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Entity" TO anon;
GRANT ALL ON TABLE public."Entity" TO authenticated;
GRANT ALL ON TABLE public."Entity" TO service_role;


--
-- Name: TABLE "Record"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Record" TO anon;
GRANT ALL ON TABLE public."Record" TO authenticated;
GRANT ALL ON TABLE public."Record" TO service_role;


--
-- Name: TABLE audit_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.audit_logs TO anon;
GRANT ALL ON TABLE public.audit_logs TO authenticated;
GRANT ALL ON TABLE public.audit_logs TO service_role;


--
-- Name: TABLE component_library; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.component_library TO anon;
GRANT ALL ON TABLE public.component_library TO authenticated;
GRANT ALL ON TABLE public.component_library TO service_role;


--
-- Name: TABLE container_node_names; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.container_node_names TO anon;
GRANT ALL ON TABLE public.container_node_names TO authenticated;
GRANT ALL ON TABLE public.container_node_names TO service_role;


--
-- Name: TABLE context_permissions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.context_permissions TO anon;
GRANT ALL ON TABLE public.context_permissions TO authenticated;
GRANT ALL ON TABLE public.context_permissions TO service_role;


--
-- Name: TABLE group_members; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.group_members TO anon;
GRANT ALL ON TABLE public.group_members TO authenticated;
GRANT ALL ON TABLE public.group_members TO service_role;


--
-- Name: TABLE group_permissions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.group_permissions TO anon;
GRANT ALL ON TABLE public.group_permissions TO authenticated;
GRANT ALL ON TABLE public.group_permissions TO service_role;


--
-- Name: TABLE groups; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.groups TO anon;
GRANT ALL ON TABLE public.groups TO authenticated;
GRANT ALL ON TABLE public.groups TO service_role;


--
-- Name: TABLE integration_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.integration_logs TO anon;
GRANT ALL ON TABLE public.integration_logs TO authenticated;
GRANT ALL ON TABLE public.integration_logs TO service_role;


--
-- Name: TABLE module_components; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.module_components TO anon;
GRANT ALL ON TABLE public.module_components TO authenticated;
GRANT ALL ON TABLE public.module_components TO service_role;


--
-- Name: TABLE module_dependencies; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.module_dependencies TO anon;
GRANT ALL ON TABLE public.module_dependencies TO authenticated;
GRANT ALL ON TABLE public.module_dependencies TO service_role;


--
-- Name: TABLE module_instances; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.module_instances TO anon;
GRANT ALL ON TABLE public.module_instances TO authenticated;
GRANT ALL ON TABLE public.module_instances TO service_role;


--
-- Name: TABLE module_organizational_scopes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.module_organizational_scopes TO anon;
GRANT ALL ON TABLE public.module_organizational_scopes TO authenticated;
GRANT ALL ON TABLE public.module_organizational_scopes TO service_role;


--
-- Name: TABLE modules; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.modules TO anon;
GRANT ALL ON TABLE public.modules TO authenticated;
GRANT ALL ON TABLE public.modules TO service_role;


--
-- Name: TABLE node_hierarchy_rules; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.node_hierarchy_rules TO anon;
GRANT ALL ON TABLE public.node_hierarchy_rules TO authenticated;
GRANT ALL ON TABLE public.node_hierarchy_rules TO service_role;


--
-- Name: TABLE node_names; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.node_names TO anon;
GRANT ALL ON TABLE public.node_names TO authenticated;
GRANT ALL ON TABLE public.node_names TO service_role;


--
-- Name: TABLE organizational_units; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.organizational_units TO anon;
GRANT ALL ON TABLE public.organizational_units TO authenticated;
GRANT ALL ON TABLE public.organizational_units TO service_role;


--
-- Name: TABLE orioledb_index; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.orioledb_index TO postgres;
GRANT ALL ON TABLE public.orioledb_index TO anon;
GRANT ALL ON TABLE public.orioledb_index TO authenticated;
GRANT ALL ON TABLE public.orioledb_index TO service_role;


--
-- Name: TABLE orioledb_index_descr; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.orioledb_index_descr TO postgres;
GRANT ALL ON TABLE public.orioledb_index_descr TO anon;
GRANT ALL ON TABLE public.orioledb_index_descr TO authenticated;
GRANT ALL ON TABLE public.orioledb_index_descr TO service_role;


--
-- Name: TABLE orioledb_table; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.orioledb_table TO postgres;
GRANT ALL ON TABLE public.orioledb_table TO anon;
GRANT ALL ON TABLE public.orioledb_table TO authenticated;
GRANT ALL ON TABLE public.orioledb_table TO service_role;


--
-- Name: TABLE orioledb_table_descr; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.orioledb_table_descr TO postgres;
GRANT ALL ON TABLE public.orioledb_table_descr TO anon;
GRANT ALL ON TABLE public.orioledb_table_descr TO authenticated;
GRANT ALL ON TABLE public.orioledb_table_descr TO service_role;


--
-- Name: TABLE performance_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.performance_logs TO anon;
GRANT ALL ON TABLE public.performance_logs TO authenticated;
GRANT ALL ON TABLE public.performance_logs TO service_role;


--
-- Name: TABLE permissions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.permissions TO anon;
GRANT ALL ON TABLE public.permissions TO authenticated;
GRANT ALL ON TABLE public.permissions TO service_role;


--
-- Name: TABLE provider_hierarchies; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.provider_hierarchies TO anon;
GRANT ALL ON TABLE public.provider_hierarchies TO authenticated;
GRANT ALL ON TABLE public.provider_hierarchies TO service_role;


--
-- Name: TABLE provider_hierarchy_cache; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.provider_hierarchy_cache TO anon;
GRANT ALL ON TABLE public.provider_hierarchy_cache TO authenticated;
GRANT ALL ON TABLE public.provider_hierarchy_cache TO service_role;


--
-- Name: TABLE provider_hierarchy_history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.provider_hierarchy_history TO anon;
GRANT ALL ON TABLE public.provider_hierarchy_history TO authenticated;
GRANT ALL ON TABLE public.provider_hierarchy_history TO service_role;


--
-- Name: TABLE provider_hierarchy_rules; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.provider_hierarchy_rules TO anon;
GRANT ALL ON TABLE public.provider_hierarchy_rules TO authenticated;
GRANT ALL ON TABLE public.provider_hierarchy_rules TO service_role;


--
-- Name: TABLE record_files; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.record_files TO anon;
GRANT ALL ON TABLE public.record_files TO authenticated;
GRANT ALL ON TABLE public.record_files TO service_role;


--
-- Name: TABLE record_history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.record_history TO anon;
GRANT ALL ON TABLE public.record_history TO authenticated;
GRANT ALL ON TABLE public.record_history TO service_role;


--
-- Name: TABLE record_organizational_units; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.record_organizational_units TO anon;
GRANT ALL ON TABLE public.record_organizational_units TO authenticated;
GRANT ALL ON TABLE public.record_organizational_units TO service_role;


--
-- Name: TABLE record_templates; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.record_templates TO anon;
GRANT ALL ON TABLE public.record_templates TO authenticated;
GRANT ALL ON TABLE public.record_templates TO service_role;


--
-- Name: TABLE record_values; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.record_values TO anon;
GRANT ALL ON TABLE public.record_values TO authenticated;
GRANT ALL ON TABLE public.record_values TO service_role;


--
-- Name: TABLE security_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.security_logs TO anon;
GRANT ALL ON TABLE public.security_logs TO authenticated;
GRANT ALL ON TABLE public.security_logs TO service_role;


--
-- Name: TABLE system_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.system_logs TO anon;
GRANT ALL ON TABLE public.system_logs TO authenticated;
GRANT ALL ON TABLE public.system_logs TO service_role;


--
-- Name: TABLE template_fields; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.template_fields TO anon;
GRANT ALL ON TABLE public.template_fields TO authenticated;
GRANT ALL ON TABLE public.template_fields TO service_role;


--
-- Name: TABLE template_organizational_scopes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.template_organizational_scopes TO anon;
GRANT ALL ON TABLE public.template_organizational_scopes TO authenticated;
GRANT ALL ON TABLE public.template_organizational_scopes TO service_role;


--
-- Name: TABLE unit_container_items; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.unit_container_items TO anon;
GRANT ALL ON TABLE public.unit_container_items TO authenticated;
GRANT ALL ON TABLE public.unit_container_items TO service_role;


--
-- Name: TABLE unit_containers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.unit_containers TO anon;
GRANT ALL ON TABLE public.unit_containers TO authenticated;
GRANT ALL ON TABLE public.unit_containers TO service_role;


--
-- Name: TABLE unit_hierarchies; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.unit_hierarchies TO anon;
GRANT ALL ON TABLE public.unit_hierarchies TO authenticated;
GRANT ALL ON TABLE public.unit_hierarchies TO service_role;


--
-- Name: TABLE user_contexts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_contexts TO anon;
GRANT ALL ON TABLE public.user_contexts TO authenticated;
GRANT ALL ON TABLE public.user_contexts TO service_role;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- Name: TABLE workflow_records; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_records TO anon;
GRANT ALL ON TABLE public.workflow_records TO authenticated;
GRANT ALL ON TABLE public.workflow_records TO service_role;


--
-- Name: TABLE workflow_state_history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_state_history TO anon;
GRANT ALL ON TABLE public.workflow_state_history TO authenticated;
GRANT ALL ON TABLE public.workflow_state_history TO service_role;


--
-- Name: TABLE workflow_states; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_states TO anon;
GRANT ALL ON TABLE public.workflow_states TO authenticated;
GRANT ALL ON TABLE public.workflow_states TO service_role;


--
-- Name: TABLE workflow_transition_history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_transition_history TO anon;
GRANT ALL ON TABLE public.workflow_transition_history TO authenticated;
GRANT ALL ON TABLE public.workflow_transition_history TO service_role;


--
-- Name: TABLE workflow_transitions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_transitions TO anon;
GRANT ALL ON TABLE public.workflow_transitions TO authenticated;
GRANT ALL ON TABLE public.workflow_transitions TO service_role;


--
-- Name: TABLE workflow_trigger_executions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_trigger_executions TO anon;
GRANT ALL ON TABLE public.workflow_trigger_executions TO authenticated;
GRANT ALL ON TABLE public.workflow_trigger_executions TO service_role;


--
-- Name: TABLE workflow_triggers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflow_triggers TO anon;
GRANT ALL ON TABLE public.workflow_triggers TO authenticated;
GRANT ALL ON TABLE public.workflow_triggers TO service_role;


--
-- Name: TABLE workflows; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workflows TO anon;
GRANT ALL ON TABLE public.workflows TO authenticated;
GRANT ALL ON TABLE public.workflows TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO postgres;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

