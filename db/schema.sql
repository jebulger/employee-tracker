-- CREATE DATABASE IF NOT EXISTS employee_db;
-- Destroys previous databases under this name
-- then creates a new one each time 'source schema.sql' is executed
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Selects which database to use
use employee_db;

-- Creates the department table which stores
-- an auto-incrementing id that is a primary key
-- and the name of the department
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- Creates a role table which stores
-- an auto-incrementing id that is a primary key
-- the title and salary of the role
-- And the department_id which references the id found
-- in the department table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Creates an employee table which stores
-- an auto-incrementing id that is a primary key
-- the employee's first and last name
-- their role_id which references the id found under the role table
-- and the manager_id, which references the primary key id inside
-- this employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);