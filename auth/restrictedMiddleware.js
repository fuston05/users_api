const jwt= require('jsonwebtoken');
const sec= process.env.JWT_SEC;

module.exports= (req, res, next) => {

  const {authorization}= req.headers;

  if( authorization ){
    jwt.verify(authorization, sec, (error, decodedToken) => {
      if(error){
        res.status(401).json({error: "Invalid credentials"});
      }else{
        req.decodedToken= decodedToken;
        next();
      }//end if error
    });
  }else{
    res.status(401).json({error: "You need access privileges to enter"})
  }//end if authorization

}//end restricted middleware