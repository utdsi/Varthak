import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import mongoose from 'mongoose';
export interface IUserData {
  userId: mongoose.Schema.Types.ObjectId;
  username: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user: IUserData;
    }
  }
}

const authMiddleware = {
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = verifyToken(token);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  },

  hasRole: (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      
      if (req.user?.roles.includes(role)) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    };
  },
};

export default authMiddleware;
