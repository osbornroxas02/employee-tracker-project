INSERT INTO departments (name)
VALUES ('Sales'),
    ('Engineering'),
    ('Accounting'),
    ('Legal');
INSERT INTO role (
        title,
        salary,
        department_id
    )
VALUES ('Sales Person', 100000.0, 1),
    ('Lead Engineer', 200000.0, 2),
    ('Software Engineer', 300000.0, 2),
    ('Accountant', 200000.0, 3),
    ('Lawer', 300000.0, 4);
INSERT INTO employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ('Ronald', 'Firbank', 1, 1),
    ('Virginia', 'Woolf', 2, 1),
    ('Piers', 'Gaveston', 3, NULL),
    ('Charles', 'LeRoi', 4, 1),
    ('Katherine', 'Mansfield', 1, 1),
    ('Dora', 'Carrington', 2, 2),
    ('Edward', 'Bellamy', 3, NULL),
    ('Montague', 'Summers', 4, 1),
    ('Octavia', 'Butler', 1, 2),
    ('Unica', 'Zurn', 2, 2);

-- UPDATE employee
-- SET role_id = "1"
-- WHERE id = 1;