var inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const DB = require("./DB/DB")
require('dotenv').config();

start();

function start() {
	inquirer
		.prompt({
			name: "action",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				// "Add departments",
				// "Add roles",
				// "Add employees",
				"View departments",
				"View roles",
				"View employees",

			],
		})
		.then(function (answer) {
			switch (answer.action) {
				case "View departments":
					viewDepartment();
					break;

				case "View roles":
					viewRoles();
					break;

				case "View employees":
					viewEmployees();
					break;
					}
		});
// function start() {
// 	inquirer
// 		.prompt({
// 			name: "addMenu",
// 			type: "rawlist",
// 			message: "What would you like to do?",
// 			choices: [
// 				"Add departments",
// 				"Add roles",
// 				"Add employees",
// 				// "View departments",
// 				// "View roles",
// 				// "View employees",

// 			],
// 		})
// 		.then(function (answer) {
// 			switch (answer.addMenu) {			
// 				case "Add departments":
// 					addDepartment();
// 					break;

// 				case "Add roles":
// 					addRole();
// 					break;

// 				case "Add employees":
// 					addEmployee();
// 					break;
// 					default:
// 						done();
		// 	}
		// });
}
function viewDepartment() {
	DB.findAllDepartments().then(results => {
		printTable(results);
		start()
	})
}
function viewEmployees() {
  DB.findAllEmployees().then(results => {
    printTable(results);
    start()
  })
}
function viewRoles() {
  DB.findAllRoles().then((results) => {
    printTable(results);
    start()
  });

 
		const addDepartment = () => {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'departmentName',
					message: 'What is the name of the new department?',
				},
			])
			.then(function (answer) {
				DB.createDepartment(answer.departmentName).then((response) => {
					console.log(response);
					viewDepartments();
				});
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
	}

