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
    } catch (error) {
      console.log(err)
    }
};

const viewAllRole = async() => {
  try {
    const data = await db.promise().query('select title, salary, department.name as department from role left join department on role.department_id = department.id')
    console.table(data[0])
  } catch (error) {
    console.log(err)
  }
};

