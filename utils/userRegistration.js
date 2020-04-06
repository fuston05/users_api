const users = require('../data/users-model');

function registerUser(res, user) {
  users.add(user)
    .then(newUser => {
      res.status(201).json({ message: `Welcome, ${newUser}` });
    })
    .catch(error => {
      console.log('error: ', error)
      res.status(500).json({ error: 'Could not process your request' });
    })
}//end registerUser

//check if username or email is already in use
const registerIfNotExists = (res, user) => {
  const username = user.username;
  const email = user.email;
  //check if username is in use
  users.findBy({ username })
    .then(result => {
      if (result && result.username) {
        res.status(400).json({ error: 'Username already in use' });
      } else {
        console.log('username NOT taken');
        //check if email is already in use
        users.findBy({ email })
          .then(emailRes => {
            if (emailRes && emailRes.email) {
              res.status(400).json({ error: 'Email already in use' });
            } else {
              //submit the new user to DB
              registerUser(res, user);
            }//end if/else
          })
          .catch(() => {
            res.status(500).json({ error: 'Could not process your request' })
          })
      }//end if/else
    })
    .catch((error) => {
      res.status(500).json({ error: 'Could not process your request' })
    })
}//end registerIfNotExists

module.exports = {
  registerIfNotExists
}