CREATE FUNCTION public.login(uname text, passw text, t text) RETURNS TABLE(token text, isAdmin boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
	username text := (select username from users where username=uname and password=passw);
	isAdmin boolean := (select users.admin from users where users.username=uname and password=passw);
BEGIN
	if username is null then
		raise exception 'not authorized';
	end if;
	update users set token = t where users.username=uname;
	RETURN QUERY (select t,isAdmin);
END; $$;

--------------------------------

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(64) NOT NULL,
    email character varying(64) NOT NULL,
    admin boolean,
    token character(32)
);

INSERT INTO public.users (id, username, password, email, admin, token)
	VALUES (42, 'team69_admin', 'team69', 'team69@lefto.ml', TRUE, NULL);