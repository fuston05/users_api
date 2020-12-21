# Node API Practice

- This server is deployed on heroku
  api base url is: https://scotts-users-api.herokuapp.com

- json web token for auth. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

- This is just extra practice for RESTful API's using nodeJs, ExpressJs, KnexJs, PostgreSQL Database
- Since we are using foreign keys I used knex cleaner library to delete seeds before re-seeding:
  [knex cleaner](https://www.npmjs.com/package/knex-cleaner)

- Used [knexjs](http://knexjs.org/) for db queries.

- [Expressjs Docs](https://expressjs.com/)

---

## Run this server locally:

- clone to your machine.
- run 'npm install'
- run 'npm run server' to start up the server
- See below about running seed files once you have your postgres database set up.
- database is named 'users' in the source code. If you call your DB something else you will need to update the knexfile.js in the root.
- table names will be consistent if you run the migrations using knex. (see below)

---

## knex Seeds & Migrations

- For help with knex run 'knex' in the terminal and it will display available migration and seed commands or see the [knexjs docs](http://knexjs.org/)
- migrations must be in the correct order due to the one-to-many relationship using foreign keys. Reverse the order for the migrations 'down' function. This same order applies to the seeds as well.
- **Run Migrations:** To run the knex migrations, run 'knex migrate:latest' to build the database tables once you have your postgres DB set up.
- **Run seeds** with 'knex seed:run' in the terminal. See [knexjs](http://knexjs.org/) docs for more info

---

## Endpoints

- **(POST) users/auth/register**

  > Adds a new user to the database. Stores a hashed version of the password in DB using bcryptjs library. [bcryptJs](https://www.npmjs.com/package/bcrypt)

  - **Requires** the following in the request body:

    > {
    > "userName": "name",
    > "password": "1234",
    > "email": "email",
    > "salary": int,
    > "role_Id": 1, foreign key to 'roles' table
    > "employee_info_id": int foreign key to 'employee_info' table
    > }

  - **Returns** user's id on success.
  - **Returns** an error message if userName or email is already in use.

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

> Custom middleware descriptions. All custom middleware can be found in the '/data/middleware' folder.

- **restrict.js** middleware. This is used to secure routes based on the user's role. ('User', or 'Admin' currently) which is read from the token(jwt). This is NOT a global middleware currently, it can be dropped into any route that you want to restrict and given a parameter (int) for the min user role that is allowed access. The specified role id and any higher roles will have access.
- Passes the current logged in user's role_id to res.locals, so it can be used in the router to determine what sensitive information will be returned from GET requests. ie. 'User' will not see the employee's salary, they must be an 'Admin' or greater in order to see salary information in the GET queries.

---

## Database (Postgres)

> See the migrations (/data/migrations) for more schema details.

### Roles:

> 'roles' is a table of role types. The 'role_Id' field on the user is a foreign key to the roles table. Currently the roles are "user" and "Admin". This can be used for restricting access and privileges for users in the 'restrict.js' middleware. There is a seed file for this in the 'data/seeds' dir.

### Users

> 'users' is a table of users. Currently containing a userName, password, email, salary, role_id, and employee_info_id.

### employee_info

> 'employee_info' is a table of employee information. It contains a job_title, department, and hire_date. The employee_info_id field on the users is a foreign key to this table's id field. There is a seed file for this in the 'data/seeds' dir.

---
