import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alunoRoutes from './routes/alunoRoutes';
import turmaRoutes from './routes/turmaRoutes';
import presencaRoutes from './routes/presencaRoutes';
import pagamentoRoutes from './routes/pagamentoRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', alunoRoutes);
app.use('/api', turmaRoutes);
app.use('/api', presencaRoutes);
app.use('/api', pagamentoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Svabhava Planner API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
