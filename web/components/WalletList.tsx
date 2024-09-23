import React, { useEffect, useState } from 'react';
import { MdArrowDropUp } from 'react-icons/md';
import GenerateKeyButton from './GenerateKeyButton';
import { useRouter } from 'next/navigation';

interface Wallet {
  KeyId: string;
}

export default function WalletList() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  // Initialize router for page refresh

  useEffect(() => {
    async function fetchWallets() {
      try {
        const response = await fetch('/api/wallets');
        const data = await response.json();
        setWallets(data.Keys || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wallets:', err);
        setError('Failed to load wallets');
        setLoading(false);
      }
    }

    fetchWallets();
  }, []);

  // Update wallets state when a new key is generated
  function handleKeyGenerated(newKeyId: string) {
    setWallets((prevWallets) => [...prevWallets, { KeyId: newKeyId }]);

    // Refresh the current page after successfully generating the key
    router.refresh();  // Refresh the current page
  }

  if (loading) return <p>Loading wallets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Wallet List</h1>
      <ul className="space-y-2">
        {wallets.map((wallet) => (
          <li key={wallet.KeyId}>
            <div className="flex justify-between items-center border border-slate-200 py-2 px-4 rounded-lg">
              <div className="flex flex-col">
                <span>KMS Key: {wallet.KeyId}</span>
                <span className="text-xs text-slate-500">CRDC</span>
              </div>
              <div className="">
                <span>$5,230.12</span>
                <span className="text-green-500 text-xs"><MdArrowDropUp className="inline-block ml-2" />2.31%</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <GenerateKeyButton onKeyGenerated={handleKeyGenerated} />
    </div>
  );
}
