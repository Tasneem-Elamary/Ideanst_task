import { Request, Response,NextFunction , RequestHandler} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Env from '../../config/env.config';


const { JWT_SECRET} = Env;

export const signup = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const { name, email, password } = req.body;
        const UserRegistered = await User.findOne({ email: req.body.email })
    if (UserRegistered) {

        return res.status(404).send("User already have an account");
    }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) :Promise<any>=> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
           
        const accessToken = jwt.sign({ userId: user?._id }, JWT_SECRET as string, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user?._id }, JWT_SECRET as string, { expiresIn: '7d' });

        res.json({ message: 'Signin successful', access_token: accessToken, refresh_token: refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Signin failed', error });
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.body;
    try {
        const decoded: any = jwt.verify(refresh_token, JWT_SECRET as string);
        const accessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET as string, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET as string, { expiresIn: '7d' });

        res.json({ message: 'Token refreshed', access_token: accessToken, refresh_token: newRefreshToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
