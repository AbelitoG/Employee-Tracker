INSERT INTO department (name)
VALUES ("Engineering"),
       ("HR"),
       ("Shoe");
       
INSERT INTO role (title, salary, department_id)
VALUES ('assosiate', 40000, 3),
       ('manager', 50000, 3),
       ('IT dude', 80000, 1),
       ('assistant', 45000, 2);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Abel', 'Gonzales', 2, NULL),
        ('Eric', 'Sayer', 3, NULL),
        ('Tom', 'Langley', 1, 1),
        ('Asshley', 'Shaq', 4, 1);