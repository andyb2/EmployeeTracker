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

    console.log(introQuestion.firstChoice)
    
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

async function  viewAllEmployees(){
    console.log('tested')
}
async function viewAllEmpDepartments(){
    console.log('tested')
}
async function viewAllEmpRoles(){
    console.log('tested')
}
async function addEmployee(){
    console.log('tested')
}
async function updateEmpRole(){
    console.log('tested')
}
async function addRole(){
    console.log('tested')
}
async function addDepartment(){
    console.log('tested')
}