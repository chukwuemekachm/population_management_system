CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS location CASCADE;
CREATE TABLE location
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
	location_name VARCHAR(50) NOT NULL UNIQUE,
	male_population INT NOT NULL,
	female_population TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS sublocation CASCADE;
CREATE TABLE sublocation
(
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	location_name VARCHAR(50) NOT NULL UNIQUE,
  parent_id VARCHAR(50) NOT NULL,
	male_population INT NOT NULL,
	female_population TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (parent_id) REFERENCES contact (id) ON UPDATE CASCADE ON DELETE CASCADE
);
