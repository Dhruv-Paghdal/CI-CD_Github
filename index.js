const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const isAuthenticated = require("./middleware/authenticated");
global.validation=require("./middleware/validation");
const app = express();
const PORT = 5000;
const URL ="mongodb://localhost:27017/Demo5?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

app.use(cors());

app.use(express.json());

// Route without login
app.use("/",require("./routes/index"))
app.use(isAuthenticated)
// Route with login
app.use("/student",require("./routes/student"))

mongoose.connect(URL).then(()=>{
    console.log('Connected To Mongoo');
}).catch(()=>{
    console.log('Something Went Wrong');
})

app.listen(PORT,()=>{
    console.log(`Express App Listing on http://localhost:${PORT}`);
})