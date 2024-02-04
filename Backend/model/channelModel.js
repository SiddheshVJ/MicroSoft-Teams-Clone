import { Schema, model } from 'mongoose';

const channelSchema = new Schema(
  {
    name: {
      type: String, required: true
    },
    description: String,
    team: {
      type: Schema.Types.ObjectId, ref: 'Team', required: true
    },
    messages: [{
      type: Schema.Types.ObjectId, ref: 'Message'
    }]
  },
  {
    timestamps: true
  }
);

const Channel = model('Channel', channelSchema);

export default Channel;
