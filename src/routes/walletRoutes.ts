import { Router } from 'express';
import { WalletController } from '../controllers/walletController';

const router = Router();
const walletController = new WalletController();

// Route to create a wallet
router.post('/create-wallet', (req, res) => walletController.createWallet(req, res));

// Route to sign a transaction
router.post('/sign-transaction', (req, res) => walletController.signTransaction(req, res));

// Route to list all wallets
router.get('/api/wallet/list-wallets', walletController.listWallets);

export default router;
