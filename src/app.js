const express = require('express');

const app = express();

// app.use(function(req, res){  // this is handled all incoming request every request answer is same so we will handles multiple request from different parameters 
//     res.send("Hello from the server !!");
// })

// app.use('/', (req, res)=>{  // this will give all res from / after it
//   res.send("Hello from the / route !")
  
// })

app.use('/test', (req, res)=>{
    res.send("Hello from the /test route !");


})

app.use('/hello', (req, res)=>{
    res.send("Hello from the /hello route !");
})

app.listen(7777, function(){
    console.log("app is listening on port no. 7777 !");
})