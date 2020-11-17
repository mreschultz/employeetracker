const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }
        
    findAllEmployees() {
    return this.connection.query("SELECT * FROM employees")
  }
  findAllRoles() {
    return this.connection.query("SELECT * FROM roles")
  }
  createDepartment(department_name) {
    return this.connection.query("INSERT INTO department SET ?", {
      department_name: department_name
    })
  }
  createRole(title) {
    return this.connection.query("INSERT INTO role SET ?", {
      title: title,
      // salary: salary,
      // department_id: department_id
    })
  }
  createEmployee(firstName, lastName, role_id) {
    return this.connection.query("INSERT INTO employees SET ?", {
      first_name: firstName,
      last_name: lastName,
      role_id: role_id
    })
  }
  listEmployeesByDepartment() {
    return this.connection.query("SELECT employee.first_name, employee.last_name, employee.role_id FROM employees")
    }
}

module.exports = new DB(connection)