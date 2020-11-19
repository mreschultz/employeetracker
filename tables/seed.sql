USE department_DB;

INSERT INTO department (department_name) VALUES ("Human Resources");
INSERT INTO department (department_name) VALUES ("Management");
INSERT INTO department (department_name) VALUES ("Development");

INSERT INTO employees (first_name, last_name, role_id) VALUES ('Sam', 'Smith', 1);
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Christina', 'Jones', 2);
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Jeff', 'Washington', 3);


INSERT INTO roles (title, salary, department_id) VALUES ('Developer', '75000', 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Specialist', '75000', 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Manager', '100000', 5);