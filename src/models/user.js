const mongoose = require ("mongoose");
const validator = require("validator");

// Create User schema to define structure of user documents in MongoDB
const userSchema = mongoose.Schema({

    firstName: {
        type : String,
        required : true,
        minLength:3,
        maxLength:10,
        trim :true
        
       
    },
    lastName :{
        type : String,
        minLength:3,
        maxLength:10,
        trim :true,
       
    },
    emailId :{
        type : String,
        required: true,
        trim : true,
        unique : true,
        lowercase :true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address!"+value);
            }
        }
      
      
    },
    password :{
        type : String,
        required: true,
        unique : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("weak password!" + value)
            }
        }

    },
    about:{
        type: String,
        default : "This is the default about section of user!"
    },
    age :{
        type :Number,
        min : 18,
        max : 100
    },

    photoUrl :{
        type : String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48Ke_Q2uphy_MQect9sVe9j0zRyea2Kp26g&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid URL !!"+ value)
            }
        }

    
        
    },
    gender: {
    type: String,

    // Custom validator checks allowed gender values
    // Runs during document save/create
    // Does NOT run on update methods by default
    // For updates use: { runValidators: true }
    validate(value) {
        if (!["male", "female", "others"].includes(value)) {

            // Throw error if invalid value is provided
            throw new Error("invalid gender");
        }
    }
}

},
{timestamps : true});

// Export User model to interact with users collection in MongoDB

module.exports = mongoose.model('User', userSchema);
