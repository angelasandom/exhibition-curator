import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;