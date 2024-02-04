import { Schema, model } from 'mongoose';

const fileSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId, ref: 'User', required: true
        },
        fileName: {
            type: String, required: true
        },
        fileType: {
            type: String, required: true
        },
        fileSize: {
            type: Number, required: true
        },
        fileURL: {
            type: String, required: true
        },
        description: String,
        metadata: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
);

const File = model('File', fileSchema);

export default File;
