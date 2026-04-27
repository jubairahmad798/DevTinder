const adminAuth = (req, res, next) => {

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
};


// We can also write auth for user 

const userAuth = (req, res, next)=>{
     // Here we are using a dummy token for learning purpose
    const token = "abcd";

    // Compare incoming token with valid admin token
    const isUserAuthorized = token === "abcd";

    if (!isUserAuthorized) {

        // If token is invalid, stop request here
        // and send Unauthorized response
        res.status(401).send("User is not verified !! ❌");

    } else {

        // If token is valid, pass control
        // to the next middleware or route handler
        next();
    }
}

module.exports ={
    adminAuth,
    userAuth
}