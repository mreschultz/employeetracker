var inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const DB = require("./DB/DB")
require('dotenv').config();

start();

function start() {
	inquirer.prompt({
			name: "action",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				
				"Access Departments",
				"Access Roles",
				"Access Employees",

			],
		})
		.then(function (answer) {
			switch (answer.action) {

				case "Access Departments":
					DepartmentMenu();
					break;

				case "Access Roles":
					RolesMenu();
					break;

				case "Access Employees":
					EmployeesMenu();
					break;
					
		};
function DepartmentMenu() {
	inquirer
		.prompt({
			name: "addMenu",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				"Add departments",
				"View departments",
				"Exit",
			],
		})
		.then(function (answer) {
			switch (answer.addMenu) {			
				case "Add departments":
					addDepartments();
					break;
				case "View departments":
					viewDepartments();
				break;
				default:
						end();
			}
		})
}
function RolesMenu() {
	inquirer
		.prompt({
			name: "addMenu",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				"Add roles",
				"View roles",
				"Exit",
			],
		})
		.then(function (answer) {
			switch (answer.addMenu) {			
				case "Add roles":
					addRoles();
					break;
				case "View roles":
					viewRoles();
				break;
				default:
						end();
			}
		})
	}
		function EmployeesMenu () {
	inquirer
		.prompt([
			{
			name: "addMenu",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				"Add employee",
				"View employees",
				"Exit", 
			]
		},
	])
		.then(function (answer) {
			switch (answer.addMenu) {			
				case "Add employee":
					addEmployees();
					break;
				case "View employees":
					viewEmployees();
				break;
				default:
						end();
			}
		});
	}
function viewDepartments() {
	DB.findDepartments().then(results => {
		printTable(results);
		start()
	})
}
function viewEmployees() {
  DB.findEmployees().then(results => {
    printTable(results);
    start()
  })
}
function viewRoles() {
  DB.findRoles().then((results) => {
    printTable(results);
    start()
  });
}

 	
	const addDepartments = () => {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'departmentName',
					message: 'What is the name of the department?',
				},
			])
			.then(function (answer) {
				DB.createDepartment(answer.departmentName).then((response) => {
					console.log(response);
					viewDepartments();
				});
			});
	};
async function addRoles() {
  const departments = await DB.findDepartments();
  
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'what is the title for this role?',
      },
      {
        type: 'input',
        },
      {
        type: 'list',
        name: 'departmentID',
        message: 'Which department is assigned this position',
        choices: departmentChoices
      },
    ])
    .then((answers) => {
      DB.createRole(answers.title).then(
        function (response) {
          console.log(response);
          viewRoles();
        }
      );
    });
};
async function addEmployees() {

  const roles = await DB.findRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      },
      {
        type: 'list',
        name: 'roleID',
        message: "what is this employee's position?",
        choices: roleChoices
      }
    ])
    .then(function(answers) {
      DB.createEmployee(
        answers.firstName,
        answers.lastName,
        answers.roleID
      ).then(function (response) {
        console.log(response);
        viewEmployees();
      });
    });
};
function end() {
  process.exit()
}
		});
}