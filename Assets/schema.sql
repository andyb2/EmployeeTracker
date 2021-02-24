CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 4),
    department_id INT
);

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nameDepart VARCHAR(30)
);
