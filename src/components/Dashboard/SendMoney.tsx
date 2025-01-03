import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface SendMoneyProps {
  onSendMoney: (upiId: string, amount: number) => Promise<void>;
}

export default function SendMoney({ onSendMoney }: SendMoneyProps) {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUpiId = (upi: string) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upi);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateUpiId(upiId)) {
      setError('Invalid UPI ID format. Example: username@upi');
      return;
    }

    const amountNum = Number(amount);
    if (amountNum <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      setIsLoading(true);
      await onSendMoney(upiId, amountNum);
      setUpiId('');
      setAmount('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send money');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Money</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter UPI ID (e.g., username@upi)"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send Money
            </>
          )}
        </button>
      </form>
    </div>
  );
}