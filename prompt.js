const inquirer = require('inquirer');
const db = require('./app/connection')('employee_db', 'rootroot');
const cTable = require('console.table');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { allowedNodeEnvironmentFlags } = require('process');


async function questionsPrompt() {
    const questionList = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'firstChoice',
            choices: ['View all Employees', 'View all employees by Department', 'View all employees by Role', 'Add employee', 'Update employee role', 'Add role', 'Add department', 'Exit Application']
        }
    ])

    switch(questionList.firstChoice){
        case 'View all Employees':
            viewAllEmployees();
        break;

        case 'View all employees by Department':
            viewAllEmpDepartments();
        break;

        case 'View all employees by Role':
            viewAllEmpRoles();
        break;

        case 'Add employee':
            addEmployee();
        break;

        case 'Update employee role':
            updateEmpRole();
        break;

        case 'Add role':
            addRole();
        break;

        case 'Add department':
            addDepartment();
        default:
            process.exit
    }
}
questionsPrompt();

async function viewAllEmployees(){
    console.log('tested')
}
async function viewAllEmpDepartments(){
    console.log('tested')
}
async function viewAllEmpRoles(){
    console.log('tested')
}
async function addEmployee(){
    let roleDb = db.query('SELECT * FROM roles')
    const addEmpQuestion = await inquirer.prompt([
        {message: 'What is the employees first name?', name: 'firstName'},
        {message: 'What is the employees last name?', name: 'lastName'},
        {type: 'list', message: 'What is the employees role?', name: 'role', choices: [`${roleDb}`]}
    ]);
}

async function updateEmpRole(){
    console.log('tested')
}

async function addRole(){
    const addRoleQuestion = await inquirer.prompt([
        {message: 'What is the title of the role?', name: 'roleName'},
        {message: 'What is the salary of this role?', name: 'roleSalary'},
    ]);
    if(addRoleQuestion !== ''){
        let roleDb = await db.query(`INSERT INTO roles (title, salary) VALUES ('${addRoleQuestion.roleName}', '${addRoleQuestion.roleSalary}');`)
        console.log(`[Role Added]: ${addRoleQuestion.roleName}, [Salary]: $${addRoleQuestion.roleSalary} per year`)
    }
}

async function addDepartment(){
    const addDeptQuestion = await inquirer.prompt([
        {message: 'What is the department name?', name: 'deptName'},
    ]);
    if(addDeptQuestion.deptName !== ''){
        let deptDb = await db.query(`INSERT INTO department (nameDepart) VALUES ('${addDeptQuestion.deptName}');`);
        console.log(`[Department]: ${addDeptQuestion.deptName} created`)
    }
    console.log(await db.query(`SELECT * FROM department;`));
    questionsPrompt();
}