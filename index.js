//invokes inquirer
const inquirer = require('inquirer');

//invokes mysql2
const mysql = require('mysql2');

//so that my sql password is confidential
require('dotenv').config();

//establishing mysql connection with .env
const sqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'company_db',
});

//after running node index.js
const homePage = [
    {
        type: 'list',
        name: 'employee-tracker',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View All Employees'
            },
            {
                name: 'Add Employee'
            },
            {
                name: 'Update Employee Role'
            },
            {
                name: 'View All Roles'
            },
            {
                name: 'Add Role'
            },
            {
                name: 'View All Departments'
            },
            {
                name: 'Add Department'
            },
            {
                name: 'Quit'
            }]
        }];

//adding an employee
const employeeAddQuestions = [
        {
            type: 'input',
            name: 'employee-first-name',
            message: 'Please add a first name for your employee'
        },
        {
            type: 'input',
            name: 'employee-last-name',
            message: 'Add their last name'
        },
        {
            type: 'list',
            name: 'employee-role',
            message: 'What is the employees role?',
            choices: [
                {
                    name: 'Sales Lead'
                },
                {
                    name: 'Jr. Sales'
                },
                {
                    name: 'Customer Service Representative'
                },
                {
                    name: 'Packager/Stocker'
                },
                {
                    name: 'Forklift Operator'
                },
                {
                    name: 'Lawyer'
                }]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who will this employee report to?',
            choices: [
                {
                    name: 'John Doe'
                },
                {
                    name: 'Jane Moe'
                },
                {
                    name: 'Jim Roe'
                },
                {
                    name: 'Julie Woe'
                }]
        }];

//updating employee roles
const updateRoleQuestions = [
        {
            type: 'list',
            name: 'update-role',
            message: 'Which employees role needs to be changed?',
            choices: [
                {
                    name: ''
                }
            ]
        }];

//adding departments
const departmentQuestions = [
        {
            type: 'input',
            name: 'add-dept',
            message: 'What is the name of this department?',
        }];

//adding roles
const roleQuestions = [
        {
            type: 'input',
            name: 'add-role',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'add-salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'list',
            name: 'role-dept',
            message: 'Which department does this role belong to?',
            choices: [
                { 
                    name: 'Sales'
                },
                {
                    name: 'Service'
                },
                {
                    name: 'Inventory'
                },
                {
                    name: 'Legal'
                }]
        }];

function homePagePrompt() {
console.log(`
..________________________________________________________________________..
||                                                                        ||
||  ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗ ||
||  ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝ ||
||  █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗   ||
||  ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝   ||
||  ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗ ||
||  ███╗═══███╗ █████╗╝███╗   ██╗═█████╗╚═██████╗ ███████╗██████╗╚══════╝ ||
||  ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗        ||
||  ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝        ||
||  ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗        ||
||  ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║        ||
||  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝        ||
|..______________________________________________________________________..|
`);
    return inquirer.prompt(homePage);
function viewData() {
    if (homePage.choices === "View All Employees") {
        sqlConnection.query(`SELECT * FROM employee`);
    } else if (homePage.choices === "View All Roles") {
        sqlConnection.query(`SELECT * FROM role`);
    } else if (homePage.choices === "View All Departments") {
        sqlConnection.query(`SELECT * FROM department`);
    } else {
        addData();
    };
}};

homePagePrompt();

function addData() {
    if (homePage.choices === "Add Employee") {
        inquirer.prompt(employeeAddQuestions);
        sqlConnection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`);
        console.log(`Added ${first_name} ${last_name} to database`);
    } else if (homePage.choices === "Add Role") {
        inquirer.prompt(roleQuestions);
        sqlConnection.query(`INSERT INTO role (role_title, salary, department_id) VALUES (?, ?, ?)`);
        console.log(`Added ${role_title} & salary to database`);
    } else if (homePage.choices === "Add Department") {
        inquirer.prompt(departmentQuestions);
        sqlConnection.query(`INSERT INTO department (dept_name) VALUES (?)`);
        console.log(`Added ${dept_name} to database`);
    } else {
        inquirer.prompt(updateRoleQuestions);
        sqlConnection.query(`INSERT INTO employee (role_id) VALUES (?)`);
        console.log(`Updated employee role to ${role_title} in database`);
    }
};


/**************************************************************************/

// function addEmployee () {
//     if (questions.choices === 'Add Employee') {
//         db.query(SELECT * FROM employee)
//         console.table('')
//     }
// }

// inquirer.prompt(questions).then(answers => {
//     if (answers.includes('Add Role') {
//         inquirer.prompt(addToDB) 'Type name of role'
//         INSERT INTO role_title 
//     })
// })