import { Schema, model } from 'mongoose';

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    sender: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    type: {
      type: String, required: true
    },
    content: String,
    status: {
      type: String, default: 'unread'
    }
  },
  {
    timestamps: true
  }
);

const Notification = model('Notification', notificationSchema);

export default Notification;
