const express = require("express");
const bodyParser = require("body-parser");
const Auth = require("./routes/auth");
const AddBasics = require("./routes/add_basics");
const GetBasics = require("./routes/get_basics");
const RemoveBasics = require("./routes/remove_basics");
const UpdateBasics = require("./routes/update_basics");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: "1",
    message: "API IS WORKING",
  });
});
app.use("/admin/auth", Auth);
app.use("/admin/add", AddBasics);
app.use("/admin/get", GetBasics);
app.use("/admin/update", UpdateBasics);
app.use("/admin/remove", RemoveBasics);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
