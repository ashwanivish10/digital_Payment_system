import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderUpiId: {
    type: String,
    required: true,
  },
  recipientUpiId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['send', 'receive'],
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    default: 'success',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Transaction', transactionSchema);