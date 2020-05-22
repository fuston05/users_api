/**
 * invokes the server, reads env
 */
//dotenv
require('dotenv').config();

//point to server
const server= require('./api/server');

//define port
const port= process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`\n ** Server running on port:${port} ** \n`);
});