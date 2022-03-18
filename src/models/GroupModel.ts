import mongoose from 'mongoose';
import { UserAuth } from './Users';

const Schema = mongoose.Schema;

export interface IGroup extends mongoose.Document {
  createdBy:string;
  members:string[];
  groupName:string;
  groupDescription:string;
  groupImage:string;
  groupImageId:string;
  groupAdmins:string[];
  slug:string;
  createdAt: Date;
  groupId: string;
}

const GroupSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'UserAuth',
      required: [true, 'createdBy is required'],
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'UserAuth',
        },
      ],
      required: [true, 'members are required'],
    },
    groupName: {
      type: String,
      required: [true, 'groupName is required'],
    },
    groupDescription: {
      type: String,
    },
    groupImage: {
      type: String,
    },
    groupImageId: {
      type: String,
    },
    groupAdmins: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'UserAuth',
        },
      ],
    },
    slug: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    groupId: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Group = mongoose.model<IGroup>('Group', GroupSchema);
