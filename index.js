// main index
require("dotenv").config();
const server = require("./api/server");
const PORT = process.env.PORT || 5001;
console.log("env: ", process.env.NODE_ENV);

server.listen(PORT, () => {
  console.log(`**** Server listening on port: ${PORT} ****`);
});
