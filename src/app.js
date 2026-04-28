const express = require("express");
const app = express(); // Create an Express application instance
const { connectDB } = require("./config/database"); // Import database connection function
const User = require ("./models/user.js");
require("dotenv").config();




app.post ("/signup", async (req, res)=>{

    const user = new User({
        firstName :"Jubair2",
        lastName : "Ahmad",
        emailId : "jubair2@gmail.com",
        password :"jubair1232"
    })
try{
     await user.save();
     res.send("user Added Successfully to the Database !!✅");
    }catch(err){
    res.status(400).send("oops !! Error in saving user ❌");
}

});





// First connect to database, then start server
connectDB()
  .then(() => {
    
    // Database connected successfully
    console.log("Database connection established successfully !! 👌👌");

    // Start Express server on port 7777
    app.listen(7777, () => {
      console.log("Server is running on port 7777 !! ✅");
    });

  })
  .catch((err) => {
    
    // If database connection fails, show error message
    console.error("Database cannot be connected !! ❌", err);

  });