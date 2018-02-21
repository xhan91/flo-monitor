ALTER TABLE station
    ADD last_status_changed DATETIME NOT NULL default NOW(),
    MODIFY last_updated DATETIME NOT NULL default NOW();