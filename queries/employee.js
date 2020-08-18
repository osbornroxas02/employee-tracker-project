const db = require('../db/database');

class Employee {
    getAll = (callback) => {
        const sql = `SELECT * FROM employee`;
        console.log('get all employee sql', sql);
        db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            console.log('get all employees result', rows);
            callback(rows);
        });
    }
    addEmployee = (firstName, lastName, roleId, managerId) => {
        const sql = `INSERT INTO employee (
            first_name,
            last_name,
            role_id,
            manager_id
        )
        VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId});`
        db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
        });
    }
    updateEmployeeRole = (employeeId, roleId) => {
        const sql = `UPDATE employee
        SET role_id = ${roleId}
        WHERE id = ${employeeId};`
            
        db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports = Employee;