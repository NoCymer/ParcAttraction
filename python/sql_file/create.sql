INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Silver Star', 'Montagne russe', 3, 1);
INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Montagne 8', 'Montagne russe', 4, 1);
INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Yoy', 'Montagne russe', 4, 0);

INSERT INTO review (attraction_id, name, surname, comment, rating) VALUES (1, 'Ben', 'Dover', 'Ouaaaaouw so cool', 5);
INSERT INTO review (attraction_id, name, surname, comment, rating) VALUES (1, 'Mike', 'Hawks', 'Bof', 3);
INSERT INTO review (attraction_id, name, surname, comment, rating) VALUES (2, 'Vivite', 'Laire', 'Pas mal, vu mieux', 2);

INSERT INTO users (name, password) VALUES ('toto', 'toto');