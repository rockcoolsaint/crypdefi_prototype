import express from 'express';
// import bodyParser from 'body-parser';
import walletRoutes from './routes/walletRoutes';
import { TransactionService } from './services/transactionService';

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(express.json());

// Routes
app.use('/api/wallet', walletRoutes);


// // Example usage
// const transactionService = new TransactionService();
// const walletId = '1234abcd-12ab-34cd-56ef-1234567890ab';  // Replace with actual walletId
// const toAddress = '0xRecipientAddressHere';  // Replace with actual Sepolia address
// const amountInEth = '0.01';  // Amount to transfer

// transactionService.sendSepoliaTransaction(walletId, toAddress, amountInEth)
//     .then(() => console.log('Transaction sent successfully'))
//     .catch(err => console.error('Error sending transaction:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
