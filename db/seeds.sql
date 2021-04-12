INSERT INTO department (id, name)
VALUES
(1, "Sales"), 
(2, "Engineering"), 
(3, "Finance"), 
(4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (1, "Sales Lead", 100000, 1), 
    (2, "Salesperson", 80000, 1),
    (3, "Lead Engineer", 150000, 2),
    (4, "Software Engineer", 120000, 2),
    (5, "Account Manager", 150000, 3),
    (6, "Accountant", 125000, 3),
    (7, "Legal Team Lead", 250000, 4),
    (8, "Project Manager", 300000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (101, "Aubry", "Grand", 1, NULL), 
    (102, "Peter", "Grifin", 2, 101), 
    (103, "Abel", "Tesfaye", 7, 101), 
    (104, "Luke", "Skywalker", 6, 101), 
    (105, "Ariana", "Grande", 2, 101),
    (106, "Aaron", "Rodgers", 8, 101);