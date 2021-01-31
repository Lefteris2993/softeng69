CREATE TABLE ConnectionTypes (
	ID						int,
	Title					varchar(50),
	FormalName				varchar(50),
	IsDiscontinued			boolean,
	IsObsolete				boolean,
	CONSTRAINT "PK_ConnectionTypes" PRIMARY KEY (ID)
);