DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(30)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
role_title VARCHAR(30),
salary DECIMAL,
department_id INT NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT NOT NULL,
FOREIGN KEY (manager_id) REFERENCES employee(id),
FOREIGN KEY (role_id) REFERENCES role(id)
);