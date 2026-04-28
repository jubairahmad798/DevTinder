const mongoose = require ("mongoose");

// Create User schema to define structure of user documents in MongoDB
const userSchema = mongoose.Schema({

    firstName: {
        type : String,
    },
    lastName :{
        type : String,
    },
    emailId :{
        type : String,
    },
    age :{
        type : Number,
    },
    gender :{
        type : String,
    }

});

// Export User model to interact with users collection in MongoDB

module.exports = mongoose.model('User', userSchema);
