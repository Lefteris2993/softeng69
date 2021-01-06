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

CREATE OR REPLACE FUNCTION public.usermod(uname TEXT, passw TEXT, mail TEXT, admin BOOLEAN, t TEXT) RETURNS VOID
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
            VALUES (nextval('users_seq'), uname, passw, mail, admin);
        RETURN;
    END IF;
        UPDATE users SET username=uname, password=passw, email=mail, isAdmin=admin WHERE users.username=uname;
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

CREATE SEQUENCE users_seq 
    START 2 INCREMENT 2;

--------------------------------

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username CHARACTER varying(64) NOT NULL,
    password CHARACTER varying(64) NOT NULL,
    email CHARACTER varying(64),
    isAdmin BOOLEAN,
    token CHARACTER(32)
);

INSERT INTO public.users (id, username, password, email, isAdmin, token)
	VALUES (1, 'team69_admin', 'team69', 'team69@lefto.ml', TRUE, NULL);