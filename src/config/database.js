const mongoose = require("mongoose"); // Import mongoose library to connect Node.js application with MongoDB database
require("dotenv").config();

// Async function to establish connection with MongoDB database
const connectDB = async () => {
    
    // Connect to MongoDB Atlas cluster and use DevTinder database
    await mongoose.connect(process.env.MONGO_URL);

};
// Export connectDB function so it can be used in other files like app.js or server.js
module.exports = {
    connectDB
};