SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS attraction;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);

CREATE TABLE review (
    review_id INT AUTO_INCREMENT,
    attraction_id INT NOT NULL,
    PRIMARY KEY(review_id),
    name VARCHAR(255),
    surname VARCHAR(255),
    comment VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (attraction_id) REFERENCES attraction(attraction_id) ON DELETE CASCADE
);

CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);