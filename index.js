//invokes inquirer
const inquirer = require('inquirer');

//invokes mysql2
const mysql = require('mysql2');

//so that my sql password is confidential
require('dotenv').config();

//invokes console.table so that info prints to the tables??
const cTable = require('console.table');

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
        name: 'employeeTracker',
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
inquirer.prompt(homePage).then(answers => {
    if (answers.employeeTracker === "View All Employees") {
        console.log('hit or sumthin like that')
        sqlConnection.query(`SELECT * FROM employee`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
        });
    } else if (answers.employeeTracker === "View All Roles") {
        sqlConnection.query(`SELECT * FROM role`, (err, result) => {
            console.table(result);
        });
    } else if (answers.employeeTracker === "View All Departments") {
        sqlConnection.query(`SELECT * FROM department`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
        });
    } else {
        addData();
    }
});
};

//todo create .then() on each instance of inquirer.prompt
//todo make things async somehow :') i believe the .then is the async tho

homePagePrompt();

function addData() {
    if (answers.employeeTracker === "Add Employee") {
        inquirer.prompt(employeeAddQuestions).then(answers => {
        sqlConnection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
            console.log(`Added ${first_name} ${last_name} to database`);
        });
    });
    } else if (answers.employeeTracker === "Add Role") {
        inquirer.prompt(roleQuestions).then(answers => {
        sqlConnection.query(`INSERT INTO role (role_title, salary, department_id) VALUES (?, ?, ?)`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
            console.log(`Added ${role_title} & salary to database`);
        });
    });
    } else if (answers.employeeTracker === "Add Department") {
        inquirer.prompt(departmentQuestions).then(answers => {
        sqlConnection.query(`INSERT INTO department (dept_name) VALUES (?)`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
            console.log(`Added ${dept_name} to database`);
        });
    });
    } else {
        inquirer.prompt(updateRoleQuestions).then(answers => {
        sqlConnection.query(`INSERT INTO employee (role_id) VALUES (?)`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
            console.log(`Updated employee role to ${role_title} in database`);
        });
    });
    }
};


/**************************************************************************/


// const homePage = () => {
//     inquirer.createPromptModule({
//         type: 'list',
//         name: 'employeeTracker',
//         message: 'What would you like to do?',
//         choices: [
//             {name: 'View All Employees'},
//             {name: 'Add Employee'},
//             {name: 'Update Employee Role'},
//             {name: 'View All Roles'},
//             {name: 'Add Role'},
//             {name: 'View All Departments'},
//             {name: 'Add Department'},
//             {name: 'Quit'}]
//     }).then(async (answers/*employeeTracker.choices??*/) => {
//         switch(answers.employeeTracker/*employeeTracker.choices??*/) {
//             case 'View All Employees':
//                 await viewEmployees();
//                 break;
//             case 'Add Employee':
//                 await addEmployee();
//                 break;
//             case 'Update Employee Role':
//                 await updateEmployeeRole();
//                 break;
//             case 'View All Roles':
//                 await viewRoles();
//                 break;
//             case 'Add Role':
//                 await addRole();
//                 break;
//             case 'View All Departments':
//                 await viewDepartments();
//                 break;
//             case 'Add Department':
//                 await addDepartment();
//                 break;
//             case 'Quit':
//                 console.log('seeya later');
//                 sqlConnection.end();
//         }
//     })
// };


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