import mongoose from "mongoose";
import Contact from "../models/contactModel"; // Import your Contact model

// MongoDB connection handler for serverless functions
const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return; // If already connected, don't reconnect
    }
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("MongoDB connection failed");
    }
};

export default async function handler(req, res) {
    await connectDB(); // Ensure DB is connected

    if (req.method === "POST") {
        // Destructuring the request body to get the contact data
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            // Create a new contact message
            const newMessage = new Contact({ name, email, message });
            await newMessage.save(); // Save to MongoDB
            return res.status(201).json({ message: "Message received. We'll get back to you soon!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    } else {
        // Handle unsupported HTTP methods
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}