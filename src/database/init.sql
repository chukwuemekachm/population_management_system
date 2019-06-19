CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS location CASCADE;
CREATE TABLE location
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
	location_name VARCHAR(50) NOT NULL UNIQUE,
	male_population INT NOT NULL,
	female_population INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY (id)
);
