CREATE TABLE SubmissionStatusTypes (
	ID						int8,
	Title					varchar(150),
	IsLive					boolean,
	CONSTRAINT "PK_SubmissionStatusTypes" PRIMARY KEY (ID)
);