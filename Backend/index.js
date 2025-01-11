import express from 'express'; // Importing Express for creating the server
import mongoose from 'mongoose'; // Importing Mongoose for interacting with MongoDB
import dotenv from 'dotenv'; // Importing dotenv for loading environment variables
import cors from 'cors'; // Importing CORS middleware for handling cross-origin requests
import userRoutes from './routes/userRoutes.js'; // Importing user routes
import contactRoutes from './routes/contactRoutes.js'; // Importing contact routes

dotenv.config(); // Loading environment variables from the .env file

const app = express(); // Creating an instance of the Express application
const port = 4000; // Defining the port on which the server will run

app.use(cors()); // Enabling CORS for the app
app.use(express.json()); // Parsing incoming JSON data
app.use('/api/user', userRoutes); // Setting up user routes under '/api/user'
app.use('/api/contact', contactRoutes); // Setting up contact routes under '/api/contact'

const dbURI = process.env.DB_URI; // Getting the database URI from environment variables
console.log("Database URI: ", dbURI);  // Log the URI to check if it's correctly loaded

// If DB_URI is not defined, print an error and stop the process
if (!dbURI) {
    console.error("DB_URI is undefined! Please check your .env file.");
    process.exit(1);  // Exit the process with an error code
}

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempting to connect to the database using mongoose
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        // If there's an error, log it and stop the process
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);  // Exit the process with an error code if DB connection fails
    }
};

// Calling the connectDB function to establish the connection
connectDB();

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});