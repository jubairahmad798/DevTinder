const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middleware/auth");

app.use("/Admin", adminAuth);
app.use("/user",userAuth);

app.get("/Admin/getUserData", (req, res) => {

    // This route runs only when admin passes middleware check

    // Send protected user data
    res.send("User data sent !!");
});



app.get("/Admin/deleteUser", (req, res) => {

    // This route also runs only after successful authorization

    // Perform delete action
    res.send("User Deleted !!");
});



app.get("/user",(req,res)=>{
    res.send ("Hello from user !!")
})

app.listen(7777, function () {

    // Server started successfully
    console.log("app is listening on port no. 7777 !");
});