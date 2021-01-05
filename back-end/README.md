- Data base at '83.212.79.152:5432' (lefto.ml:5432) ,DB name 'softeng', User 'team69_admin', password 'team69'.

- to run some file to DB 'psql -f something.sql softeng team69_admin -h lefto.ml'

every function must raise exeptions

- login(name, pass, token) => (token, isAdmin) //DONE
- authenticate(token) => isAdmin // NOT NEEDED
- healthcheck(token) => ? (for healthckeck perposes) // DONE
- usermod(usename,password,token) => VOID //DONE
- get_user(username,token) => user staf //DONE
- resetsessions(token) ?    //
- sessionsupd(?) ?          // only these 2 remain for admin and we are GGs

