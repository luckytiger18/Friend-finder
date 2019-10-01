;-- your questions table should have all of the questions
--     id, question

--   your friends table should have a name and photo column
--     id, name, picture_link

--   your scores table should have 
--     id, question_id, friend_id, score


CREATE DATABASE friend_finder_db;

USE friend_finder_db;

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

CREATE TABLE scores (
    id INT NOT NULL AUTO_INCREMENT,
    question_id INT NOT NULL,
    friend_id INT NOT NULL,
    answer INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (friend_id) REFERENCES friends(id),
    PRIMARY KEY (id),
    CHECK (answer >= 0),
    CHECK (answer <= 10)
);

SELECT * FROM scores LEFT JOIN friends ON scores.friend_id = friends.id;

SELECT question_id, friend_id, t2friend_id, answer_difference FROM
(SELECT *, (answer-t2answer) AS answer_difference FROM 
(SELECT *
FROM scores s1
LEFT JOIN (SELECT question_id AS t2question_id,
    friend_id AS t2friend_id, answer AS t2answer
    FROM scores s2) t2
    ON t2question_id = s1.question_id) t3) t4 WHERE friend_id = 1;
