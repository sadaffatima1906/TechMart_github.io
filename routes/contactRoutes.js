import express from 'express'; // Importing Express for routing
import Contact from '../models/contactModel.js'; // Importing the Contact model

const router = express.Router(); // Creating a new router instance

// Route to handle form submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: "Message received. We'll get back to you soon!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;