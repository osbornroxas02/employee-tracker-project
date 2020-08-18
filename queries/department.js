const db = require('../db/database');

class Department {
    getAll = (callback) => {
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }
    addDepartment = (departmentName) => {
        const sql = `INSERT INTO departments (name)
        VALUES ('${departmentName}');`
        db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports = Department;