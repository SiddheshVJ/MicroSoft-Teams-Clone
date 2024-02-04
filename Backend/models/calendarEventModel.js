import { Schema, model } from 'mongoose';

const calendarEventSchema = new Schema(
  {
    title: {
      type: String, required: true
    },
    description: String,
    organizer: {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    participants: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }],
    startDateTime: {
      type: Date, required: true
    },
    endDateTime: {
      type: Date, required: true
    },
    location: String
  },
  {
    timestamps: true
  }
);

const CalendarEvent = model('CalendarEvent', calendarEventSchema);

export default CalendarEvent;
