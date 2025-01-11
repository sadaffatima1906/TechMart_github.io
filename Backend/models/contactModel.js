import mongoose from "mongoose";

// Define the schema for a Contact form submission
const contactSchema = new mongoose.Schema({
    // Field for the contact's name, required
    name: {
        type: String, // Data type is String
        required: true, // This field is mandatory
    },
    
    // Field for the contact's email, required
    email: {
        type: String, // Data type is String
        required: true, // This field is mandatory
    },
    
    // Field for the contact's message, required
    message: {
        type: String, // Data type is String
        required: true, // This field is mandatory
    },
    
    // Field for the date of the contact message, defaults to the current date
    date: {
        type: Date, // Data type is Date
        default: Date.now, // Default value is the current date and time
    },
});

// Create and export the Contact model based on the schema
export default mongoose.model("Contact", contactSchema);