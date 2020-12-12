# Node API Practice

- server is deployed on heroku
  api base url is: https://scotts-users-api.herokuapp.com

- This is just extra practice for RESTful API's using nodeJs, ExpressJs, KnexJs, PostgreSQL Database
- Since we are using foreign keys I used knex cleaner library to delete seeds before re-seeding:
  [knex cleaner](https://www.npmjs.com/package/knex-cleaner)

---

## knex Seeds & Migrations

- migrations must be in the correct order due to the one-to-many relationship using foreign keys. Reverse the order for the migrations 'down' function. This same order applies to the seeds as well.

---

## Endpoints

- **(POST) users/auth/register**

  > Adds a new user to the database.

  - **Requires** the following in the request body:

    > {
    > "userName": "name",
    > "password": "1234",
    > "email": "name@email.com",
    > "role_Id": 1
    > }

  - **Returns** user's id on success.
  - **Returns** an error message if userName or email is already in use.

- **(POST) users/auth/login/**

  > Logs in a user.

  - **Requires** {userName, password} in the request body. Checks first if that user exists before logging in.
  - **Returns** error message if that user doesn't exist in the DB. - - **Returns** id and userName on success.

- **(GET) /users**

  > Gets all users form DB.

  - **Returns** an array of user objects on success.

- **(GET) /users/id**

  > Gets a user by their id.

  - **Requires** an 'id' parameter.
  - **Returns** {id, userName} on success or an error message if user doesn't exist in the DB.

- **(PUT) /users**

  > Updates an existing user in the DB. Does not update password. That will be handled elsewhere.

  - **Requires** {id, userName, email, role_Id} in the request body. Checks if new info already exists if it has a unique constraint before submitting the query.
  - **Returns** an error message if the NEW userName or email is already in use.
  - **Returns** user's 'id' on success.

- **(DELETE) /users/id**
  > Deletes a user form the DB.
  - **Requires** an 'id' parameter.

###

---

## Database (Postgres)

> See the migrations (/data/migrations) for more schema details.

### Roles:

> 'roles' is a table of role types. The 'role_Id' field on the user is a foreign key to the roles table. Currently the roles are "user" and "Admin". This can be used for restricting access and privileges for users.

### Users

---
