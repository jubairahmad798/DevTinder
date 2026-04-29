const express = require("express");
const app = express(); // Create an Express application instance
const { connectDB } = require("./config/database"); // Import database connection function
const User = require ("./models/user.js");
require("dotenv").config();

app.use(express.json()); // covert for all incoming req into js object 
// Middleware that parses incoming JSON request bodies
// and converts them into JavaScript objects.
// After this, client-sent data becomes available in req.body.




app.post ("/signup", async (req, res)=>{

 // console.log(req.body); // read the data in the console which is sending from the postman as an client 
    // Displays the data sent by the client (Postman/frontend)
    // Useful for testing and debugging incoming request data.


    const user = new User(req.body); //  Now here we make data dynamic means making instance of an oject which sending from postman by this we will able to save data in database
      // Create a new User model instance using client data.
    // req.body contains dynamic values sent in request.
    // This object follows the schema structure
    // and can now be saved into MongoDB.

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