INSERT INTO department (id, dept_name)
VALUES (1, "Sales"), (2, "Service"), (3, "Inventory"), (4, "Legal");

INSERT INTO role (id, role_title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1), (2, "Jr. Sales", 80000, 1), (3, "Customer Service", 75000, 2), (4, "Packager/Stocker", 75000, 3), (5, "Forklift Operator", 65000, 3), (6, "Lawyer", 80000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Joe", "Shmoe", 1, 1);