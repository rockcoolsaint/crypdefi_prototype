import { Router } from 'express';
import { WalletController } from '../controllers/walletController';

const router = Router();
const walletController = new WalletController();

// Route to create a wallet
router.post('/create-wallet', (req, res) => walletController.createWallet(req, res));

// Route to sign a transaction
router.post('/sign-transaction', (req, res) => walletController.signTransaction(req, res));

// Route to list all wallets
router.get('/list-wallets', walletController.listWallets);

// Route to derive Ethereum address from KMS KeyID
router.get('/derive-eth-address/:keyId', walletController.getEthereumWalletAddress);

// Route to send sepolia ETH Transaction
router.post('/send-transaction', walletController.sendSepoliaEthTransaction);

export default router;
