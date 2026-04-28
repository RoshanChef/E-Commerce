
CREATE TABLE IF NOT EXISTS employee(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name varchar(20),
    last_name varchar(20) NOT NULL
); 

SHOW TABLES;


INSERT INTO employee (first_name, last_name) values
('rohan','sharma'), 
('meet', 'patel'),
('ronak', 'mehta');

SELECT id , concat(first_name, " ",last_name) FROM employee;