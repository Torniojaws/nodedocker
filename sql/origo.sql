USE mydb;
CREATE TABLE hello(
  id INT NOT NULL AUTO_INCREMENT,
  message TEXT,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
INSERT INTO hello(message, created) VALUES ('Hello, My Name', NOW() - INTERVAL 1 MINUTE);
INSERT INTO hello(message, created) VALUES ('Yohoo, this Name', NOW());