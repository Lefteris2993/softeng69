CREATE TABLE Points (
	ID						varchar(50),
	Station					varchar(50),
	CONSTRAINT "PK_Points" PRIMARY KEY (ID)
);

ALTER TABLE Points ADD CONSTRAINT "FK_Points StationID" FOREIGN KEY (Station) REFERENCES Stations (ID);