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
    emailId: duplicateUserEmail,
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
// ==================================================
// USER UPDATE API (PATCH)
// Used to update selected user fields in MongoDB
// PATCH is used for partial updates, not full replacement
// ==================================================
app.patch("/user/:userId", async (req, res) => {

  // Get userId from URL params
  // Example: /user/64ab12345
  const userId = req.params?.userId;

  // Store request body data sent by client
  // Example: { age: 25, about: "Hello" }
  const data = req.body;

  try {

    // ------------------------------------------------
    // Check if userId is missing in URL
    // ------------------------------------------------
    if (!userId) {
      return res.status(404).send("user id required !!");
    }

    // ------------------------------------------------
    // List of fields allowed to update
    // Any field outside this list should be blocked
    // ------------------------------------------------
    const allowedUpdate = [
      "password",
      "age",
      "photoUrl",
      "about",
      "gender"
    ];

    // Check all keys from req.body are allowed or not
    // every() returns true only if all fields are valid
    const isAllowedUpdate = Object.keys(data).every((k) =>
      allowedUpdate.includes(k)
    );

    // Uncomment if you want to block unknown fields
    /*
    if (!isAllowedUpdate) {
      return res.status(400).send("Updates are not allowed!");
    }
    */

    // ------------------------------------------------
    // Block sensitive fields from updating
    // These fields should not be changed from this API
    // ------------------------------------------------
    if ("firstName" in data) {
      return res.status(400).send("firstName update not allowed !");
    }

    if ("lastName" in data) {
      return res.status(400).send("lastName update not allowed !");
    }

    if ("emailId" in data) {
      return res.status(400).send("email update not allowed !");
    }

    // ------------------------------------------------
    // Check if request body is empty
    // Example: {}
    // ------------------------------------------------
    if (Object.keys(data).length === 0) {
      throw new Error("No update data provided");
    }

    // ------------------------------------------------
    // AGE VALIDATION
    // ------------------------------------------------

    // If age is sent, it must be number
    if ("age" in data && typeof data.age !== "number") {
      throw new Error("age must be a number!");
    }

    // Age should be between 18 and 100
    if (data.age && (data.age < 18 || data.age > 100)) {
      throw new Error("Age must be between 18 and 100");
    }

    // ------------------------------------------------
    // PASSWORD VALIDATION
    // ------------------------------------------------

    // Password minimum length = 8
    // if (data.password && data.password.length < 8) {
    //   throw new Error("Password too short");
    // }

    // ------------------------------------------------
    // ABOUT VALIDATION
    // ------------------------------------------------

    // About text maximum length = 200 characters
    if (data.about && data.about.length > 200) {
      throw new Error("About max 200 chars");
    }

    // Remove extra spaces before saving
    if (data.about) {
      data.about = data.about.trim();
    }

    // ------------------------------------------------
    // Update user in MongoDB using userId
    // runValidators:true applies schema validations
    // By default returns OLD document before update
    // ------------------------------------------------
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true
    });

    // Print old user document in terminal
    console.log(user);

    // ------------------------------------------------
    // Send success response
    // ------------------------------------------------
    res.send(`user updated successfully !! => ${user}`);

  } catch (err) {

    // ------------------------------------------------
    // Handle validation / database errors
    // ------------------------------------------------
    res.status(400).send("something went wrong !! " + err.message);
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
    res.status(400).send("Oops !! Error in saving user ❌ " + err.message);
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
