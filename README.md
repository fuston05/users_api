# Node API Practice

## About this project

- This server is deployed on heroku
  api base url is: https://scotts-users-api.herokuapp.com

- My role in this project was sole developer as a full-stack developer. This is just extra practice for RESTful API's using nodeJs, ExpressJs, KnexJs, PostgreSQL Database.

---

## Tech used

- Since we are using foreign keys I used knex cleaner library to delete seeds before re-seeding:
  [knex cleaner](https://www.npmjs.com/package/knex-cleaner)

- json web token for auth. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

- Used [knexjs](http://knexjs.org/) for db queries.

- [Expressjs Docs](https://expressjs.com/)

- [bcryptJs](https://www.npmjs.com/package/bcrypt) for hashing.

- [uuid](https://www.npmjs.com/package/uuid) for assigning unique id's to http request logs in Morgan Logger.

- [morgan](https://www.npmjs.com/package/morgan) for logging errors

- [express-validator](https://express-validator.github.io/docs/) for user input validation

- Currently set up for use with [postgres database](https://www.postgresql.org/), you can change this to use any database by editing the knexfile.js

- Local development server uses [nodemon](https://www.npmjs.com/package/nodemon)

---

## Run this server locally:

- Clone to your machine.
- Run 'npm install'
- Run 'npm run server' to start up the server (running with nodemon)
- See below about running seed files once you have your postgres database set up.
- Database is named 'users' in the source code. If you call your DB something else you will need to update the knexfile.js in the root.
- Table names will be consistent if you run the migrations using knex. (see below)

---

## knex Seeds & Migrations

- For help with knex run 'knex' in the terminal and it will display available migration and seed commands or see the [knexjs docs](http://knexjs.org/)
- migrations must be in the correct order due to the one-to-many relationship using foreign keys. Reverse the order for the migrations 'down' function. This same order applies to the seeds as well.
- **Run Migrations:** To run the knex migrations, run 'knex migrate:latest' to build the database tables once you have your postgres DB set up.
- **Run seeds** with 'knex seed:run' in the terminal. See [knexjs](http://knexjs.org/) docs for more info

---

## Endpoints

- **(POST) /auth/register**

  > Adds a new user to the database after validation. Stores a hashed version of the password in DB using bcryptjs library. [bcryptJs](https://www.npmjs.com/package/bcrypt)

  - **Requires** the following in the request body:

    > {
    > "userName": "user name",
    > "password": "1234",
    > "email": "email",
    > "salary": int,
    > "role_Id": 1, foreign key to 'roles' table
    > "employee_info_id": int foreign key to 'employee_info' table
    > }

  - **Returns** user's id on success, userName, and a welcome <userName> message.
  - **Returns** an error message if userName or email is already in use or id any validation fails from the '/middleware/validation.js'.

- **(POST) users/auth/login/**

  > Logs in a user.

  - **Requires** {userName, password} in the request body. Checks first if that user exists before logging in.
  - **Returns** error message if that user doesn't exist in the DB.
  - **Returns** a welcome <userName> message, and a json web token on success with an 8 hour expiration by default.

- **(GET) /users**

  > Gets all users form DB.

  - **Requires** authorization header token.
  - **Returns** an array of user objects on success.
  - **Returns** an error message if there are no users in the db.
  - **Note:** Must be 'Admin' to see salary info in this request.

- **(GET) /users/id**

  > Gets a user by their id.

  - **Requires** authorization header token.
  - **Requires** an 'id' parameter.
  - **Returns** {id, userName} on success
  - **Returns** an error message if user doesn't exist in the DB.
  - **Note:** Must be 'Admin' to see salary info in this request.

- **(PUT) /users**

  > Updates an existing user in the DB. Does not update password. That will be handled elsewhere.

  - **NOTE:** For now you do not need to be an admin to add a new user.
  - **Requires** authorization header token.
  - **Requires** {id, userName, email, salary, role_Id, employee_info_id} in the request body. Checks if new info already exists if it has a unique constraint before submitting the query.
  - **Returns** an error message if the NEW userName or email is already in use.
  - **Returns** user's 'id' on success.

- **(DELETE) /users/id**

  > Deletes a user form the DB by id.

  - **Requires** authorization header token, and Admin rights.
  - **Requires** an 'id' parameter.
  - **Returns** number of affected rows on success.
  - **Returns** an error message if user doesn't exist.

---

## Middleware

> Custom middleware descriptions. All custom middleware can be found in the '/middleware' folder exported from the index.js so you can import from the 'middleware' dir. ie. const {isLoggedIn}= require('../middleware')

- **isLoggedIn** middleware/validation.js.

- **registerValidation** middleware/validation.js. The express validator rules are exported from this for inline use as middleware in route handlers

- **loginValidation** middleware/validation.js. middleware/validation.js. The express validator rules are exported from this for inline use as middleware in route handlers

---

## Database (Postgres)

> See the migrations (/data/migrations) for more schema details.

### Privileges:

> 'privileges' is a table of role types. The 'role_Id' field on the user is a foreign key to the privileges table. There is a seed file for this in the 'data/seeds' dir.

### Users

> 'users' is a table of users. Currently containing a userName, password, email, current_salary, hire_date, privilege_id, department_id, and job_title_id.

### Departments

> 'departments is a table of work departments. Currently contains an id, department, manager_first_name, manager_last_name columns.

### Job_titles

> 'job_titles is a table of different available job titles. Currently contains an id, job_title, starting_salary

---
