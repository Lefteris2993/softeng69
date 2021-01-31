CREATE TABLE DataProviders (
	ID						int8,
	Title					varchar(50),
	WebsiteURL				varchar(150),
	Comments				varchar(200),
	IsRestrictedEdit		boolean,
	IsOpenDataLicensed		boolean,
	IsApprovedImport		boolean,
	License 				varchar(150),
	CONSTRAINT "PK_DataProviders" PRIMARY KEY (ID)
);