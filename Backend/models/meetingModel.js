import { Schema, model } from 'mongoose';

const meetingSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    participants: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }],
    title: String,
    description: String,
    startTime: {
      type: Date, required: true
    },
    endTime: {
      type: Date, required: true
    },
    location: String
  },
  {
    timestamps: true
  }
);

const Meeting = model('Meeting', meetingSchema);

export default Meeting;
