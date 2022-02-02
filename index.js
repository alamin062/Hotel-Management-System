const express = require('express');
//const connectDB = require('./db/connectdb');
const path = require("path");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const HomeRouter = require('./Routers/HomeRouter');

const app = express();
dotenv.config();
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use('/',express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//Database connection
mongoose.connect("mongodb://localhost:27017/Hotel",
    //useNewUrlParser: true,
   /// useUnifieldTopology: true,}
   )
.then(()=> console.log("connected successfully"))
.catch((err)=> console.log(err));

app.use('/',HomeRouter);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})