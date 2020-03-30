const jwt= require('jsonwebtoken');
const sec= process.env.JWT_SEC;

function generateToken(user){

  const payload= {
    subject: user.user_id,
    username: user.username,
    role: user.role
  }
  const options= {
    expiresIn: '1hr'
  }

  return jwt.sign( payload, sec, options);
}


module.exports= generateToken;