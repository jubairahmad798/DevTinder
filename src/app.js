const express = require('express');

const app = express();

// We can also write route handlers inside array

// app.use("/user", [rH1, rH2], rH3, rH4..)  // Any way we can write array
app.use("/user", 
    [
        (req,res,next)=>{
            //code 
            next();
        },
        (req,res,next)=>{
            //code
            next();
        }],
        (req, res,next)=>{
            res.send("Response is sended !!🤷‍♂️")
        }
    
)




app.listen(7777, function(){
    console.log("app is listening on port no. 7777 !");
})