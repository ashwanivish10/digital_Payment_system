import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Send money
router.post('/send', async (req, res) => {
  try {
    const { senderId, recipientUpiId, amount } = req.body;
    
    if (!recipientUpiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/)) {
      return res.status(400).json({ message: 'Invalid UPI ID format' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    // Find sender
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Prevent self-transfer
    if (sender.upiId === recipientUpiId) {
      return res.status(400).json({ message: 'Cannot send money to yourself' });
    }
    
    // Check balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Find recipient
    const recipient = await User.findOne({ upiId: recipientUpiId });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient UPI ID not found' });
    }
    
    // Create transaction
    const transaction = new Transaction({
      senderId,
      senderUpiId: sender.upiId,
      recipientUpiId,
      amount,
      type: 'send',
    });
    
    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;
    
    await Promise.all([
      transaction.save(),
      sender.save(),
      recipient.save(),
    ]);
    
    res.json({
      transaction,
      newBalance: sender.balance,
    });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ message: 'Server error during transaction' });
  }
});

// Get user transactions
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const transactions = await Transaction.find({
      $or: [
        { senderId: userId },
        { recipientUpiId: user.upiId },
      ],
    }).sort({ date: -1 });
    
    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error while fetching transactions' });
  }
});

export default router;