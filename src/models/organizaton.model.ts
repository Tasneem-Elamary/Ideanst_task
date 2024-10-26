import mongoose, { Schema, Document, Types } from 'mongoose';
// import { IUser } from './User';

export interface IOrganization extends Document {
    name: string;
    description: string;
    members: Types.ObjectId[];  // Array of User ObjectIds (references)
}

const OrganizationSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);