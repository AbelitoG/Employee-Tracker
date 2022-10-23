const mysql = require('mysql2');
const {prompt} = require('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Abelgonzales1',
    database: 'tracker_db'
  },
  console.log(`Connected to the movies_db database.`)
);

const viewAllDepartment = async() => {
    try {
      const data = await db.promise().query('select * from department')
      console.table(data[0])
      mainMenu()
    } catch (error) {
      console.log(error)
    }
};

const viewAllRole = async() => {
  try {
    const data = await db.promise().query('select title, salary, department.name as department from role left join department on role.department_id = department.id')
    console.table(data[0])
    mainMenu()
  } catch (error) {
    console.log(error)
  }
};

const viewAllEmployee = async() => {
  try {
    const data = await db.promise().query('select * from employee')
    console.table(data[0])
    mainMenu()
  } catch (error) {
    console.log(error)
  }
};
const addDepartment = async() => {
  try{
    const answers = await prompt([{
      type: 'input',
      name: 'name',
      message: 'What department would you like to create??'
    }])
    await db.promise().query('insert into department set ?', answers)
    console.log('jobs Done')
    viewAllDepartment()
  }
  catch (error) {
    console.log(error)
  }
}
const addRole = async() => {
  try{
    const dept = await db.promise().query('select id as value, name as name from department')
    const answers = await prompt([{
      type: 'input',
      name: 'title',
      message: 'What role would you like to create??'
    },{
      type: 'input',
      name: 'salary',
      message: 'What is the Salary of this role??'
    },{
      type: 'list',
      name: 'department_id',
      message: 'Select Department??',
      choices: dept[0]
    }])
    await db.promise().query('insert into role set ?', answers)
    console.log('jobs Done')
    viewAllRole()
  }
  catch (error) {
    console.log(error)
  }
}
const addEmployee = async() => {
  try{
    const role = await db.promise().query('select id as value, title as name from role')
    const manager = await db.promise().query('select id as value, first_name as name from employee')
    const answers = await prompt([{
      type: 'input',
      name: 'first_name',
      message: 'What is the first name??'
    },{
      type: 'input',
      name: 'last_name',
      message: 'What is their last name??'
    },{
      type: 'list',
      name: 'role_id',
      message: 'Select Role??',
      choices: role[0]
    },{
      type: 'list',
      name: 'manager_id',
      message: 'Select manager??',
      choices: manager[0]
    }])
    await db.promise().query('insert into employee set ?', answers)
    console.log('jobs Done')
    viewAllEmployee()
  }
  catch (error) {
    console.log(error)
  }
}
const mainMenu = async() => {
  try{
    const {menu} = await prompt([{
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['View Department', 'View Role', 'View Employee', 'Add Department', 'Add Role', 'Add Employee', 'Quit']
    }])
    switch(menu){
      case 'View Department':
        viewAllDepartment()
        break
      case 'View Role':
        viewAllRole()
        break
      case 'View Employee':
        viewAllEmployee()
        break
      case 'Add Department':
        addDepartment()
        break
      case 'Add Role':
        addRole()
        break
      case 'Add Employee':
        addEmployee()
        break
      default:
        process.exit()

    }
  }
  catch{

  }
}
mainMenu()