const db = require('../db/database');

class Role {
    getAll = (callback) => {
        const sql = `SELECT * FROM role`;
        return db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }
    addRole = (title, salary, departmentId) => {
        const sql = `INSERT INTO role (
            title,
            salary,
            department_id
        )
        VALUES
        ('${title}', ${salary}.0, ${departmentId});`
        db.query(sql, (err, rows, fields) => {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports = Role;