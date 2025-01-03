import { User } from '../types';

export const mockUser: User = {
  email: 'sshwani@gmail.com',
  upiId: 'sshwani@upi',
  balance: 25000,
  transactions: [
    {
      id: '1',
      type: 'receive',
      amount: 5000,
      upiId: 'john@upi',
      date: '2024-03-10',
      status: 'success'
    },
    {
      id: '2',
      type: 'send',
      amount: 1500,
      upiId: 'sarah@upi',
      date: '2024-03-09',
      status: 'success'
    }
  ]
};