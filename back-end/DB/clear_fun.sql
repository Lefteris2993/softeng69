--- add more on the same maner
drop function if exists login(text, text, text);
drop function if exists  usermod(text,text,text,BOOLEAN,text);
drop function if exists  get_user(text,text);
drop function if exists  healthcheck(text);

DROP SEQUENCE users_seq;