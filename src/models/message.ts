import mongoose, { Schema, Model } from "mongoose";

export interface IMessage {
  username: string;
  message: string;
  timestamp: Date;
}

interface IMessageDocument extends IMessage, mongoose.Document {}

interface IMessageModel extends Model<IMessageDocument> {}

const messageSchema = new Schema<IMessageDocument, IMessageModel>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxlength: [50, "Username cannot exceed 50 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

messageSchema.index({ timestamp: -1 });

const Message: IMessageModel =
  mongoose.models.Message || mongoose.model<IMessageDocument, IMessageModel>("Message", messageSchema);

export { Message };

