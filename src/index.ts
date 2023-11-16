import express from 'express';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();
const PORT = process.env.PORT || 8080;


connectDB();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
