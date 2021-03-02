const inquirer = require("inquirer");
const db = require("./app/connection")("employee_db", "rootroot");
const cTable = require("console.table");
const { ADDRGETNETWORKPARAMS } = require("dns");
const { allowedNodeEnvironmentFlags } = require("process");

async function questionsPrompt() {
  const questionList = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "firstChoice",
      choices: [
        "View all Employees",
        "View all employees by Department",
        "View all employees by Role",
        "Add employee",
        "Update employee role",
        "Add role",
        "Add department",
        "Exit Application",
      ],
    },
  ]);

  switch (questionList.firstChoice) {
    case "View all Employees":
      viewAllEmployees();
      break;

    case "View all employees by Department":
      viewAllEmpDepartments();
      break;

    case "View all employees by Role":
      viewAllEmpRoles();
      break;

    case "Add employee":
      addEmployee();
      break;

    case "Update employee role":
      updateEmpRole();
      break;

    case "Add role":
      addRole();
      break;

    case "Add department":
      addDepartment();

    case "Exit Application":
      process.exit;
      break;

    default:
      process.exit;
  }
}
questionsPrompt();

async function viewAllEmployees() {
  let allEmp = await db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.nameDepart AS department, roles.salary, CONCAT (manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`
  );
  let empTable = await db.query("SELECT first_name FROM employee");

  if (empTable.length === 0) {
    console.log(`
    ---------------------------
    There are no employees yet!
    ---------------------------
    `);
    questionsPrompt();
  } else {
    console.table(allEmp);
  }
}
async function viewAllEmpDepartments() {
  console.log("tested");
}
async function viewAllEmpRoles() {
  let allRoles = await db.query(`SELECT roles.title, roles.salary FROM roles`);
  console.table(allRoles);
}
async function addEmployee() {
  let rolesQuery = await db.query(`SELECT * FROM roles;`);
  const rolesList = rolesQuery.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  let empQuery = await db.query(`SELECT * FROM employee;`);
  const managerList = empQuery.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerList.push({ name: "None", value: null });

  const addEmpQuestion = await inquirer.prompt([
    { message: "What is the employees first name?", name: "first_name" },
    { message: "What is the employees last name?", name: "last_name" },
    {
      type: "list",
      message: "What is the employees role?",
      name: "role_id",
      choices: rolesList,
    },
    {
      type: "list",
      message: "Who is the manager of this employee?",
      name: "manager_id",
      choices: managerList,
    },
  ]);

  console.table(`
    ---------------------------------------------
    [Employee Added]: ${addEmpQuestion.first_name}, ${addEmpQuestion.last_name}, ${addEmpQuestion.role_id}, ${addEmpQuestion.manager_id}
    ---------------------------------------------
    `);
  //  look into this more... might be able to do something like this
  // console.log(`${role_id}` = rolesQuery.name)

  await db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${addEmpQuestion.first_name}', '${addEmpQuestion.last_name}', '${addEmpQuestion.role_id}', ${addEmpQuestion.manager_id});`
  );
  questionsPrompt();
}

async function updateEmpRole() {
  console.log("tested");
}

async function addRole() {
  let deptQuery = await db.query(`SELECT * FROM department;`);
  //dList=[{name:,value:},{}]
  const departmentList = deptQuery.map(({ id, nameDepart }) => ({
    name: nameDepart,
    value: id,
  }));

  const addRoleQuestion = await inquirer.prompt([
    { message: "What is the title of the role?", name: "title" },
    { message: "What is the salary of this role?", name: "salary" },
    {
      type: "list",
      message: "What is the department?",
      name: "department_id",
      choices: departmentList,
    },
  ]);

  await db.query(
    `INSERT INTO roles (title, salary, department_id) VALUES ('${addRoleQuestion.title}', '${addRoleQuestion.salary}', ${addRoleQuestion.department_id});`
  );
  console.table(`
        -----------------------------------------------
        [Role Added]: ${addRoleQuestion.title}
        [Salary]: $${addRoleQuestion.salary} per year
        -----------------------------------------------
        `);
  questionsPrompt();
}

async function addDepartment() {
  const addDeptQuestion = await inquirer.prompt([
    { message: "What is the department name?", name: "deptName" },
  ]);
  if (addDeptQuestion.deptName !== "") {
    let deptDb = await db.query(
      `INSERT INTO department (nameDepart) VALUES ('${addDeptQuestion.deptName}');`
    );
    console.log(`[Department]: ${addDeptQuestion.deptName} created`);
  }
  console.log(await db.query(`SELECT * FROM department;`));
  questionsPrompt();
}
