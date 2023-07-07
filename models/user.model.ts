import mongoose, { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  roles: string[];
}

const userSchema = new mongoose.Schema<User>(
  {
    email: String,
    password: String,
    roles: [{ type: String, enum: ["CREATOR", "VIEWER", "VIEW_ALL"], default: ["VIEWER"] }],
  },
  { versionKey: false }
);

const UserModel = mongoose.model<User>("User", userSchema);

export { UserModel };
