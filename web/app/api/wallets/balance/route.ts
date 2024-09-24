// import { NextResponse } from 'next/server';
// import AWS from 'aws-sdk';
// import { ethers } from 'ethers';

// const kms = new AWS.KMS({
//   region: 'your-region', // Replace with your AWS region
// });

// const provider = new ethers.providers.JsonRpcProvider(
//   `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
// );

// async function getWallets() {
//   const params = {
//     Limit: 10, // Limit to 10 keys for simplicity
//   };

//   try {
//     const data = await kms.listKeys(params).promise();
//     return data.Keys;
//   } catch (error) {
//     console.error('Error listing keys:', error);
//     throw new Error('Failed to list keys');
//   }
// }

// async function getWalletBalance(address: string) {
//   try {
//     const balance = await provider.getBalance(address);
//     return ethers.utils.formatEther(balance); // Convert to ETH
//   } catch (error) {
//     console.error('Error fetching balance:', error);
//     return '0'; // Return 0 if balance can't be fetched
//   }
// }

// export async function GET() {
//   try {
//     const wallets = await getWallets();
    
//     // Assuming you have a method to convert KMS keys to Ethereum addresses (not shown here)
//     const walletAddresses = wallets.map((wallet) => {
//       // Replace this with logic to convert KMS key to an address
//       return '0x...'; // Use actual wallet address from your system
//     });

//     // Fetch the balance for each wallet address
//     const balances = await Promise.all(
//       walletAddresses.map(async (address) => ({
//         address,
//         balance: await getWalletBalance(address),
//       }))
//     );

//     return NextResponse.json(balances);
//   } catch (error) {
//     console.error('Error fetching balances:', error);
//     return NextResponse.json({ error: 'Failed to fetch wallet balances' }, { status: 500 });
//   }
// }
