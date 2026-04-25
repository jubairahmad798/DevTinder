const express = require('express');

const app = express();

app.use(function(req, res) {
    // This middleware handles all incoming requests.
    // Every request receives the same response,
    // so it works for multiple routes and parameters.
    res.send("Hello from the server!!");
});


app.use('/', (req, res) => {
  // This middleware matches all routes because every route starts with '/'.
  // It sends the same response for all incoming requests.
  res.send("Hello from the / route!");
});

app.use('/test', (req, res)=>{
    res.send("Hello from the /test route !");


})

app.use('/hello', (req, res)=>{
    res.send("Hello from the /hello route !");
})

app.listen(7777, function(){
    console.log("app is listening on port no. 7777 !");
})