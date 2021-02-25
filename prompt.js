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
    ]);


    switch (questionList.firstChoice) {
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

async function viewAllEmployees() {
    let allEmp = db.query('SELECT * FROM employee') 
    console.table(allEmp)
}
async function viewAllEmpDepartments() {
    console.log('tested')
}
async function viewAllEmpRoles() {
    // let viewRoles = db.query('S')
}
async function addEmployee() {
  
    const addEmpQuestion = await inquirer.prompt([
        { message: 'What is the employees first name?', name: 'firstName' },
        { message: 'What is the employees last name?', name: 'lastName' },
        { type: 'list', message: 'What is the employees role?', name: 'role', choices: [`${roleQuery}`] }
    ]);
    console.log(`[Employee Added]: ${addEmpQuestion.firstName}, ${addEmpQuestion.lastName}`)

    let addEmp = db.query(`INSERT INTO employee (first_name, last_name) VALUES ('${firstName}', '${lastName})`)
    let roleQuery = db.query(`SELECT * FROM role`)
}

async function updateEmpRole() {
    console.log('tested')
}
// department.id, department.nameDepart
async function addRole() {
    let deptQuery = await db.query(`SELECT * FROM department;`);
    //dList=[{name:,value:},{}]
    const dList = deptQuery.map(({id, nameDepart})=>({
        name: nameDepart,
        value: id,
    }));
    console.log(dList)

    const addRoleQuestion = await inquirer.prompt([
        { message: 'What is the title of the role?', name: 'title' },
        { message: 'What is the salary of this role?', name: 'salary' },
        { type: 'list', message: 'What is the department?', name: 'department_id', choices: dList },
    ]);
        
        return await db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${addRoleQuestion.title}', '${addRoleQuestion.salary}', ${addRoleQuestion.department_id});`)
        // console.log(`[Role Added]: ${addRoleQuestion.roleName}, [Salary]: $${addRoleQuestion.roleSalary} per year`)

    questionsPrompt();
}

async function addDepartment() {
    const addDeptQuestion = await inquirer.prompt([
        { message: 'What is the department name?', name: 'deptName' },
    ]);
    if (addDeptQuestion.deptName !== '') {
        let deptDb = await db.query(`INSERT INTO department (nameDepart) VALUES ('${addDeptQuestion.deptName}');`);
        console.log(`[Department]: ${addDeptQuestion.deptName} created`)
    }
    console.log(await db.query(`SELECT * FROM department;`));
    questionsPrompt();
}

// async function retDeptNames(){
//     return await db.query(`SELECT * FROM department`);
// }