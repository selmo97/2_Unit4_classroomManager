const app = require("./app");
app.use("/api", require("./api"));
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`📟Listening on port ${PORT}...`);
});
