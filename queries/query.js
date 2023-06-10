const viewAllEmployees = (db) => {
    const sql = 'SELECT * FROM employee';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(result);
        beginPrompts();
    });
};

const addEmployee = (db, employee) => {
    const {firstName, lastName, role, managedBy} = employee;

    const sql = `INSERT INTO employee (first_name, last_name, role, manager) VALUES (?, ?, ?, ?)`;
    const values = [firstName, lastName, role, managedBy];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Employee added successfully');
        beginPrompts();
    });
};

const addRole = (db, role) => {
    const {roleName, roleSalary, roleDepartment} = role;
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const values = [roleName, roleSalary, roleDepartment];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Role added successfully');
        beginPrompts();
    });
};

const addDepartment = (db, department) => {
    const {newDepartment} = department;
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const values = [newDepartment];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Department added successfully');
        beginPrompts();
    });
};

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment,
}