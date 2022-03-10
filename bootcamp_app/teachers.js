const { Pool } = require('pg');
const args = process.argv;

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;
const cohortName = args[2];
// Store all potentially malicious values in an array.
const values = [`${cohortName}`];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohorts}: ${user.teacher}`);
    });
  });
