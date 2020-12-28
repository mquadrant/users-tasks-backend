import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Task'
export const COLLECTION_NAME = 'tasks'

const stateEnums = ['todo', 'done']

const schema = new Schema(
    {
        description: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        state: {
            type: Schema.Types.String,
            enum: stateEnums,
            default: 'todo'
        },
        user_id: {
            type: Schema.Types.String,
            required: true
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
    }
);

export default model(DOCUMENT_NAME, schema, COLLECTION_NAME);