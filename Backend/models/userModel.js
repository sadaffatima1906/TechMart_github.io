import mongoose from "mongoose";

// Define the schema for a User
const userSchema = new mongoose.Schema({
    // Field for the user's name, required
    name: {
        type: String, // Data type is String
        required: true // This field is mandatory
    },
    
    // Field for the user's email, required and unique
    email: {
        type: String, // Data type is String
        required: true, // This field is mandatory
        unique: true // This field must be unique across the collection
    },
    
    // Field for the user's password, required
    password: {
        type: String, // Data type is String
        required: true // This field is mandatory
    },
    
    // Field for the user's first name, required
    First_name: {
        type: String, // Data type is String
        required: true // This field is mandatory
    },
    phone: {
        type: String, // Data type is String
        required: true, // This field is mandatory
        unique: true // This field must be unique across the collection
    },
    dateOfBirth: {
        type: Date, // Data type is Date
        required: true // This field is mandatory
    }
});

// Create and export the User model based on the schema
export default mongoose.model("User", userSchema);