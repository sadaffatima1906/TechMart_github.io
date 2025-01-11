import express from 'express'; // Importing Express for routing
import User from '../models/userModel.js'; // Importing the User model
const router = express.Router(); // Creating a new router instance

// Sign up route
router.post('/', async (req, res) => {
  // Destructuring the request body to get name, email, password, and First_name
  const { name, email, password, First_name } = req.body;
  
  try {
    // Creating a new user using the provided data
    const newUser = new User({ name, email, password, First_name });
    
    // Saving the new user to the database
    await newUser.save();
    
    // Sending back the created user data with a 201 status
    res.status(201).json(newUser);
  } catch (error) {
    // Handling errors if the user could not be saved
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  // Destructuring the request body to get email and password
  const { email, password } = req.body;
  
  try {
    // Finding the user by email in the database
    const user = await User.findOne({ email });
    
    // If the user is not found or the password does not match, return an error
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Sending the user data back as a response if login is successful
    res.json({ user });
  } catch (error) {
    // Handling any errors that occur during the login process
    res.status(500).json({ message: error.message });
  }
});

// Exporting the router to be used in the main app
export default router;