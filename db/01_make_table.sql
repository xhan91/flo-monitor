CREATE TABLE station (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL default false,
    last_updated TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE app_status (
    id INT PRIMARY KEY,
    is_notice_needed BOOLEAN NOT NULL
);

INSERT INTO app_status VALUES (1, false);