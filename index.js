// Declaring requirements
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Importing functions from query.js file found inside the queries directory
const query = require('./queries/query');

// Creating mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'employee_db'
},
    console.log('Connected to the employee_db database.')
);

// Function to begin the prompts
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
                // Calls the exported function from query.js to view employees
                query.viewAllEmployees(db)
                    // Displays them as a table into the console for the user interface
                    .then((employee) => {
                        console.table(employee);
                        beginPrompts();
                    })
                    .catch((err) => {
                        console.error('Error occured while obtaining list of employees', err);
                        beginPrompts();
                    })
            } else if (answers.choices === 'Add Employee') {
                // Obtains all roles and employees before prompting the user 
                // and then adding that new employee into the database
                Promise.all([query.getAllRoles(db), query.getAllEmployees(db)])
                    .then(([roles, employees]) => {
                        // Prompting the user for details on the new employee
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
                                choices: ['None', ...employees],
                            },
                        ])
                        .then((answers) => {
                            const manager = answers.managedBy;
                            const employee = {
                                firstName: answers.firstName,
                                lastName: answers.lastName,
                                role: answers.role,
                                managedBy: manager === 'None' ? null : manager,
                            }
                            query.addEmployee(db, employee);
                            console.log('Employee added to database');
                            beginPrompts();
                        });  
                    })
                    .catch((err) => {
                        console.error('Error occured while adding employee', err);
                        beginPrompts();
                    });
            } else if (answers.choices === 'Update Employee Role') {
                // Obtaining all employees and their roles in the database
                // then prompts the user to select an existing employee and ask which
                // role the employee should be given
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
                                employeeName,
                                updatedRole,
                            };
                            query.updateRole(db, employee);
                            console.log('Employee role has been updated');
                            beginPrompts();
                        });
                    })
                    .catch((err) => {
                        console.error('Error occured while updating employee role', err);
                        beginPrompts();
                    });
            } else if (answers.choices === 'View All Roles') {
                // Obtains all the roles in the database and displays them as a table inside
                // the console
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
                // Grabs all roles before prompting the user for details on the new role
                // Then inserts the new role into the database
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
                            console.log('Role has been added to database');
                            beginPrompts();
                        });
                    })
                    .catch((err) => {
                        console.error('Error occured while adding role into databse', err);
                        beginPrompts();
                    });
            } else if (answers.choices === 'View All Departments') {
                // Obtains all the departments stored into the database and displays them as a table
                // inside of the console
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
                        console.log('Department has been added to database');
                        beginPrompts();
                    })
                    .catch((err) => {
                        console.error('Error occured while adding a department to the database', err);
                        beginPrompts();
                    })
            } else if (answers.choices === 'Quit') {
                // Quits the application
                console.log('You have quit the employee_db database');
                process.exit();
            }
        })
};

// Calling function to begin the prompts/interface 
beginPrompts();