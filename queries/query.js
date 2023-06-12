const viewAllEmployees = (db) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee_db.employee e
        LEFT JOIN employee_db.role r ON e.role_id = r.id
        LEFT JOIN employee_db.department d ON r.department_id = d.id
        LEFT JOIN employee_db.employee m ON e.manager_id = m.id
        `;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
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

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const values = [firstName, lastName, role, managedBy];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
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
    });
};

const addDepartment = (db, newDepartment) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const values = [newDepartment];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};

const updateRole = (db, employee) => {
    const {employeeName, updatedRole} = employee;
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const values = [updatedRole, employeeName];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
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