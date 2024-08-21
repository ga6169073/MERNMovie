import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import userRouter from './Routes/UserRouter.js';
import movieRouter from "./Routes/MovieRouter.js";
import categoryRouter from "./Routes/CategoryRouter.js";
import { errorHandler } from './middlewares/errorMiddleware.js';
import uploadRouter from './Controllers/UploadFile.js';
import compression from 'compression';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
dotenv.config();

const app = express();
app.use(compression());
app.use(helmet())
app.use(cors());
app.use(express.json());
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // limit each IP to 20 requests per windowMs
    validate: {xForwardedForHeader: false}
})
app.use(limiter);

// connect to MongoDB
connectDB();

// Main route
app.get('/', (req, res) => {
    res.send("API is running...");
})


// Other routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/upload", uploadRouter);

// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = process.env.BACKEND_URL || 'http://localhost';

app.listen(PORT, () => {
    console.log(`Server is running in ${server}/${PORT}`);
});

