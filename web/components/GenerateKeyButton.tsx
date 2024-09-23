'use client';

import React, { useState } from 'react';

export default function GenerateKeyButton({ onKeyGenerated }: { onKeyGenerated: (keyId: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/wallets', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Notify the parent component that a new key was generated
      onKeyGenerated(data.keyId);
    } catch (err) {
      console.error('Error generating key:', err);
      setError('Failed to generate new key');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mt-5'>
      <button onClick={handleClick} disabled={loading} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {loading ? 'Generating...' : 'Generate New Wallet Key'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
