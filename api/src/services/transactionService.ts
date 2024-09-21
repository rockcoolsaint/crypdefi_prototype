import { JsonRpcProvider, ethers } from 'ethers';
import { KmsService } from './kmsService';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Connect to Sepolia Testnet using Infura
const provider = new JsonRpcProvider(process.env.Alchemy_SEPOLIA_LINK);

export class TransactionService {
  kmsService: KmsService;

  constructor() {
    this.kmsService = new KmsService();
  }

  // Send Sepolia transaction using KMS-backed wallet
  async sendSepoliaTransaction(walletId: string, toAddress: string, amountInEth: string) {
    const walletAddress = await this.kmsService.getWalletAddress(walletId);
    const balance = await provider.getBalance(walletAddress);

    console.log(`Wallet balance: ${formatEther(balance)} ETH`);
    if (balance <= ethers.parseEther(amountInEth)) {
      throw new Error('Insufficient balance for the transaction');
    }

    const feedData = await provider.getFeeData();

    // Prepare transaction
    const tx = {
      to: toAddress,
      value: ethers.parseEther(amountInEth),
      gasLimit: ethers.hexlify('21000'),
      gasPrice: feedData.gasPrice,
      nonce: await provider.getTransactionCount(walletAddress),
    };

    // Sign and send transaction
    const signedTx = await this.kmsService.signTransaction(walletId, tx);
    const txResponse = await provider.broadcastTransaction(signedTx);
    console.log(`Transaction Hash: ${txResponse.hash}`);

    // Wait for confirmation
    const receipt = await txResponse.wait();
    console.log('Transaction confirmed:', receipt);
  }
}
function formatEther(balance: bigint) {
  throw new Error('Function not implemented.');
}

