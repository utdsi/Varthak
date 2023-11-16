import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../config/jwt';
import bcrypt from 'bcrypt';

const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { username, password, roles } = req.body;

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
        roles,
      });

      await user.save();

      req.user = { username, userId: user._id, roles: user.roles }; 
      return res.status(200).json({ "msg": "signup success" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      req.user = { username, userId: user._id, roles: user.roles }; 

      const token = generateToken({ username, userId: user._id, roles: user.roles });
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

export default authController;
