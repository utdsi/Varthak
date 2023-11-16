import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUserData } from '../middleware/authMiddleware';
dotenv.config();

export const generateToken = (data: Record<string, any>) => {
  return sign(data, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET || '') as IUserData;
    return decoded;
  } catch (error) {
    return null;
  }
};

