DELETE DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
id INT PRIMARY KEY,
dept_name VARCHAR(30)
);

CREATE TABLE role (
id INT PRIMARY KEY,
role_title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);