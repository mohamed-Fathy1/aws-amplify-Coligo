import mongoose, { Document, Schema } from "mongoose";
import { AuthorSchema, IAuthor } from "./Author";

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  author: IAuthor;
  course: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please add content"],
    },
    author: {
      type: AuthorSchema,
      ref: "User",
      required: true,
    },
    course: {
      type: String,
      required: [true, "Please specify the course"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnnouncement>(
  "Announcement",
  AnnouncementSchema
);
