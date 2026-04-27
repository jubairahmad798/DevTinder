const express = require('express');

const app = express();


/*
Route-Level Middleware for Admin Section

This middleware will run first for every request
that starts with /Admin

Examples:
- /Admin/getUserData
- /Admin/deleteUser

Purpose:
To check whether the admin is authorized
before allowing access to protected routes.
*/

app.use("/Admin", (req, res, next) => {

    // Token usually comes from headers, cookies, or login session
    // Here we are using a dummy token for learning purpose
    const token = "abcd";

    // Compare incoming token with valid admin token
    const isAdminAuthorized = token === "abcd";

    if (!isAdminAuthorized) {

        // If token is invalid, stop request here
        // and send Unauthorized response
        res.status(401).send("Admin is not Authorized !! ❌");

    } else {

        // If token is valid, pass control
        // to the next middleware or route handler
        next();
    }
});



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



/*
Why Middleware is Better Here?

Without middleware:
Authorization logic must be written
again and again in every admin route.

With middleware:
Write auth logic once and protect
all /Admin routes automatically.

Benefits:
1. Cleaner code
2. Reusable logic
3. Easy to maintain
4. Better project structure
5. Centralized security checks
*/



app.listen(7777, function () {

    // Server started successfully
    console.log("app is listening on port no. 7777 !");
});