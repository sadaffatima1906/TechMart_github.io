import express from 'express'; // Importing Express for routing
import Contact from '../models/contactModel.js'; // Importing the Contact model

const router = express.Router(); // Creating a new router instance

// Route to handle form submission
router.post('/', async (req, res) => {
    // Destructuring the request body to get name, email, and message
    const { name, email, message } = req.body;

    // Checking if all required fields are present in the request
    if (!name || !email || !message) {
        // If any field is missing, return a 400 status with an error message
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Creating a new contact message from the request data
        const newMessage = new Contact({ name, email, message });
        
        // Saving the new contact message to the database
        await newMessage.save();
        
        // Sending a success response with a message
        res.status(201).json({ message: "Message received. We'll get back to you soon!" });
    } catch (error) {
        // Handling any errors that occur during the save process
        res.status(500).json({ message: error.message });
    }
});

// Exporting the router to be used in the main app
export default router;