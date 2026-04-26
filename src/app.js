const express = require('express');

const app = express();

// Ways for writing multiple route handlers in one route

app.use("/user", (req, res , next)=>{
    console.log("1st route handler !!");
    next();
} ,
(req,res,next)=>{
    console.log("2nd route handler !!");
    next();
},
(req, res,next)=>{
    console.log("3rd route handler !!");
    res.send ("Response is sending from route 3rd !! 👋");
}

)




app.listen(7777, function(){
    console.log("app is listening on port no. 7777 !");
})