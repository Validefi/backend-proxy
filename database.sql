CREATE DATABASE ValiDefi;

DROP TABLE IF EXISTS User Cascade; 

CREATE TABLE User(
    user_address VARCHAR(100),
    -- CONSTRAINT check_user_email CHECK (user_email ~* '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
    PRIMARY KEY (user_address)
);
