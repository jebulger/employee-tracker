const mysql = require('mysql2');
const inquirer = require('inquirer');

const query = require('./queries/query');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
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
                query.viewAllEmployees(db)
                    .then((employee) => {
                        console.table(employee);
                        beginPrompts();
                    })
                    .catch((err) => {
                        console.error('Error occured while obtaining list of employees', err);
                        beginPrompts();
                    })
            } else if (answers.choices === 'Add Employee') {
                Promise.all([query.getAllRoles(db), query.getAllEmployees(db)])
                    .then(([roles, employees]) => {
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
                                choices: roles,
                            },
                            {
                                type: 'list',
                                name: 'managedBy',
                                message: 'Who is their manager?',
                                choices: employees,
                            },
                        ])
                        .then((answers) => {
                            const employee = {
                                firstName: answers.firstName,
                                lastName: answers.lastName,
                                role: answers.role,
                                managedBy: answers.managedBy
                            }
                            query.addEmployee(db, employee);
                            beginPrompts();
                        });  
                    })
                    .catch((err) => {
                        console.error('Error occured while adding employee', err);
                        beginPrompts();
                    });
            } else if (answers.choices === 'Update Employee Role') {
                query.getAllEmployees(db)
                    .then((employees) => {
                        return Promise.all([employees, query.getAllRoles(db)]);
                    })
                    .then(([employees, roles]) => {
                        inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'employeeName',
                                message: `Which employee's role do you want to update?`,
                                choices: employees,
                            },
                            {
                                type: 'list',
                                name: 'updatedRole',
                                message: 'Which role do you want to assign to the selected employee?',
                                choices: roles,
                            },
                        ])
                        .then((answers) => {
                            const {employeeName, updatedRole} = answers;
                            const employee = {
                                name: employeeName,
                                role: updatedRole,
                            };
                            query.updateRole(employee);
                            beginPrompts();
                        });
                    })
                    .catch((err) => {
                        console.error('Error occured while updating employee role', err);
                        beginPrompts();
                    });
            } else if (answers.choices === 'View All Roles') {
                query.viewAllRoles(db)
                    .then((roles) => {
                        console.table(roles);
                        beginPrompts();
                    })
                    .catch((err) => {
                        console.error('Error occured while obtaining employee role records',err);
                        beginPrompts();
                    })
            } else if (answers.choices === 'Add Role') {
                query.getAllDepartments(db)
                    .then((departments) => {
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
                                choices: departments,
                            },
                        ])
                        .then((answers) => {
                            const newRole = {
                                roleName: answers.roleName,
                                roleSalary: answers.roleSalary,
                                roleDepartment: answers.roleDepartment
                            }
                            query.addRole(db, newRole);
                            beginPrompts();
                        });
                    })
                    .catch((err) => {
                        console.error('Error occured while adding role into databse', err);
                        beginPrompts();
                    });
            } else if (answers.choices === 'View All Departments') {
                query.viewAllDepartments(db)
                    .then((departments) => {
                        console.table(departments);
                        beginPrompts();
                    })
                    .catch((err) => {
                        console.error('Error occured while obtaining department records in the database', err);
                        beginPrompts();
                    });
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
                        const newDepartment = answers.newDepartment;
                        query.addDepartment(db, newDepartment);
                        beginPrompts();
                    })
                    .catch((err) => {
                        console.error('Error occured while adding a department to the database', err);
                        beginPrompts();
                    })
            } else if (answers.choices === 'Quit') {
                console.log('You have quit the employee_db database');
                process.exit();
            }
        })
};

beginPrompts();