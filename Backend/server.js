require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db");
const app = express();
const cors = require("cors");

const categoryRoutes = require("./Routes/Categories.routes");
const statusRoutes = require("./Routes/Status.routes");
const userRoutes = require("./Routes/User.routes");
const taskRoutes = require("./Routes/Task.routes");

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/uploads", express.static("uploads"));

const host = process.env.HOST;
const port = process.env.PORT;

connectDB().then( () =>(
    app.listen (port, host, ()=>{
    console.log(`http://${host}:${port}`);
})));