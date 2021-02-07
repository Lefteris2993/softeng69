CREATE OR REPLACE FUNCTION public.login(uname TEXT, passw TEXT, t TEXT) RETURNS TABLE(token TEXT, isAdmin BOOLEAN)
    LANGUAGE plpgsql
    AS $$
DECLARE
	username TEXT := (SELECT username FROM users WHERE username=uname AND password=passw);
	isAdmin BOOLEAN := (SELECT users.isAdmin FROM users WHERE users.username=uname AND password=passw);
BEGIN
	IF username IS NULL THEN
		raise exception 'not authorized';
	END IF;
	UPDATE users SET token = t WHERE users.username=uname;
	RETURN QUERY (SELECT t,isAdmin);
END; $$;

--------------------------------

CREATE OR REPLACE FUNCTION public.usermod(uname TEXT, passw TEXT, t TEXT) RETURNS VOID
    LANGUAGE plpgsql
    AS $$
DECLARE
    auth BOOLEAN := (SELECT users.isAdmin FROM users WHERE token=t);
    should_update TEXT := (SELECT username FROM users WHERE username=uname);
BEGIN 
    IF NOT auth OR auth IS NULL THEN   
        RAISE exception 'not authorized';
    END IF;
    IF should_update IS NULL THEN
        INSERT INTO users(id, username, password, email, isAdmin) 
            VALUES (nextval('users_seq'), uname, passw, NULL, false);
        RETURN;
    END IF;
        UPDATE users SET username=uname, password=passw WHERE users.username=uname;
    RETURN;
END$$;

--------------------------------

CREATE OR REPLACE FUNCTION public.get_user(uname TEXT, t TEXT) RETURNS TABLE(id INTEGER, username TEXT, email TEXT, isAdmin BOOLEAN, connected BOOLEAN)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    auth BOOLEAN := (SELECT users.isAdmin FROM users WHERE token=t);
    id INTEGER := (SELECT users.id FROM users WHERE users.username=uname);
    username TEXT := (SELECT users.username FROM users WHERE users.username=uname);
    email TEXT := (SELECT users.email FROM users WHERE users.username=uname);
    isAdmin BOOLEAN := (SELECT users.isAdmin FROM users WHERE users.username=uname);
    connected BOOLEAN := (SELECT users.token FROM users WHERE users.username=uname) IS NOT NULL;
BEGIN
    IF NOT auth OR auth IS NULL THEN   
        RAISE exception 'not authorized';
    END IF;
    IF username IS NULL THEN
		raise exception 'no data';
	END IF;
    RETURN QUERY (SELECT id, username, email, isAdmin, connected);
END; $$;

--------------------------------

CREATE OR REPLACE FUNCTION public.healthcheck(t TEXT) RETURNS VOID
    LANGUAGE plpgsql
    AS $$
DECLARE
    auth BOOLEAN := (SELECT users.isAdmin FROM users WHERE token=t);
BEGIN
    IF NOT auth OR auth IS NULL THEN   
        RAISE exception 'not authorized';
    END IF;
    RETURN;
END; $$;

--------------------------------

CREATE OR REPLACE FUNCTION public.sessionsforbill(t TEXT) RETURNS TABLE(name text, date date, energy real, money integer)
    LANGUAGE plpgsql
        AS $$
DECLARE
    _name text := (SELECT users.username FROM users WHERE token=t);
    _cars varchar(50)[] := (SELECT Vehicles FROM users WHERE token=t);
    car varchar(50);
BEGIN
    FOREACH car IN ARRAY _cars
    LOOP
        RETURN QUERY SELECT _name, DATE(Sessions.ConnectionTime), Sessions.kWhDelivered, 42
                        FROM Sessions
                        WHERE car=VehicleID and Payment='Periodic';
    END LOOP;
END; $$;