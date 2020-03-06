use charity_app_db;

INSERT INTO users (username, passwd, email, first_name, last_name) VALUES ("maxken512","Max@max","test", "Max", "Kennedy");
INSERT INTO users (username, passwd, email, first_name, last_name) VALUES ("Anierva95","Ant@ant", "test1", "Anthony", "Nierva");
INSERT INTO users (username, passwd, email, first_name, last_name) VALUES ("Henryni914","Henry@Henry", "test2", "Henry", "Ni");
INSERT INTO users (username, passwd, email, first_name, last_name) VALUES ("ZhaoyangXia0204","Zhao@Zhao", "test3", "Zhaoyang", "Xia");

INSERT INTO Charities (title, descript, goal, UserId) VALUES ("Pay my rent please", "i am once again asking for your financial support",500.00, 2);
INSERT INTO Charities (title, descript, goal, UserId) VALUES ("the knicks suck", "help fund the knicks to get better players", 3000000.00, 1);
INSERT INTO Charities (title, descript, goal, UserId) VALUES ("My hearthstone cards are ancient", "Please help me to climb the ranked ladder with new cards", 150.00, 3);
INSERT INTO Charities (title, descript, goal, UserId) VALUES ("also need better cards in hearthstone", "i dont want to play battlegrounds anymore", 100.00, 2);
INSERT INTO Charities (title, descript, goal, UserId) VALUES ("also need better cards in hearthstone", "i dont want to play battleg anymore", 110.00, 1);

INSERT INTO Transactions (amount, CharityId, UserId) VALUES (100, 5, 1);
INSERT INTO Transactions (amount, CharityId, UserId) VALUES (13200, 1, 2);
INSERT INTO Transactions (amount, CharityId, UserId) VALUES (1030, 3, 3);
INSERT INTO Transactions (amount, CharityId, UserId) VALUES (103, 2, 3);
INSERT INTO Transactions (amount, CharityId, UserId) VALUES (130, 1, 4);

