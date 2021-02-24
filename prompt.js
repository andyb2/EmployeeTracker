const inquirer = require('inquirer');
const db = require('./app/connection')('employee_db', 'rootroot');
const cTable = require('console.table');


const questionList = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'firstChoice',
        choices: ['View all Employees', 'View all employees by Department', 'View all employees by Role', '', '']
    }
]


async function questionsPrompt() {
    const inqPrompt = await inquirer
        .prompt(questionList);
        console.log(inqPrompt.firstChoice)
    if(inqPrompt.name === 'Add employee'){
        addEmployee();
    }
}
questionsPrompt();

async function addEmployee(){

}