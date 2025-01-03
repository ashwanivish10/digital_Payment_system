import React from 'react';
import { Wallet } from 'lucide-react';

interface BalanceProps {
  balance: number;
  upiId: string;
}

export default function Balance({ balance, upiId }: BalanceProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Balance</h2>
        <Wallet className="h-6 w-6 text-indigo-600" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        ₹{balance.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600">
        UPI ID: <span className="font-medium">{upiId}</span>
      </div>
    </div>
  );
}