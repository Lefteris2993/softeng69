CREATE TABLE StatusTypes (
	ID						int8,
	Title					varchar(50),
	IsOperational			boolean,
	IsUserSelectable		boolean,
	CONSTRAINT "PK_StatusTypes" PRIMARY KEY (ID)
);