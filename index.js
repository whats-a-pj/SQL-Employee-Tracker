//invokes inquirer
const inquirer = require('inquirer');

//invokes mysql2
const mysql = require('mysql2');

//so that my sql password is confidential
require('dotenv').config();

//invokes console.table so that info prints to the tables??
const cTable = require('console.table');

/***********************************************************/
/* INQUIRER QUESTIONS */

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
            name: 'employeeFirstName',
            message: 'Please add a first name for your employee'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'Add their last name'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employees role?',
            choices: [
                // {
                //     name: 'Sales Lead',
                //     value:'1'
                // },
                // {
                //     name: 'Jr. Sales',
                //     value: '2'
                // },
                // {
                //     name: 'Customer Service Representative',
                //     value: '3'
                // },
                // {
                //     name: 'Packager/Stocker',
                //     value: '4'
                // },
                // {
                //     name: 'Forklift Operator',
                //     value: '5'
                // },
                // {
                //     name: 'Lawyer',
                //     value: '6'
                // }
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who will this employee report to?',
            choices: [
                {
                    name: 'John Doe',
                    value: '2'
                },
                {
                    name: 'Jane Moe',
                    value: '3'
                },
                {
                    name: 'Jim Roe',
                    value: '4'
                },
                {
                    name: 'Julie Woe',
                    value: '5'
                }]
        }];
//todo FIX ALL inquirer questions so that they aren't hardcoded in
//updating employee roles
const updateRoleQuestions = [
        {
            type: 'list',
            name: 'chooseEmployee',
            message: 'Which employees role needs to be changed?',
            choices: [
                {
                    // name: `'${employeeAddQuestions.employeeFirstName}'`,
                    // value: `employee(id) idk`
                }
            ]
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'Which new role is this employee taking on?',
            choices: [
                {
                    // name: `'${roleQuestions.nameRole}'`,
                    // value: `role(id)`
                }
            ]
        }
    ];

//adding departments
const departmentQuestions = [
        {
            type: 'input',
            name: 'addDept',
            message: 'What is the name of this department?',
        }];

//adding roles
const roleQuestions = [
        {
            type: 'input',
            name: 'nameRole',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'Which department does this role belong to?',
            choices: [
                // { 
                //     name: 'Sales',
                //     value: '1'
                // },
                // {
                //     name: 'Service',
                //     value: '2'
                // },
                // {
                //     name: 'Inventory',
                //     value: '3'
                // },
                // {
                //     name: 'Legal',
                //     value: '4'
                // }
            ]
        }];
/***********************************************************/

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

/***********************************************************/
/* CODE TO UTILIZE THE INQUIRER QUESTIONS AND ANSWERS */

//prompts user what they want to do when initially starting up the app
function homePagePrompt() {
inquirer.prompt(homePage).then(answers => {
    //establishing mysql connection with .env
const sqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'company_db',
});
    if (answers.employeeTracker === "View All Employees") {
        console.log('hit or sumthin like that')
        //this creates the sql query as if you were typing it into the terminal
        sqlConnection.query(`SELECT * FROM employee`, (err, result) => {
            //checks for errors, displays error if there is one
            if(err) {console.log(err)};
            //displaying the result of the sql query
            console.table(result);
            console.log('to exit: type ctrl + C to quit, and node index.js to start up again');
            //calling homePagePrompt() again so user can choose another action
            homePagePrompt();
        });
    } else if (answers.employeeTracker === "View All Roles") {
        sqlConnection.query(`SELECT * FROM role`, (err, result) => {
            console.table(result);
            console.log('to exit: type ctrl + C to quit, and node index.js to start up again');
            homePagePrompt();
        });
    } else if (answers.employeeTracker === "View All Departments") {
        sqlConnection.query(`SELECT * FROM department`, (err, result) => {
            if(err) {console.log(err)};
            console.table(result);
            console.log('to exit: type ctrl + C to quit, and node index.js to start up again');
            homePagePrompt();
        });
    } else if (answers.employeeTracker === "Quit") {
        console.log(`
        ██████╗ ██╗   ██╗███████╗    ███████╗███████╗██╗     ██╗ ██████╗██╗ █████╗ ██╗
        ██╔══██╗╚██╗ ██╔╝██╔════╝    ██╔════╝██╔════╝██║     ██║██╔════╝██║██╔══██╗██║
        ██████╔╝ ╚████╔╝ █████╗      █████╗  █████╗  ██║     ██║██║     ██║███████║██║
        ██╔══██╗  ╚██╔╝  ██╔══╝      ██╔══╝  ██╔══╝  ██║     ██║██║     ██║██╔══██║╚═╝
        ██████╔╝   ██║   ███████╗    ██║     ███████╗███████╗██║╚██████╗██║██║  ██║██╗
        ╚═════╝    ╚═╝   ╚══════╝    ╚═╝     ╚══════╝╚══════╝╚═╝ ╚═════╝╚═╝╚═╝  ╚═╝╚═╝
        `)
        //ends sql connection
        sqlConnection.end();
} else {
    //this passes the answers and sqlConnection to addData()
        addData(answers, sqlConnection);
    }
});
};

