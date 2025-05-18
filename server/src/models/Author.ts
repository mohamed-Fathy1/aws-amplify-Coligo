import { Schema } from "mongoose";

export interface IAuthor {
  name: string;
  subject: string;
  avatar?: string;
}

export const AuthorSchema: Schema<IAuthor> = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  subject: {
    type: String,
    required: [true, "Please add a subject"],
  },
  avatar: {
    type: String,
  },
});
