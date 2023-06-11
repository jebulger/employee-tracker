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

const viewAllRoles = (db) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM role';

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const viewAllDepartments = (db) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM department';

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getAllEmployees = (db) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, CONCAT (first_name, ' ', last_name) AS name FROM employee`;

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const employees = result.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                resolve(employees);
            }
        });
    });
};

const getAllRoles = (db) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title FROM role';

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const roles = result.map((row) => ({
                    name: row.title,
                    value: row.id,
                }));
                resolve(roles);
            }
        });
    });
};

const getAllDepartments = (db) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name FROM department';

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const departments = result.map((row) => ({
                    name: row.name,
                    value: row.id,
                }));
                resolve(departments);
            }
        });
    });
};;

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
    getAllEmployees,
    getAllRoles,
    getAllDepartments,
    addEmployee,
    updateRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment,
}