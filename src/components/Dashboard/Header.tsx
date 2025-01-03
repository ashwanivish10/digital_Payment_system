import React from 'react';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  email: string;
  onLogout: () => void;
}

export default function Header({ email, onLogout }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  );
}