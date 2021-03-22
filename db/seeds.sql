INSERT INTO department (id, name)
VALUES(1, "Sales"), (2, "Engineering"), (3, "Finance"), (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VARCHAR 
    (1, "Sales Lead", 100000, 8), 
    (2, "Salesperson", 80000, 7),
    (3, "Lead Engineer", 150000, 6),
    (4, "Software Engineer", 120000, 5),
    (5, "Account Manager", 150000, 4),
    (6, "Accountant", 125000, 3),
    (7, "Legal Team Lead", 250000, 2),
    (8, "Project Manager", 300000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (101, "Aubry", "Grand", 1, NULL), 
    (101, "Peter", "Grifin", 2, 101), 
    (101, "Abel", "Tesfaye", 7, 101), 
    (101, "Luke", "Skywalker", 6, 101), 
    (101, "Ariana", "Grande", 2, 101),
    (101, "Aaron", "Rodgers", 8, 101);