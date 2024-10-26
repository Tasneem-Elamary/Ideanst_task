import express, { Request, Response } from 'express';
import authRoutes from './src/route/auth.route';
import organizationRoutes from './src/route/organzation.route';
import connectDB from './config/mongoConnection';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', organizationRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});