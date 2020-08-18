require('dotenv').config()
const inquirer = require('inquirer');
const Department = require('./queries/department');
const Employee = require('./queries/employee');
const Role = require('./queries/role');
const cTable = require('console.table');

class Prompt {

    start = () => {
        this.getWhatToDo();
    }

    getWhatToDo = () => {
        inquirer
            .prompt({
                type: 'list',
                name: 'choice',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            })
            .then(({ choice }) => {
                console.log(choice);
                if (choice === 'view all departments') {
                    const department = new Department()
                    department.getAll((results) => {
                        console.table(results);
                        this.start()
                    })
                }
                else if (choice === 'view all roles') {
                    const role = new Role()
                    role.getAll((results) => {
                        console.table(results);
                        this.start()
                    })
                }
                else if (choice === 'view all employees') {
                    const employee = new Employee()
                    employee.getAll((results) => {
                        console.table(results);
                        this.start()
                    })
                }
                else if (choice === 'add a department') {
                    inquirer.prompt({
                        type: 'text',
                        name: 'departmentName',
                        message: "Department name:"
                    }
                    ).then(({ departmentName }) => {
                        const department = new Department()
                        department.addDepartment(departmentName)
                        this.start()
                    })
                }
                else if (choice === 'add a role') {
                    inquirer.prompt({
                        type: 'text',
                        name: 'title',
                        message: "New Role:"
                    }
                    ).then(({ title }) => {
                        inquirer.prompt({
                            type: 'text',
                            name: 'salary',
                            message: "Role Salary:"
                        }
                        ).then(({ salary }) => {
                            const department = new Department()
                            department.getAll((departmentResult => {
                                console.log("department results", departmentResult);
                                const allDepartments = departmentResult.map(item => item.name);

                                inquirer.prompt({
                                    type: 'list',
                                    name: 'departmentName',
                                    choices: allDepartments
                                }
                                ).then(({ departmentName }) => {
                                    const selectedDepartment = departmentResult.find(department => department.name === departmentName)

                                    const role = new Role()
                                    role.addRole(title, parseFloat(salary), selectedDepartment.id)
                                    this.start()
                                })
                            }))
                        })
                    })
                }
                else if (choice === 'add an employee') {
                    inquirer.prompt({
                        type: 'text',
                        name: 'firstName',
                        message: "First name :"
                    }
                    ).then(({ firstName }) => {
                        inquirer.prompt({
                            type: 'text',
                            name: 'lastName',
                            message: "Last name:"
                        }
                        ).then(({ lastName }) => {
                            const role = new Role()
                            role.getAll(result => {
                                const allRoles = result.map(item => item.title);

                                inquirer.prompt({
                                    type: 'list',
                                    name: 'roles',
                                    choices: allRoles
                                }
                                ).then(({ roles }) => {
                                    const selectedRole = result.find(role => role.title === roles)

                                    const employee = new Employee()
                                    employee.getAll(result => {
                                        const allEmployees = result.map(item => `${item.first_name} ${item.last_name}`);

                                        inquirer.prompt({
                                            type: 'list',
                                            name: 'manager',
                                            choices: allEmployees
                                        }
                                        ).then(({ manager }) => {
                                            const selectedManager = result.find(employee => `${employee.first_name} ${employee.last_name}` === manager)

                                            const employee = new Employee()
                                            employee.addEmployee(firstName, lastName, selectedRole.id, selectedManager.id)
                                            this.start()
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
                else if (choice === 'update an employee role') {
                    const employee = new Employee()
                    employee.getAll(result => {
                        const allEmployees = result.map(item => `${item.first_name} ${item.last_name}`);

                        inquirer.prompt({
                            type: 'list',
                            name: 'employee',
                            choices: allEmployees
                        }
                        ).then(({ employee }) => {
                            const selectEmployee = result.find(item => `${item.first_name} ${item.last_name}` === employee)

                            const role = new Role()
                            role.getAll(result => {
                                const allRoles = result.map(item => item.title);
                                inquirer.prompt({
                                    type: 'list',
                                    name: 'roles',
                                    choices: allRoles
                                }
                                ).then(({ roles }) => {
                                    const selectedRole = result.find(role => role.title === roles)

                                    const employee = new Employee()
                                    employee.updateEmployeeRole(selectEmployee.id, selectedRole.id)
                                    this.start()
                                })
                            })
                        })
                    })
                }
                else {
                        console.log("Selected choice doesn't exist");
                        this.start()
                    }
                });
    }
};

const prompt = new Prompt()
prompt.start()


/* GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/