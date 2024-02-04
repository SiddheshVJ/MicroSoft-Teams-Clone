import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String, required: true
    },
    description: String,
    members: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }],
    channels: [{
      type: Schema.Types.ObjectId, ref: 'Channel'
    }]
  },
  {
    timestamps: true
  }
);

const Team = model('Team', teamSchema);

export default Team;
