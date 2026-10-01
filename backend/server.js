const app = require("./src/app");
const connectToDB = require("./src/config/database");
const Port = process.env.PORT || 3000;

app.listen(Port,"0.0.0.0", () => {
  console.log(`server is running on https://localhost:${Port}`);
  connectToDB();
});
