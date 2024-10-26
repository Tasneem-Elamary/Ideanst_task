import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../util/auth.util';
import mongoose, { Schema, Document, Types } from 'mongoose';

interface TokenUser extends JwtPayload {
  _id: Schema.Types.ObjectId
  
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}

// authentication
const isAuth = async (req: Request, res: Response, next: NextFunction) :Promise<any>=> {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const [authType, authToken] = authHeader.split(' ');

    if (authType.toLowerCase() !== 'bearer' || !authToken) {
      return res.status(401).json({ message: 'Invalid authentication type or token' });
    }
  
    const user = verifyToken(authToken) as any;
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized: Please log in', error });
  }
};




export { isAuth};
