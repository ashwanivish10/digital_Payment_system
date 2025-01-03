export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  upiId: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

export interface User {
  email: string;
  upiId: string;
  balance: number;
  transactions: Transaction[];
}