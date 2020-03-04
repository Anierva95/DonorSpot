DROP DATABASE IF EXISTS charity_app_db;

CREATE DATABASE charity_app_db;

USE charity_app_db;

-- CREATE TABLE users(
--     id int NOT NULL AUTO_INCREMENT,
--     username varchar(25) NOT NULL,
--     passwd varchar(15) NOT NULL,
--     first_name varchar(30) NOT NULL,
--     last_name varchar(40) NOT NULL,
--     PRIMARY KEY (id)
-- );
-- CREATE TABLE charity_posts(
--     id int NOT NULL AUTO_INCREMENT,
--     title varchar(100) NOT NULL,
--     descript varchar(500) NOT NULL,
--     goal DECIMAL NOT NULL,
--     owner_id int NOT NULL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (owner_id) REFERENCES users(id)
-- );

-- CREATE TABLE transactions(
--     id int NOT NULL AUTO_INCREMENT,
--     amount decimal NOT NULL,
--     charity_id int NOT NULL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (donor_id) REFERENCES users(id),
--     FOREIGN KEY (charity_id) REFERENCES charity_posts(id)
