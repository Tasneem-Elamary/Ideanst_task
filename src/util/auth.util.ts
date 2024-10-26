import jwt from 'jsonwebtoken';
import Env from '../../config/env.config';


const { JWT_SECRET } = Env;

const signUser = (user: any) => {
  const token = jwt.sign({ user }, JWT_SECRET as string);
  return token;
};

const verifyToken = (authToken: string) => {
  console.log(authToken,JWT_SECRET)
  const user = jwt.verify(authToken, JWT_SECRET as string);
  console.log(user)
  return user;
};

export {
  signUser,
  verifyToken,
};
