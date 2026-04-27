const express = require('express');

const app = express();


app.get("/getUserData", (req, res) => {

    // This route is created to demonstrate
    // how Express handles unexpected errors.

    // Manually throwing an error
    // to simulate server-side failure
    throw new Error("Something failed inside route");

    // This line will never run because
    // execution stops after throw
    res.send("User data set");
});



/*
Global Error Handling Middleware

Special Syntax:
Express recognizes error middleware
when it has 4 parameters:

(err, req, res, next)

Purpose:
To catch errors thrown inside routes
or middleware and send proper response.

This helps us avoid writing try-catch
in every route manually.
*/

app.use((err, req, res, next) => {

    // If any error comes from above routes,
    // control reaches this middleware

    console.error(err.message);

    if (err) {

        // Send generic server error response
        res.status(500).send("Something went wrong !!");
    }
});



/*
Why Error Middleware is Useful?

Without it:
We may need try-catch in many routes.

With it:
1. Centralized error handling
2. Cleaner route code
3. Better debugging
4. Consistent error responses
5. Easier maintenance

Important:
Error middleware should usually be placed
after all routes.
*/



app.listen(7777, function () {

    // Server started successfully
    console.log("app is listening on port no. 7777 !");
});