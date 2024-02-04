import { Schema, model } from 'mongoose';

const chatRoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    participants: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

const ChatRoom = model('ChatRoom', chatRoomSchema);

export default ChatRoom;
