//invokes inquirer
const inquirer = require('inquirer');
//invokes mysql2
const mysql = require('mysql2');

const homePage = [
    {
        type: 'checkbox',
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

const employeeAddQuestions = [
        //adding employee
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
            type: 'checkbox',
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
            type: 'checkbox',
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

const updateRoleQuestion = [
        //updating employee role
        {
            type: 'checkbox',
            name: 'update-role',
            message: 'Which employees role needs to be changed?',
            choices: [
                {
                    name: ''
                }
            ]
        }];

const departmentQuestions = [
        //adding department
        {
            type: 'input',
            name: 'add-dept',
            message: 'What is the name of this department?',
        }];

const roleQuestions = [
        //adding role
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
            type: 'checkbox',
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
    return inquirer.prompt(homePage);
    };

homePagePrompt();

function viewData() {
    if (homePage.choices === "View All Employees") {
        db.query(SELECT * FROM employee)
    }
}

function employeeAddPrompts() {
    return inquirer.prompt(employeeAddQuestions);
    };

function updateRolePrompt() {
    return inquirer.prompt(updateRoleQuestion);
    };

function departmentPrompt() {
    return inquirer.prompt(departmentQuestions);
    };

function rolePrompts() {
    return inquirer.prompt(roleQuestions);
    };

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