import bcrypt from 'bcrypt';
import Env from '../../config/env.config';

const { PEPPER, SALT } = Env;

const hashPassword = (password: string) => {
  const salt = parseInt(SALT as string, 10);
  return bcrypt.hashSync(`${password}${PEPPER}`, salt);
};

const isPasswordValid = (hashedPassword: string | undefined, password: string | undefined): boolean => {
  if (!hashedPassword || !password) {
    return false;
  }

  const isValid = bcrypt.compareSync(
    `${password}${PEPPER}`,
    hashedPassword,
  );
  return isValid;
};

export {
  hashPassword,
  isPasswordValid,
};
