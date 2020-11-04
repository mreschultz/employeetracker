INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Development");

INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES ('Marcus', 'Smith', 1, 2);
INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES ('Kelsey', 'James', 2, 3);
INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES ('Jeff', 'Washington', 3, 4);


INSERT INTO employee (title, salary, department_id) VALUES ('Developer', '$75,000', 3);
INSERT INTO employee (title, salary, department_id) VALUES ('Specialist', '$75,000', 3);

INSERT INTO employee (title, salary, department_id) VALUES ('Manager', '$100,000', 3);