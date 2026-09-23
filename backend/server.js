const app = require("./src/app");
const connectToDB = require("./src/config/database");


app.listen(3000, () => {
  console.log("server is running on https://localhost:3000");
  connectToDB();
});
