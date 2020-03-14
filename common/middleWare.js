
const moment= require('moment');

//validate id
const validateId= (req, res, next) => {
  const id= parseInt(req.params.id);
  console.log('id:', id);
  if(
    !id ||
    id === '' ||
    id === {} ||
    id === null ||
    id === undefined ||
    isNaN(id)
    ){
      //end requests and send back an error
    res.status(404).json({error: "ID is required and must be a number"});
  }else{// if all is valid the pass it on
    next();
  }//end if
}//end validateId

//logger
const scottsLogger= (req, res, next) => {
  const ts= moment( new Date( Date.now() ), "MM-DD-YYYY" );
  console.log( `\n ** scottsLogger: ** \n 
  ${req.method} request from: ${req.hostname} at: ${ts}\n
  ` );

  next();
}// end scottsLogger

module.exports= {
  validateId,
  scottsLogger
};