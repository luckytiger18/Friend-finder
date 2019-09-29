;-- your questions table should have all of the questions
--     id, question

--   your friends table should have a name and photo column
--     id, name, picture_link

--   your scores table should have 
--     id, question_id, friend_id, score


CREATE DATABASE schema_db;

USE schema_db;

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS friends (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    picture_link VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT,
    question_id VARCHAR(255) NOT NULL,
    friend_id VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
); 
 
--     SELECT ABS(score - score)
--         SELECT * 
--         FROM friends f
--         LEFT JOIN scores s
--         ON s.friend_id = f.id
--         LEFT JOIN (
--             SELECT *
--             FROM friends 
--             LEFT JOIN scores s
--             ON scores.friend_id = friends.id
--             WHERE friends.id != f.id
--         ) fs
--         ON __________
-- GROUP BY friend_id