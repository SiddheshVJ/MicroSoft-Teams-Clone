import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String, required: true
    },
    description: String,
    assignee: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    creator: {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    dueDate: Date,
    priority: String,
    status: String,
    attachments: [{
      type: Schema.Types.ObjectId, ref: 'File'
    }],
    comments: [{
      type: Schema.Types.ObjectId, ref: 'Comment'
    }]
  },
  {
    timestamps: true
  }
);

const Task = model('Task', taskSchema);

export default Task;
