import { Request, Response } from 'express';
import { KmsService } from '../services/kmsService';
import { TransactionService } from '../services/transactionService';

// Initialize KMS Service
const kmsService = new KmsService();

// Initialize Transaction Service
const transactionService = new TransactionService();

export class WalletController {
    // List all existing wallets (KMS keys)
    async listWallets(req: Request, res: Response) {
        try {
            const wallets = await kmsService.listAllWallets();
            res.json(wallets);  // Send the wallets as JSON response
        } catch (err) {
            if (err instanceof Error){
                res.status(500).json({ error: err.message });
              }
        }
    }

    // Derive Ethereum Address from wallets (KMS keys)
    async getEthereumWalletAddress(req: Request, res: Response) {
        const { keyId } = req.params;

        try {
            // Derive the Ethereum address
            const ethAddress = await kmsService.getEthereumAddressFromKMS(keyId);
            res.json({ ethereumAddress: ethAddress });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            }
        }
    }

    // Create a new wallet
    async createWallet(req: Request, res: Response) {
        try {
            const key = await kmsService.createKey();
            const publicKey = await kmsService.getPublicKey(key.KeyMetadata?.KeyId!);

            res.json({
                walletId: key.KeyMetadata?.KeyId,
                publicKey: publicKey.PublicKey?.toString('base64')
            });
        } catch (err) {
            if (err instanceof Error){
              res.status(500).json({ error: err.message });
            }
        }
    }

    // Sign a transaction
    async signTransaction(req: Request, res: Response) {
        const { walletId, transactionData } = req.body;

        try {
            const signature = await kmsService.signTransaction(walletId, transactionData);
            res.json({
                transactionData,
                signature: signature
            });
        } catch (err) {
          if (err instanceof Error) {
            res.status(500).json({ error: err.message });
          }
        }
    }

    // Send sepolia ETH transaction
    async sendSepoliaEthTransaction(req: Request, res: Response) {
        const { walletId, toAddress, amountInEth } = req.body;

        try {
            const result = await transactionService.sendSepoliaTransaction(walletId, toAddress, amountInEth);
            res.json(result);
        } catch (err) {
          if (err instanceof Error) {
            res.status(500).json({ error: err.message });
          }
        }
    }
}
