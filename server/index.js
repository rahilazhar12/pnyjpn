const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv"); // Note that you might often see dotenv.config() invoked immediately like this.
const cookieParser = require("cookie-parser");
const dbConnection = require("./database/dbcon.js");
const jobsRouterCollection = require("./routers/jobs.Routes.js");
const userrouter = require("./routers/auth.Routes.js");
const companyrouter = require("./routers/companies.Routes.js");
const memberrouter = require("./routers/members.Routes.js");

// rest object
const app = express();
app.use(
  cors({
    origin: 'https://pnycareer.com' || "http://localhost:5173", // Frontend URL
    credentials: true, // Allows cookies (including JWT) to be sent
    methods: "GET,POST,PUT,DELETE", // Limit the allowed methods
    allowedHeaders: "Content-Type,Authorization", // Specify the headers you allow
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Frontend URL
//     credentials: true, // Allows cookies (including JWT) to be sent
//     methods: "GET,POST,PUT,DELETE", // Limit the allowed methods
//     allowedHeaders: "Content-Type,Authorization", // Specify the headers you allow
//   })
// );

dotenv.config();

// datbase conection
dbConnection();

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("./uploads"));

app.get("/get", (req, res) => {
  return res.send("Hellow World");
});

app.use("/api/v1/jobs", jobsRouterCollection);
app.use("/api/v1/users", userrouter);
app.use("/api/v1/company", companyrouter);
app.use("/api/v1/members", memberrouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgMagenta);
});
