CREATE TABLE UsageTypes (
	ID						int8,
	Title					varchar(150),
	IsPayAtLocation			boolean,
	IsMembershipRequired	boolean,
	IsAccessKeyRequired		boolean,
	CONSTRAINT "PK_UsageTypes" PRIMARY KEY (ID)
);