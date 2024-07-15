const bcrypt = require('bcrypt')
const User = require('../models/User');
const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    
    const token = authService.generateToken(newUser);

    res.status(201).json({ user:newUser,token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = authService.generateToken(user);

    res.json({ token,success:true,message:"Login Successfully ",user });
  } catch (error) {
    next(error);
  }
};
