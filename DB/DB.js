const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }
}

module.exports = new DB(connection)