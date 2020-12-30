import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'User'
export const COLLECTION_NAME = 'users'

const schema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 100,
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
    }
);

export default model(DOCUMENT_NAME, schema, COLLECTION_NAME);