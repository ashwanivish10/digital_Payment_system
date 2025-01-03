import React, { useState, useEffect } from 'react';
import Header from './Header';
import Balance from './Balance';
import SendMoney from './SendMoney';
import TransactionHistory from './TransactionHistory';
import { api } from '../../api';
import { Transaction } from '../../types';

interface DashboardProps {
  user: {
    id: string;
    email: string;
    upiId: string;
    balance: number;
  };
  onLogout: () => void;
}

export default function Dashboard({ user: initialUser, onLogout }: DashboardProps) {
  const [user, setUser] = useState(initialUser);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await api.getTransactions(user.id);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleSendMoney = async (recipientUpiId: string, amount: number) => {
    const response = await api.sendMoney(user.id, recipientUpiId, amount);
    setUser(prev => ({ ...prev, balance: response.data.newBalance }));
    loadTransactions();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header email={user.email} onLogout={onLogout} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Balance balance={user.balance} upiId={user.upiId} />
            <SendMoney onSendMoney={handleSendMoney} />
          </div>
          <div>
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}