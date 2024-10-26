import express from 'express';
import { signup, signIn, refreshToken } from '../controller/auth.controller';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signIn);
router.post('/refresh-token', refreshToken);

export default router;
