import { JsonRpcProvider, ethers, getAddress, keccak256, parseEther } from 'ethers';
import { KmsService } from './kmsService';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Connect to Sepolia Testnet using Infura
const provider = new JsonRpcProvider(process.env.Alchemy_SEPOLIA_LINK);

// Function to derive Ethereum address from public key
export function deriveEthereumAddress(publicKey: Buffer): string {
  const uncompressedPublicKey = publicKey.slice(1); // Remove 0x04 prefix
  const publicKeyHash = keccak256(uncompressedPublicKey);
  const address = '0x' + publicKeyHash.slice(-40);
  return getAddress(address); // Returns checksummed Ethereum address
}

export class TransactionService {
  kmsService: KmsService;

  constructor() {
    this.kmsService = new KmsService();
  }

  // Function to send Sepolia ETH to the derived address
  async sendEthToKmsAddress(walletPrivateKey: string, toAddress: string, amountInEth: string) {
    // const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
    
    // Create wallet instance
    const wallet = new ethers.Wallet(walletPrivateKey, provider);

    const feedData = await provider.getFeeData();
    
    // Create a transaction
    const tx = {
      to: toAddress,
      value: parseEther(amountInEth),
      gasLimit: 21000, // Standard gas limit for ETH transfer
      gasPrice: feedData.gasPrice,
    };
    
    // Sign and send the transaction
    const transactionResponse = await wallet.sendTransaction(tx);
    return transactionResponse;
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
      gasLimit: 21000,
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