//calls the function above when user inputs node index.js into terminal
homePagePrompt();

//if user wants to add data, this will run via the else statement in homePagePrompt()
function addData(answers, sqlConnection) {
if (answers.employeeTracker === "Add Employee") {
    inquirer.prompt(employeeAddQuestions).then(answers => {
    //creating the sql query based on the user's inquirer answers
    sqlConnection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${answers.employeeRole}', '${answers.manager}');`, (err, result) => {
        if(err) {console.log(err)};
        console.table(result);
        console.log(`Added new employee to database, to exit: type ctrl + C to quit, and node index.js to start up again`);
        homePagePrompt();
    });
});
} else if (answers.employeeTracker === "Add Role") {
    inquirer.prompt(roleQuestions).then(answers => {
    sqlConnection.query(`INSERT INTO role (role_title, salary, department_id) VALUES ('${answers.nameRole}', '${answers.addSalary}', '${answers.roleDept}')`, (err, result) => {
        if(err) {console.log(err)};
        console.table(result);
        console.log(`Added new role & salary to database, to exit: type ctrl + C to quit, and node index.js to start up again`);
        homePagePrompt();
    });
});
} else if (answers.employeeTracker === "Add Department") {
    inquirer.prompt(departmentQuestions).then(answers => {
    sqlConnection.query(`INSERT INTO department (dept_name) VALUES ('${answers.addDept}')`, (err, result) => {
        if(err) {console.log(err)};
        console.table(result);
        console.log(`Added new department to database, to exit: type ctrl + C to quit, and node index.js to start up again`);
        homePagePrompt();
    });
});
} else if (answers.employeeTracker === "Update Employee Role") {
    inquirer.prompt(updateRoleQuestions).then(answers => {
        console.log(answers.updateRole)
    sqlConnection.query(`UPDATE employee SET role_id = ? WHERE id = ('${answers.updateRole}')`, (err, result) => {
        if(err) {console.log(err)};
        console.table(result);
        console.log(`Updated employee role in database, to exit: type ctrl + C to quit, and node index.js to start up again`);
        homePagePrompt();
    });
});
} else {
    console.log(`
    ██████╗ ██╗   ██╗███████╗    ███████╗███████╗██╗     ██╗ ██████╗██╗ █████╗ ██╗
    ██╔══██╗╚██╗ ██╔╝██╔════╝    ██╔════╝██╔════╝██║     ██║██╔════╝██║██╔══██╗██║
    ██████╔╝ ╚████╔╝ █████╗      █████╗  █████╗  ██║     ██║██║     ██║███████║██║
    ██╔══██╗  ╚██╔╝  ██╔══╝      ██╔══╝  ██╔══╝  ██║     ██║██║     ██║██╔══██║╚═╝
    ██████╔╝   ██║   ███████╗    ██║     ███████╗███████╗██║╚██████╗██║██║  ██║██╗
    ╚═════╝    ╚═╝   ╚══════╝    ╚═╝     ╚══════╝╚══════╝╚═╝ ╚═════╝╚═╝╚═╝  ╚═╝╚═╝
    `)
    sqlConnection.end();
}
};

/**************************************************************************/

// function addData() {
//     if (homePage.choices === "Add Employee") {
//         inquirer.prompt(employeeAddQuestions).then(answers => {
//             console.log(answers)
//         }); //add .then()
//         sqlConnection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`);
//         console.log(`Added ${first_name} ${last_name} to database`);
//     } else if (homePage.choices === "Add Role") {
//         inquirer.prompt(roleQuestions); //add .then()
//         sqlConnection.query(`INSERT INTO role (role_title, salary, department_id) VALUES (?, ?, ?)`);
//         console.log(`Added ${role_title} & salary to database`);
//     } else if (homePage.choices === "Add Department") {
//         inquirer.prompt(departmentQuestions); //add .then()
//         sqlConnection.query(`INSERT INTO department (dept_name) VALUES (?)`);
//         console.log(`Added ${dept_name} to database`);
//     } else {
//         inquirer.prompt(updateRoleQuestions); //add .then()
//         sqlConnection.query(`INSERT INTO employee (role_id) VALUES (?)`);
//         console.log(`Updated employee role to ${role_title} in database`);
//     }
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