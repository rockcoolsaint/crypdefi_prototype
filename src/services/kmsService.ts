import AWS from 'aws-sdk';

// Initialize AWS KMS
const kms = new AWS.KMS({ region: 'eu-north-1' });

export class KmsService {
    // Generate a new key pair using KMS
    async createKey(): Promise<AWS.KMS.CreateKeyResponse> {
        const params = {
            KeyUsage: 'SIGN_VERIFY',
            KeySpec: 'ECC_NIST_P256',
        };
        return kms.createKey(params).promise();
    }

    // Retrieve public key
    async getPublicKey(keyId: string): Promise<AWS.KMS.GetPublicKeyResponse> {
        const params = { KeyId: keyId };
        return kms.getPublicKey(params).promise();
    }

    // Sign a message using KMS
    async signMessage(keyId: string, message: string): Promise<AWS.KMS.SignResponse> {
        const params = {
            KeyId: keyId,
            Message: Buffer.from(message),
            MessageType: 'RAW',
            SigningAlgorithm: 'ECDSA_SHA_256',
        };
        return kms.sign(params).promise();
    }
}
