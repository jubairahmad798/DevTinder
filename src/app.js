const express = require('express');

const app = express();

app.get("/Admin/getUserData", (req, res) => {

    // Before sending sensitive user data,
    // we should verify whether the admin is authorized or not.

    const token = "xyz1";

    // Compare provided token with valid admin token
    const isAdminAuthorized = token === "xyz";

    if (isAdminAuthorized) {

        // If admin is verified, allow access to user data
        res.send("User data sent !!");

    } else {

        // If token is invalid, deny access with Unauthorized status
        res.status(401).send("Admin is not authorized !! 🤷‍♂️🤷‍♂️🤷‍♂️");
    }
});

app.get("/Admin/deleteUser", (req, res) => {

    // Again checking admin authorization before deleting user

    const token = "ckiodv";

    // Validate token
    const isAdminAuthorized = token === "jnfjsdf";

    if (isAdminAuthorized) {

        // If authorized, user can be deleted
        res.send("User Deleted !!");

    } else {

        // If not authorized, block the request
        res.status(401).send("Admin is not authorized !!");
    }
});


/*
Problem:
We are repeating the same authorization logic
inside every /Admin route.

Solution:
Use Middleware.

Middleware can check admin authorization once
for all /Admin routes before request reaches
the route handler.

Benefits:
1. Cleaner code
2. Reusable logic
3. Better maintainability
4. Easier to manage security checks
*/


app.listen(7777, function () {
    console.log("app is listening on port no. 7777 !");
});