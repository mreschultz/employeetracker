var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "",
	database: "department_db",
});

connection.connect(function (err) {
	if (err) throw err;
	start();
});
const cTable = require("console.table");
console.table([
	{
		id: "1",
		employee: "Riley Smith",
		department: "Development",
		role: "Developer",
		salary: "75000",
		managerId: "2",
		departmentId: "3" 
	},
	{
		id: "2",
		employee: "Blake James",
		department: "HR",
		role: "Specialist",
		salary: "75000",
		managerId: "3",
		departmentId: "4" 
	},
	{
		id: "3", 
		employee: "Jeff Washington",
		department: "Management",
		role: "Manager",
		salary: "100000",
		managerId: "4",
		departmentId: "5" 
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
					viewDepartment();
					break;

				case "View roles":
					viewRole();
					break;

				case "View employees":
					viewEmployee();
					break;
				case "Add departments":
					addDepartment();
					break;

				case "Add roles":
					addRole();
					break;

				case "Add employees":
					addEmployee();
					break;

				case "Update employee roles":
					roleUpdate();
					break;
			}
		});
}
function viewDepartment() {
	var query = "SELECT * FROM department";
	connection.query(query, function (_err, res) {
		console.log(`DEPARTMENT:`);
		res.forEach((department) => {
			console.log(`ID: ${department.id} | Name: ${department.name}`);
		});
		start();
	});
}

function viewRole() {
	var query = "SELECT * FROM roles";
	connection.query(query, function (_err, res) {
		console.log(`ROLE:`);
		res.forEach((_role) => {
			console.log(
				`ID: ${roles.id} | Title: ${roles.title} | Salary: ${roles.salary} | Department ID: ${roles.department_id}`
			);
		});
		start();
	});
}

function viewEmployee() {
	var query = "SELECT * FROM employees";
	connection.query(query, function (_err, res) {
		console.log(`EMPLOYEES:`);
		res.forEach((_employee) => {
			console.log(
				`ID: ${employees.id} | Name: ${employees.first_name} ${employees.last_name} | Role ID: ${employees.role_id} | Manager ID: ${employees.manager_id}`
			);
		});

		function addDepartment() {
			inquirer
				.prompt({
					name: "department",
					type: "input",
					message: "What is the name of the new department?",
				})
				.then(function (answer) {
					var query = "INSERT INTO department (name) VALUES ( ? )";
					connection.query(query, answer.department, function (_err, _res) {
						console.log(
							`You have added this department: ${answer.department.toUpperCase()}.`
						);
					});
					ViewDepartments();
				});
		}

		function addRole() {
			connection.query("SELECT * FROM department", function (err, res) {
				if (err) throw err;
				inquirer
					.prompt([
						{
							name: "title",
							type: "input",
							message: "What is the title of the new role?",
						},
						{
							name: "salary",
							type: "input",
							message: "What is the salary of the new role?",
						},
						{
							name: "departmentName",
							type: "list",
							message: "Which department does this role fall under?",
							choices: function () {
								var choicesArray = [];
								res.forEach((res) => {
									choicesArray.push(res.name);
								});
								return choicesArray;
							},
						},
					])

					.then(function (answer) {
						const department = answer.departmentName;
						connection.query("SELECT * FROM DEPARTMENT", function (err, res) {
							if (err) throw err;
							let filteredDept = res.filter(function (res) {
								return res.name == department;
							});
							let id = filteredDept[0].id;
							let query =
								"INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
							let values = [answer.title, parseInt(answer.salary), id];
							console.log(values);
							connection.query(query, values, function (_err, _res, _fields) {
								console.log(
									`You have added this role: ${values[0].toUpperCase()}.`
								);
							});
							viewRoles();
						});
					});
			});
		}

		async function addEmployee() {
			connection.query("SELECT * FROM role", function (err, result) {
				if (err) throw err;
				inquirer
					.prompt([
						{
							name: "firstName",
							type: "input",
							message: "What is the employee's first name?",
						},
						{
							name: "lastName",
							type: "input",
							message: "What is the employee's last name?",
						},
						{
							name: "roleName",
							type: "list",
							message: "What role does the employee have?",
							choices: function () {
								rolesArray = [];
								result.forEach((result) => {
									rolesArray.push(result.title);
								});
								return rolesArray;
							},
						},
					])

					.then(function (answer) {
						console.log(answer);
						const role = answer.roleName;
						connection.query("SELECT * FROM role", function (err, res) {
							if (err) throw err;
							let filteredRole = res.filter(function (res) {
								return res.title == role;
							});
							let roleId = filteredRole[0].id;
							connection.query("SELECT * FROM employee", function (_err, res) {
								inquirer
									.prompt([
										{
											name: "manager",
											type: "list",
											message: "Who is your manager?",
											choices: function () {
												managersArray = [];
												res.forEach((res) => {
													managersArray.push(res.last_name);
												});
												return managersArray;
											},
										},
									])
									.then(function (managerAnswer) {
										const manager = managerAnswer.manager;
										connection.query("SELECT * FROM employee", function (
											err,
											res
										) {
											if (err) throw err;
											let filteredManager = res.filter(function (res) {
												return res.last_name == manager;
											});
											let managerId = filteredManager[0].id;
											console.log(managerAnswer);
											let query =
												"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
											let values = [
												answer.firstName,
												answer.lastName,
												roleId,
												managerId,
											];
											console.log(values);
											connection.query(query, values, function (
												_err,
												_res,
												_fields
											) {
												console.log(
													`You have added this employee: ${values[0].toUpperCase()}.`
												);
											});
											viewEmployees();
										});
									});
							});
						});
					});
			});
		}

		function updateRole() {
			connection.query("SELECT * FROM employee", function (err, result) {
				if (err) throw err;
				inquirer
					.prompt([
						{
							name: "employeeName",
							type: "list",
							message: "Which employee's role is changing?",
							choices: function () {
								employeeArray = [];
								result.forEach((result) => {
									employeeArray.push(result.last_name);
								});
								return employeeArray;
							},
						},
					])

					.then(function (answer) {
						console.log(answer);
						const name = answer.employeeName;
						/*const role = answer.roleName;
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw (err);
            let filteredRole = res.filter(function(res) {
                return res.title == role;
            })
        let roleId = filteredRole[0].id;*/
						connection.query("SELECT * FROM role", function (_err, res) {
							inquirer
								.prompt([
									{
										name: "role",
										type: "list",
										message: "What is their new role?",
										choices: function () {
											rolesArray = [];
											res.forEach((res) => {
												rolesArray.push(res.title);
											});
											return rolesArray;
										},
									},
								])
								.then(function (rolesAnswer) {
									const role = rolesAnswer.role;
									console.log(rolesAnswer.role);
									connection.query(
										"SELECT * FROM role WHERE title = ?",
										[role],
										function (err, res) {
											if (err) throw err;
											let roleId = res[0].id;
											let query =
												"UPDATE employee SET role_id ? WHERE last_name ?";
											let values = [roleId, name];
											console.log(values);
											connection.query(query, values, function (
												_err,
												_res,
												_fields
											) {
												console.log(
													`You have updated ${name}'s role to ${role}.`
												);
											});
											viewEmployees();
										}
									);
								});
						});

						//})
					});
			});
		}
		start();
	});
}
