

module.exports= function(role){

  return (req, res, next) => {
    if( 
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === role.toLowerCase()
      ){
        next();
    }else{
      res.status(403).json({error: "You do not have the privileges to perform that action. Contact your Admin"})
    }//end if
  }//end return
}//end checkRole middleware