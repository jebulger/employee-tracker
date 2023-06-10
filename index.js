const mysql = require('mysql2');
const inquirer = require('inquirer');

const query = require('./queries/query');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '12345678',
    database: 'employee_db'
},
    console.log('Connected to the employee_db database.')
);

function beginPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit',
                ],
            },
        ])
        .then((answers) => {
            if (answers.choices === 'View All Employees') {
                query.viewAllEmployees();
            } else if (answers.choices === 'Add Employee') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is their first name?'
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is their last name?'
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is their role?',
                            choices: [
                                'Sales Lead',
                                'Salesperson',
                                'Lead Engineer',
                                'Account Manager',
                                'Accountant',
                                'Legal Team Lead',
                                'Lawyer',
                                'Customer Service'
                            ],
                        },
                        {
                            type: 'list',
                            name: 'managedBy',
                            message: 'Who is their manager?',
                            choices: [
                                '',
                            ],
                        },
                    ])
                    .then((answers) => {
                        const employee = {
                            firstName: answers.firstName,
                            lastName: answers.lastName,
                            role: answers.role,
                            managedBy: answers.managedBy
                        }
                        query.addEmployee(employee);
                    });
            } else if (answers.choices === 'Update Employee Role') {
                query.updateRole();
            } else if (answers.choices === 'View All Roles') {
                query.viewAllRoles();
            } else if (answers.choices === 'Add Role') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the name of the role?'
                        },
                        {
                            type: 'input',
                            name: 'roleSalary',
                            message: 'What is the salary of the role?'
                        },
                        {
                            type: 'list',
                            name: 'roleDepartment',
                            message: 'Which department does the role belong to?',
                            choices: [
                                'Engineering',
                                'Finance',
                                'Legal',
                                'Sales',
                                'Service'
                            ],
                        },
                    ])
                    .then((answers) => {
                        const newRole = {
                            roleName: answers.roleName,
                            roleSalary: answers.roleSalary,
                            roleDepartment: answers.roleDepartment
                        }
                        query.addRole(newRole);
                    })
            } else if (answers.choices === 'View All Departments') {
                query.viewAllDepartments()
            } else if (answers.choices === 'Add Department') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'newDepartment',
                            message: 'What is the name of the department?'
                        }
                    ])
                    .then((answers) => {
                        const newDepartment = {
                            newDepartment: answers.newDepartment
                        }
                        query.addDepartment(newDepartment);
                    })
            } else {
                console.log('Quitting');
                db.end()
            }
        });
}

beginPrompts();