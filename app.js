const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));

const PORT = 4999;

app.use("/api/v1/tasks", taskRoute);

//データベースと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        //await connectDB("mongodb+srv://udemy:udemy@cluster0.p3ondlz.mongodb.net/todoapp?retryWrites=true&w=majority");
        app.listen(PORT, console.log("サーバが起動しました"));
    } catch(err){
        console.log(err);
    }
};

start();