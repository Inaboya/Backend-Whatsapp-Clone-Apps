import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IChat extends mongoose.Document {

  members: string[];
  firstMesssageAt: Date;
  lastMessageAt: Date;
}

const PrivateChatSchema = new Schema(
  {
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'UserAuth',
        },
      ],
      required: [true, 'members are required'],
    },

    firstMesssageAt: {
      type: Date,
    },
    lastMessageAt: {
      type: Date,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// PrivateChatSchema.index({ members: 1 }, { unique: true });

export const PrivateChat = mongoose.model<IChat>(
  'PrivateChat',
  PrivateChatSchema
);
