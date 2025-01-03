import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${
                transaction.type === 'receive' 
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'receive' 
                  ? <ArrowDownLeft className="h-5 w-5" />
                  : <ArrowUpRight className="h-5 w-5" />
                }
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">{transaction.upiId}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className={`font-semibold ${
              transaction.type === 'receive' 
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {transaction.type === 'receive' ? '+' : '-'}
              ₹{transaction.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}