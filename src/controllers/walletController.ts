import { Request, Response } from 'express';
import { KmsService } from '../services/kmsService';

// Initialize KMS Service
const kmsService = new KmsService();

export class WalletController {
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
            const signature = await kmsService.signMessage(walletId, transactionData);
            res.json({
                transactionData,
                signature: signature.Signature?.toString('base64')
            });
        } catch (err) {
          if (err instanceof Error) {
            res.status(500).json({ error: err.message });
          }
        }
    }
}
