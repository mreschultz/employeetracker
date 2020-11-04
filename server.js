var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "yankeesbaseball",
	database: "department_db",
});

connection.connect(function (err) {
	if (err) throw err;
	start();
});
const cTable = require("console.table");
console.table([
	{
		employee: "Marcus Smith",
		department: "Development",
	},
	{
		employee: "Kelsey James",
		department: "HR",
	},
	{
		employee: "Jeff Washington",
		department: "Management",
	},
]);

function start() {
	inquirer
		.prompt({
			name: "action",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				"Add departments",
				"Add roles",
				"Add employees",
				"View departments",
				"View roles",
				"View employees",
				// "Update employee roles",
			],
		})
		.then(function (answer) {
			switch (answer.action) {
				case "View departments":
					departmentSearch();
					break;

				case "View roles":
					roleSearch();
					break;

				case "View employees":
					employeeSearch();
					break;
				case "Add departments":
					departmentAdd();
					break;

				case "Add roles":
					roleAdd();
					break;

				case "Add employees":
					employeeAdd();
					break;

				// case "Update employee roles":
				// rangeSearch();
				// break;
			}
		});
}
function departmentSearch() {
	var query = "SELECT * FROM department";
	connection.query(query, function (err, res) {
		console.log(`DEPARTMENT:`);
		res.forEach((department) => {
			console.log(`ID: ${department.id} | Name: ${department.name}`);
		});
		start();
	});
}

function roleSearch() {
	var query = "SELECT * FROM roles";
	connection.query(query, function (err, res) {
		console.log(`ROLE:`);
		res.forEach((role) => {
			console.log(
				`ID: ${roles.id} | Title: ${roles.title} | Salary: ${roles.salary} | Department ID: ${roles.department_id}`
			);
		});
		start();
	});
}

function employeeSearch() {
	var query = "SELECT * FROM employees";
	connection.query(query, function (err, res) {
		console.log(`EMPLOYEES:`);
		res.forEach((employee) => {
			console.log(
				`ID: ${employees.id} | Name: ${employees.first_name} ${employees.last_name} | Role ID: ${employees.role_id} | Manager ID: ${employees.manager_id}`
			);
		});
		start();
	});
}
