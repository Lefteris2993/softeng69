CREATE TABLE Sessions (
	ID						varchar(50),
	ConnectionTime			timestamp NOT NULL,
	DisconnectTime			timestamp NOT NULL,
	kWhDelivered			real,
	Payment					varchar(15),
	VehicleID				varchar(50),
	PointID					varchar(50),
	PricePolicyRef			varchar(50),		
	CONSTRAINT "PK_Sessions" PRIMARY KEY (ID)
);

ALTER TABLE Sessions ADD CONSTRAINT "FK_Sessions VehicleID" FOREIGN KEY (VehicleID) REFERENCES Vehicles (ID);
ALTER TABLE Sessions ADD CONSTRAINT "FK_Sessions PointID" FOREIGN KEY (PointID) REFERENCES Points (ID);