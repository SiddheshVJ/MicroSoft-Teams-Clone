import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    room: {
      type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true
    },
    content: {
      type: String, required: true
    }
  },
  {
    timestamps: true
  }
);

const Message = model('Message', messageSchema);

export default Message;
