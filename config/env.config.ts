import dotenv from 'dotenv';
import path from 'path';

// Specify the path to the .env file if it's not in the root directory
// dotenv.config({ path: path.resolve(__dirname, './.env') });

dotenv.config();

export default {
  ...process.env,
};
