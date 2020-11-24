DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;
USE department_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	department_name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id DECIMAL NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE roles
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);
