CREATE TABLE Stations (
	ID						varchar(50),
	Operator				int8,
	CONSTRAINT "PK_Stations" PRIMARY KEY (ID)
);

ALTER TABLE Stations ADD CONSTRAINT "FK_Stations OperatorID" FOREIGN KEY (Operator) REFERENCES Operators (ID);