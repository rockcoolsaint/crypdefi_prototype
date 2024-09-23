import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

// const kms = new AWS.KMS({
//   region: 'your-region', // Set your AWS region here
// });
const kms = new AWS.KMS();

async function listKeys(): Promise<AWS.KMS.ListKeysResponse> {
  try {
    const data = await kms.listKeys().promise();
    return data;
  } catch (error) {
    console.error('Error fetching keys from AWS KMS:', error);
    throw new Error('Failed to fetch keys from KMS');
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await listKeys();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wallets from KMS' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const params = {
      KeyUsage: 'SIGN_VERIFY', // Set the usage of the key
      KeySpec: 'ECC_NIST_P256', // Example of a key specification (adjust as needed)
    };
    const data = await kms.createKey(params).promise();
    return NextResponse.json({ keyId: data.KeyMetadata?.KeyId });
  } catch (error) {
    console.error('Error creating new KMS key:', error);
    return NextResponse.json({ error: 'Failed to create new KMS key' }, { status: 500 });
  }
}
