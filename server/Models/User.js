import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: { true: "Please add your full name" }
    },
    email: {
        type: String,
        required: { true: "Please add your email" },
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: { true: "Please add your password" },
        minLength: [8, "Password must be at least 8 characters"],
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    likedMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        }
    ],


},
    {
        timestamps: true,
    }
);  
export default mongoose.model("User", UserSchema);
