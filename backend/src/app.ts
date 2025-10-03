import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alunoRoutes from './routes/alunoRoutes';
import turmaRoutes from './routes/turmaRoutes';
import presencaRoutes from './routes/presencaRoutes';
import pagamentoRoutes from './routes/pagamentoRoutes';
import { AppDataSource } from './config/database';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
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
const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar no banco de dados:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  });
