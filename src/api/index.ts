import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Auth
  register: (email: string, password: string) =>
    axios.post(`${API_URL}/auth/register`, { email, password }),
    
  login: (email: string, password: string) =>
    axios.post(`${API_URL}/auth/login`, { email, password }),
    
  // Transactions
  sendMoney: (senderId: string, recipientUpiId: string, amount: number) =>
    axios.post(`${API_URL}/transactions/send`, { senderId, recipientUpiId, amount }),
    
  getTransactions: (userId: string) =>
    axios.get(`${API_URL}/transactions/${userId}`),
};