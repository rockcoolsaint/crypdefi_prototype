import express from 'express';
// import bodyParser from 'body-parser';
import walletRoutes from './routes/walletRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/wallet', walletRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
