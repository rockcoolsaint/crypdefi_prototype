import { JsonRpcProvider, Transaction, TransactionRequest } from 'ethers';
import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// Initialize AWS KMS
// const kms = new AWS.KMS({ region: 'eu-north-1' });
const kms = new AWS.KMS();

// Connect to Sepolia Testnet using Infura
const provider = new JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

export class KmsService {
    // Generate a new key pair using KMS
    async createKey(): Promise<AWS.KMS.CreateKeyResponse> {
        const params = {
            KeyUsage: 'SIGN_VERIFY',
            KeySpec: 'ECC_NIST_P256',
        };
        return kms.createKey(params).promise();
    }

    // Retrieve all existing KMS keys (wallets)
    async listAllWallets(): Promise<any[]> {
        let wallets: any[] = [];
        let nextMarker: string | undefined = undefined;
        let truncated: boolean = true;

        try {
            while (truncated) {
                // Step 1: List all key IDs using the listKeys API
                const keysList = await kms.listKeys({ Marker: nextMarker }).promise();

                const wallets: any[] = [];

                // Step 2: For each key ID, retrieve detailed information using describeKey
                for (const key of keysList.Keys || []) {
                    const keyDetails = await kms.describeKey({ KeyId: key.KeyId ?? '' }).promise();

                    wallets.push({
                        walletId: key.KeyId,  // The Key ID acts as the wallet ID
                        creationDate: keyDetails.KeyMetadata?.CreationDate,
                        enabled: keyDetails.KeyMetadata?.Enabled,
                        description: keyDetails.KeyMetadata?.Description,
                        keyUsage: keyDetails.KeyMetadata?.KeyUsage,
                        keyState: keyDetails.KeyMetadata?.KeyState,
                    });
                }

            }

            return wallets;  // Return an array of wallet details
        } catch (err) {
            if (err instanceof Error){
                throw new Error(`Failed to list wallets: ${err.message}`);
            }
            return [];
        }
    }

    // Retrieve public key
    async getPublicKey(keyId: string): Promise<AWS.KMS.GetPublicKeyResponse> {
        const params = { KeyId: keyId };
        return kms.getPublicKey(params).promise();
    }

    // Retrieve wallet address based on the walletId from KMS
    async getWalletAddress(walletId: string): Promise<string> {
        const keyMetadata = await kms.describeKey({ KeyId: walletId }).promise();
        if (!keyMetadata.KeyMetadata) throw new Error('Invalid Key ID');
        return `0x${walletId.slice(0, 40)}`; // Mock wallet address for demonstration
    }

    // Sign a transaction using KMS
    async signTransaction(keyId: string, transactionData: TransactionRequest): Promise<string> {
        // Step 1: Convert transactionData to a string (or Buffer)
        const transactionString = JSON.stringify(transactionData);  // Ensure it's a string

        // Step 2: Create a Transaction object (Ethers.js v6)
        const transaction = Transaction.from(transactionString);

        // Step 3: Serialize the transaction (you can sign the serialized data)
        const serializedTransaction = transaction.serialized;

        // Step 4: Create a SHA-256 digest of the transaction string
        const messageDigest = crypto.createHash('sha256').update(serializedTransaction).digest();

        const params = {
            KeyId: keyId,
            Message: Buffer.from(messageDigest),
            MessageType: 'RAW',
            SigningAlgorithm: 'ECDSA_SHA_256',
        };
        const signResult = kms.sign(params).promise();

        return (await signResult).Signature?.toString('hex') || '';
    }
}
