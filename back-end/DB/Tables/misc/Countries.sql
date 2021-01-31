CREATE TABLE Countries (
	ID						int8,
	Title					varchar(50),
	ISOCode					varchar(2),
	ContinentCode			varchar(2),
	CONSTRAINT "PK_Countries" PRIMARY KEY (ID)
);