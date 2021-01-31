CREATE TABLE CheckinStatusTypes (
	ID						SERIAL NOT NULL,
	Title					varchar(70),
	IsPositive				boolean,
	IsAutomatedCheckin		boolean,
	CONSTRAINT "PK_CheckinStatusTypes" PRIMARY KEY (ID)
);