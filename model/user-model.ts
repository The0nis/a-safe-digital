"use server"
import  { models, Model, Schema, model } from "mongoose";

const userSchema: Schema<UserRequest> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User: Model<UserRequest> =
  models.User || model<UserRequest>("User", userSchema);

export default User;
