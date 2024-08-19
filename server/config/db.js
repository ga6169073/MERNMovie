// connect to MongoDB using mongoose
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}