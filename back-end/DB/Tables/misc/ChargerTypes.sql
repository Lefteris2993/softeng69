CREATE TABLE ChargerTypes (
	ID						SERIAL NOT NULL,
	Title					varchar(35),
	Comments				varchar(200),
	IsFastChargeCapable		boolean,
	CONSTRAINT "PK_ChargerTypes" PRIMARY KEY (ID)
);