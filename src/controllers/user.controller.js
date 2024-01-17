const User = require('../models/user.models');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  
  // ==========Validation ==========
  if(!name){
    return res.status(400).json({ message: 'Provide Name' });
  }
  if(!email){
    return res.status(400).json({ message: 'Provide email' });
  }

  if(!password){
    return res.status(400).json({ message: 'Provide password' });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({ message: 'Pls Provide Strong Password' });
  }
  
  

  try {

    // email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hashedPassword });
    const createdUser=await user.save();

    res.json({ message: 'Signup successful',createdUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { signup };
