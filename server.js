const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');
// const connect = require('http2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //MySQL username
    user: 'root',
    //MySQL password
    password: '12345678',
    database: 'team_db'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Teams connected as id ' + connection.threadId );
    console.log(chalk.yellow.bold(`==================================================`));
    console.log(``);
    console.log(chalk.white.bold(figlet.textSync('Team Tracker ')));
    console.log(``);
    console.log(`                                                                    ` + chalk.blue.bold('Made with love by Jennifer'));
    console.log(``);
    console.log(chalk.yellow.bold(`==================================================`)); 
    promptUser();
});


// define the array of actions to select
actions = [
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role', 
    'Delete employee'
];

// add the inquirer function to prompt the user
const promptUser =() => {
    return inquirer
    .prompt(
        [{
            type: 'list', name: 'answer', message: 'What would you like to do?', choices: actions
        }]
    )
    .then (({answer}) => {
        if (answer === actions[0]) {
            viewAllDepts();
        }
        if (answer === actions[1]) {
            viewAllRoles();
        }
        if (answer === actions[2]) {
            viewAllEmployees();
        }
        if (answer === actions[3]) {
            addDept();
        }
        if (answer === actions[4]) {
            addRole();
        }
        if (answer === actions[5]) {
            addEmployee();
        }
        if (answer === actions[6]) {
            updateEmployee();
        }
        if (answer === actions[7]) {
            deleteEmployee();
        }
    })
};
//function for more ations
const moreActions = () => {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Would you like to continue?',
        name: 'moreActions',
        default: false
    }]).then(({ moreActions }) => {
        if (moreActions) {
            return promptUser()
        } connection.end()
    })
};
//function to view all departments
const viewAllDepts = () => {
    const query = connection.query('SELECT * FROM department', (err, res) => {
        if (err) {
            throw err;
        }
        console.log(chalk.yellow.bold(`==================================================`));
        console.log(`                              ` + chalk.green.bold(`All Departments:`));
        console.log(chalk.yellow.bold(`==================================================`));
        console.table(res);
        //ask the prompt
        moreActions();
    });
};

//function to view all roles
const viewAllRoles = () => {
    console.log('Viewing all roles:');
    const query = connection.query('SELECT roles.id, roles.title, roles.salary, department.name as department_name FROM roles LEFT JOIN department on roles.department_id = department.id;', (err, res) => {
        if (err) {
            throw err;
        }
        console.log(chalk.yellow.bold(`==================================================`));
        console.log(`                              ` + chalk.green.bold(`All Roles:`));
        console.log(chalk.yellow.bold(`==================================================`));
        console.table(res);
        return moreActions();
    });
};

//function to view all employees
const viewAllEmployees = () => {
    console.log('Viewing all employees:');
    const query = connection.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title as job_title, roles.salary, department.name as deparment, employee.manager_id FROM employee LEFT JOIN roles on employee.role_id = roles.id INNER JOIN department on roles.department_id = department.id', (err, res) => {
        if (err) {
            throw err;
        } 
        console.log(chalk.yellow.bold(`==================================================`));
        console.log(`                              ` + chalk.green.bold(`All Employees:`));
        console.log(chalk.yellow.bold(`==================================================`));
        console.table(res)
        moreActions();
    });
};

//function for adding a department
const addDept = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the department name to be added?'
    },
    ]).then((answer) => {
        console.log(answer.name);
        connection.query(
            'INSERT INTO department SET ?',
            { name: answer.name },
            function (err) {
                if (err) throw err;
                console.log("Your new department has been created successfully!")
                moreActions();
            }
        )

    })
};

const viewManager = () => {
    console.log('Viewing manager')
};

const empByDept = () => {
    console.log('Viewing employees by department')
};

const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;

        let departmentChoices = res.map(department => ({
            name: department.name, value: department.id
        }));
        //ask question
        inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'Please enter a role you want to add'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary'
        },
        {
            type: 'checkbox',
            name: 'department',
            choices: departmentChoices,
            message: 'Please enter the department for the role you just created'
        }
        ]).then((answer) => {
            console.log(answer.title)
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new role has been created successfully!")
                    moreActions();
                }
            )
        })
    })
};
const addEmployee = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;

        let roleList = res.map(roles => ({
            name: roles.title, value: roles.id
        }));
        //ask question
        inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name'
        },
        {
            type: 'list',
            name: 'role',
            choices: roleList,
            message: 'Please enter a job title'
        }
        ]).then()
            .then((answer) => {
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your new employee has been created successfully!")
                        moreActions();
                    }
                )
            })
    });
};

const updateEmployee = () => {
    connection.query(
        'SELECT CONCAT(employee.first_name, " ",employee.last_name) AS full_name, employee.id as empl_id, roles.* FROM employee RIGHT JOIN roles on employee.role_id = roles.id',
        function (err, res) {
            if (err) throw err;

            let elist = res.map(employee => ({
                full_name: employee.full_name,
                id:employee.empl_id,
                value:[employee.full_name, employee.empl_id]
            }))
            let roleList = res.map (roles => ({
                title: roles.title,
                id: roles.id,
                value:[roles.title,roles.id]
            }));
            console.log(elist)
            inquirer.prompt([{
                type:'list',
                name:'employee',
                choices: elist,
                message:'Which employee would you like to edit?'
            },
            {
            type:'list',
            name:'newRole',
            choices:roleList,
            message:'What role do you want to assign?'
        }
        ])
            .then((answer) => {
              let editID = answer.employee[1];
              let newRoleId = answer.newRole[1];
              connection.query(`UPDATE employee SET role_id=${newRoleId} WHERE id=${editID};`,
              function (err) {
                if (err) throw err;
                console.log("Your employee has been updated successfully!")
                moreActions();
            } )
            }

        
        )
    })
};
