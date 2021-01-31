CREATE TABLE Providers (
	ID						SERIAL NOT NULL,
	Name					varchar(50),
	CostPerKWh				real,
	CONSTRAINT "PK_Providers" PRIMARY KEY (ID)
);