const express = require("express");
const app = express(); // Create Express app instance to handle routes, middleware, requests, and responses

const { connectDB } = require("./config/database"); 
// Import custom MongoDB connection function

const User = require("./models/user.js"); 
const { ReturnDocument } = require("mongodb");
// Import User model to interact with users collection in MongoDB

require("dotenv").config(); 
// Load environment variables from .env file into process.env


app.use(express.json()); 
// Middleware: converts incoming JSON request body into JavaScript object
// Parsed data becomes available inside req.body


// ==================================================
// GET USER BY EMAIL ID
// ==================================================

app.get("/user", async (req, res) => {

  const userEmail = req.body.emailId; 
  // Read emailId sent by client in request body

  try {

    const user = await User.find({ emailId: userEmail });
    // Find all users whose email matches given emailId
    // find() always returns an array

    if (user.length === 0) {

      res.send("User not found !");
      // If no matching user found

    } else {

      res.send(user);
      // Send matched user data

    }

  } catch {

    res.status(400).send("Something went wrong");
    // If query fails or server error happens

  }

});


// ==================================================
// GET ALL USERS DATA (FEED PAGE)
// ==================================================

app.get("/feed", async (req, res) => {

  const userFeed = await User.find({});
  // Empty object means fetch all users from database

  res.send(userFeed);
  // Send complete users list

});


// ==================================================
/// ==================================================
// GET SINGLE USER FROM DUPLICATE EMAIL USERS
// ==================================================

app.get("/user", async (req, res) => {

  // Get email from request body
  const duplicateUserEmail = req.body.emailId;

  // Find first matched user with same email
  const duplicateUser = await User.findOne({
    emailId: duplicateUserEmail
  });

  // findOne() returns only first matching document

  // Send single user data
  res.send(duplicateUser);
});


// ==================================================
// GET USER BY ID
// ==================================================

// --------------------------------------------------
// 1st Method → Get ID from request body
// --------------------------------------------------

app.get("/user", async (req, res) => {

  try {

    // Find user using ID from request body
    const user = await User.findById(req.body.id);

    // Print user in console
    console.log(user);

    // If user not found
    if (!user) {
      res.send("user not found !!");

    } else {

      // Send found user data
      res.send(user);
    }

  } catch {

    // Handle invalid ID or server error
    res.status(400).send("something went wrong !!");
  }
});


// --------------------------------------------------
// 2nd Method → Get ID from URL parameter
// Example: /user/12345
// --------------------------------------------------

app.get("/user/:id", async (req, res) => {

  // In this method, ID is sent in request URL

  try {

    // Extract ID from URL params and find user
    const user = await User.findById(req.params.id);

    // Print user in console
    console.log(user);

    // If user not found
    if (!user) {
      res.send("user not found !!");

    } else {

      // Send found user data
      res.send(user);
    }

  } catch {

    // Handle invalid ID or server error
    res.status(400).send("something went wrong !!");
  }
});




// Delete user from the database - DELETE API
// Delete user using DELETE request
app.delete("/user", async (req, res) => {

  // Get userId from request body
  const userId = req.body.userId;

  // Print userId for debugging
  // console.log(userId);

  try {

    // Check if userId is missing
    if (!userId) {
      res.send("user not found !!");

    } else {

      // Find user by ID and delete from database
      const user = await User.findByIdAndDelete(userId);

      // Send success message after deletion
      res.send("user deleted successfully !!");
    }

  } catch {

    // Handle errors
    res.status(404).send("something went wrong !!");
  }
});




// USER UPDATE API - HOW TO UPDATE USER IN DATABASE
// Update existing user data using PATCH request
app.patch("/user", async (req, res) => {

  // Extract userId from request body
  const userId = req.body.userId;

  // Store all request body data in variable
  const data = req.body;

  try {

    // Check if userId is missing
    if (!userId) {
      res.status(404).send("user not found");

    } else {

      // Find user by ID and update data
      // By default it returns OLD document before update
      const user = await User.findByIdAndUpdate(userId, data);

      // Return OLD document explicitly
      // const user = await User.findByIdAndUpdate(userId, data, {
      //   returnDocument: "before"
      // });

      // Return UPDATED document after update
      // const user = await User.findByIdAndUpdate(userId, data, {
      //   returnDocument: "after"
      // });

      // Print returned user object in console
      console.log(user);

      // Send success message with user data
      res.send(`user updated successfully !! => ${user}`);
    }

  } catch {

    // Handle errors
    res.status(400).send("something went wrong !!");
  }
});










// ==================================================
// CREATE NEW USER (SIGNUP)
// ==================================================

app.post("/signup", async (req, res) => {

  const user = new User(req.body);
  // Create new User document instance using client data
  // req.body contains dynamic values from Postman/frontend

  try {

    await user.save();
    // Save new user document into MongoDB

    res.send("User Added Successfully to the Database !! ✅");

  } catch (err) {

    res.status(400).send("Oops !! Error in saving user ❌");
    // Validation or database error

  }

});


// ==================================================
// CONNECT DATABASE THEN START SERVER
// ==================================================

connectDB()
  .then(() => {

    console.log("Database connection established successfully !! 👌👌");
    // Runs when MongoDB connected successfully

    app.listen(7777, () => {

      console.log("Server is running on port 7777 !! ✅");
      // Start backend server on port 7777

    });

  })
  .catch((err) => {

    console.error("Database cannot be connected !! ❌", err);
    // If DB connection fails, server should not start

  });